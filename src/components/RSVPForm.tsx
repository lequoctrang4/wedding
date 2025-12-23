import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { useForm } from "react-hook-form";
import GiftModal from "./GiftModal";

interface RSVPFormProps {
  telegramBotToken: string;
  telegramChatId: string;
  giftQrCode: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  bankAddress?: string;
  initialName?: string;
}

interface FormData {
  name: string;
  message: string;
  attendance: string;
  guestCount: string;
  invitedBy: string;
}

const RSVPForm: React.FC<RSVPFormProps> = ({
  telegramBotToken,
  telegramChatId,
  giftQrCode,
  bankName,
  accountName,
  accountNumber,
  bankAddress,
  initialName = "",
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [showGiftModal, setShowGiftModal] = useState(false);

  // React Hook Form with built-in validation
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<FormData>({
    mode: "onSubmit", // Validate on submit
    defaultValues: {
      name: initialName,
      message: "",
      attendance: "",
      guestCount: "",
      invitedBy: "",
    },
  });

  // Watch attendance to show/hide guest count
  const watchedAttendance = watch("attendance");

  // Clear invitedBy when selecting "Không thể tham dự"
  React.useEffect(() => {
    if (watchedAttendance === "Không thể tham dự") {
      setValue("invitedBy", "");
      // Clear validation error for invitedBy when not needed
      trigger("invitedBy");
    }
  }, [watchedAttendance, setValue, trigger]);

  // Debug log
  console.log("Current attendance value:", watchedAttendance);
  console.log("Form errors:", errors);
  console.log("InvitedBy value:", watch("invitedBy"));
  console.log("InvitedBy error:", errors.invitedBy);

  const sendToTelegram = async (data: FormData) => {
    // Custom validation for conditional fields
    let hasError = false;

    // Check if invitedBy is required and missing
    if (
      watchedAttendance !== "Không thể tham dự" &&
      watchedAttendance &&
      !data.invitedBy
    ) {
      // Manually trigger validation error
      trigger("invitedBy");
      hasError = true;
    }

    // Check if guestCount is required and missing
    if (watchedAttendance === "Có thể tham dự" && !data.guestCount) {
      trigger("guestCount");
      hasError = true;
    }

    if (hasError) {
      return; // Stop submission if validation fails
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    const message = `
📝 **XÁC NHẬN DỰ TIỆC CƯỚI**

${data.name ? `👤 Họ và Tên: ${data.name}` : ""}
${data.message ? `💬 Lời nhắn: ${data.message}` : ""}
${
  data.attendance
    ? `${
        data.attendance === "Không thể tham dự"
          ? "❌"
          : data.attendance === "Có thể tham dự"
          ? "✅"
          : "❓"
      } Xác nhận: ${data.attendance}`
    : ""
}
${data.guestCount ? `👥 Số người: ${data.guestCount}` : ""}
${data.invitedBy ? `🤝 Người mời: ${data.invitedBy}` : ""}
    `.trim();

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: message,
            parse_mode: "Markdown",
          }),
        }
      );

      if (response.ok) {
        setSubmitStatus("success");
        setSubmitMessage("Gửi thành công! Cảm ơn bạn đã xác nhận");
        // Reset form
        reset({
          name: "",
          message: "",
          attendance: "",
          guestCount: "",
          invitedBy: "",
        });
        // Don't reset status to idle - keep success state permanently
      } else {
        setSubmitStatus("error");
        setSubmitMessage("Gửi thất bại. Vui lòng thử lại");
        setTimeout(() => setSubmitStatus("idle"), 3000);
      }
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage("Lỗi kết nối. Vui lòng thử lại");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="rsvp-section"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.p className="rsvp-greeting" variants={itemVariants}>
        Sự hiện diện của bạn là niềm vui lớn đối với gia đình. Rất hân hạnh được
        đón tiếp. Xin vui lòng xác nhận tham dự để tụi mình chuẩn bị chu đáo
        nhất nhé!
      </motion.p>

      <motion.div
        className="rsvp-form"
        variants={containerVariants}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "1rem",
        }}
      >
        {/* Show form only when not successfully submitted */}
        {submitStatus !== "success" && (
          <form
            onSubmit={handleSubmit(sendToTelegram)}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: "1rem",
            }}
          >
            {/* Name Field - Always Required (or auto-filled from query) */}
            {!initialName && (
              <>
                <motion.input
                  type="text"
                  placeholder="Họ và Tên"
                  {...register("name", {
                    required: "Vui lòng nhập họ và tên",
                  })}
                  className={`rsvp-input ${errors.name ? "error" : ""}`}
                  variants={itemVariants}
                  style={{ width: "100%" }}
                />
                {errors.name && (
                  <motion.p className="rsvp-error" variants={itemVariants}>
                    {errors.name.message}
                  </motion.p>
                )}
              </>
            )}

            {/* Show rest of form if name is provided (either from input or query param) */}
            {(watch("name")?.trim() || initialName) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                {initialName && (
                  <motion.div
                    className="rsvp-name-display"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="rsvp-name-label">Xác nhận thông tin:</p>
                    <p className="rsvp-name-value">{initialName} ❤️</p>
                  </motion.div>
                )}

                <motion.textarea
                  placeholder="Gửi lời nhận đến cô dâu và chú rể"
                  {...register("message")}
                  className="rsvp-textarea"
                  rows={4}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  style={{ width: "100%" }}
                />

                <motion.select
                  {...register("attendance", {
                    required: "Vui lòng chọn có thể tham dự không",
                  })}
                  className={`rsvp-select ${errors.attendance ? "error" : ""}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  style={{ width: "100%" }}
                >
                  <option value="">Bạn sẽ đến chứ?</option>
                  <option value="Có thể tham dự">✅ Có thể tham dự</option>
                  <option value="Không thể tham dự">
                    ❌ Không thể tham dự
                  </option>
                  <option value="Chưa chắc chắn">❓ Chưa chắc chắn</option>
                </motion.select>
                {errors.attendance && (
                  <motion.p
                    className="rsvp-error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.attendance.message}
                  </motion.p>
                )}

                {/* Guest Count - Only show when "Có thể tham dự" is selected */}
                {watchedAttendance === "Có thể tham dự" && (
                  <motion.select
                    {...register("guestCount", {
                      required:
                        watchedAttendance === "Có thể tham dự"
                          ? "Vui lòng chọn số người"
                          : false,
                    })}
                    className={`rsvp-select ${
                      errors.guestCount ? "error" : ""
                    }`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ width: "100%" }}
                  >
                    <option value="">Bạn đi bao nhiêu người?</option>
                    <option value="1 người">1 người</option>
                    <option value="2 người">2 người</option>
                    <option value="3 người">3 người</option>
                    <option value="4 người">4 người</option>
                    <option value="5 người">5 người</option>
                    <option value="6+ người">6+ người</option>
                  </motion.select>
                )}

                {watchedAttendance === "Có thể tham dự" &&
                  errors.guestCount && (
                    <motion.p
                      className="rsvp-error"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {errors.guestCount.message}
                    </motion.p>
                  )}

                {/* Invited By - Only show when NOT "Không thể tham dự" */}
                {watchedAttendance !== "Không thể tham dự" &&
                  watchedAttendance && (
                    <motion.div
                      className={`rsvp-invited-by ${
                        errors.invitedBy ? "error" : ""
                      }`}
                      style={{ width: "100%" }}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label>Bạn là khách mời của ai?</label>
                      <div
                        className="rsvp-radio-group"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "1rem",
                          width: "100%",
                          justifyContent: "flex-start",
                        }}
                      >
                        <label className="rsvp-radio row">
                          <input
                            type="radio"
                            value="Chú Rể"
                            {...register("invitedBy", {
                              required: "Vui lòng chọn bạn là khách của ai",
                            })}
                          />
                          <span>Chú Rể</span>
                        </label>
                        <label className="rsvp-radio">
                          <input
                            type="radio"
                            value="Cô Dâu"
                            {...register("invitedBy", {
                              required: "Vui lòng chọn bạn là khách của ai",
                            })}
                          />
                          <span>Cô Dâu</span>
                        </label>
                      </div>
                      {errors.invitedBy && (
                        <p
                          className="rsvp-error"
                          style={{
                            color: "red",
                            fontSize: "0.875rem",
                            marginTop: "0.5rem",
                            display: "block",
                          }}
                        >
                          {errors.invitedBy.message ||
                            "Vui lòng chọn bạn là khách của ai"}
                        </p>
                      )}
                    </motion.div>
                  )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="rsvp-button"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ width: "100%" }}
                >
                  {isSubmitting ? "Đang gửi..." : "GỬI LỜI NHẬN VÀ XÁC NHẬN"}
                </motion.button>
              </motion.div>
            )}
          </form>
        )}

        {/* Success Message and Gift Button - Show when successfully submitted */}
        {submitStatus === "success" && (
          <>
            <motion.div
              className="rsvp-message success"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              variants={itemVariants}
              style={{
                textAlign: "center",
                padding: "2rem",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              ✓ {submitMessage}
            </motion.div>

            {/* Gift Button - Show after successful submission */}
            <motion.button
              type="button"
              onClick={() => setShowGiftModal(true)}
              className="rsvp-button-gift"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ width: "100%" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              GỬI QUA MỪNG CƯỚI
            </motion.button>
          </>
        )}

        {/* Error Message - Show when there's an error */}
        {submitStatus === "error" && (
          <motion.div
            className="rsvp-message error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ✗ {submitMessage}
          </motion.div>
        )}
      </motion.div>

      {/* Gift Modal */}
      <GiftModal
        isOpen={showGiftModal}
        onClose={() => setShowGiftModal(false)}
        qrCode={giftQrCode}
        bankName={bankName}
        accountName={accountName}
        accountNumber={accountNumber}
        bankAddress={bankAddress}
      />
    </motion.div>
  );
};

export default RSVPForm;
