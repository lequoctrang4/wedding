import React, { useState } from "react";
import { motion } from "framer-motion";
import { animationVariants } from "../utils/animations";
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
  const [formData, setFormData] = useState({
    name: initialName,
    message: "",
    attendance: "",
    guestCount: "",
    invitedBy: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [showGiftModal, setShowGiftModal] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.attendance.trim() &&
      formData.guestCount.trim() &&
      formData.invitedBy.trim()
    );
  };

  const sendToTelegram = async () => {
    if (!formData.name.trim()) {
      setSubmitStatus("error");
      setSubmitMessage("Vui lòng nhập họ và tên");
      setTimeout(() => setSubmitStatus("idle"), 3000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    const message = `
📝 **XÁC NHẬN DỰ TIỆC CƯỚI**

${formData.name ? `👤 Họ và Tên: ${formData.name}` : ""}
${formData.message ? `💬 Lời nhắn: ${formData.message}` : ""}
${formData.attendance ? `✅ Có thể tham dự: ${formData.attendance}` : ""}
${formData.guestCount ? `👥 Số người: ${formData.guestCount}` : ""}
${formData.invitedBy ? `🤝 Người mời: ${formData.invitedBy}` : ""}
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
        // Reset form immediately
        setFormData({
          name: "",
          message: "",
          attendance: "",
          guestCount: "",
          invitedBy: "",
        });
        setIsSubmitting(false);
        setTimeout(() => setSubmitStatus("idle"), 3000);
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = animationVariants.slideInBottom;

  return (
    <motion.div
      className="rsvp-section"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {!initialName && (
        <motion.p className="rsvp-greeting" variants={itemVariants}>
          Mỗi lời hỏi đáp của bạn chính là một niềm vui lớn đối với chúng tôi.
          Hãy nhận xác nhận để cùng chung vui nhé!
        </motion.p>
      )}

      <motion.div className="rsvp-form" variants={containerVariants}>
        {/* Name Field - Always Required (or auto-filled from query) */}
        {!initialName && (
          <motion.input
            type="text"
            name="name"
            placeholder="Họ và Tên"
            value={formData.name}
            onChange={handleInputChange}
            className="rsvp-input"
            variants={itemVariants}
          />
        )}

        {/* Show rest of form if name is provided (either from input or query param) */}
        {(formData.name.trim() || initialName) && (
          <>
            {initialName && !formData.name.trim() && (
              <motion.div className="rsvp-name-display" variants={itemVariants}>
                <p className="rsvp-name-label">Xác nhận thông tin:</p>
                <p className="rsvp-name-value">{initialName}</p>
              </motion.div>
            )}
            <motion.textarea
              name="message"
              placeholder="Gửi lời nhận đến cô dâu và chú rể"
              value={formData.message}
              onChange={handleInputChange}
              className="rsvp-textarea"
              rows={4}
              variants={itemVariants}
            />

            <motion.select
              name="attendance"
              value={formData.attendance}
              onChange={handleInputChange}
              className="rsvp-select"
              variants={itemVariants}
            >
              <option value="">Ban sẽ đến chữ?</option>
              <option value="Có thể tham dự">Có thể tham dự</option>
              <option value="Không thể tham dự">Không thể tham dự</option>
              <option value="Chưa chắc chắn">Chưa chắc chắn</option>
            </motion.select>

            <motion.select
              name="guestCount"
              value={formData.guestCount}
              onChange={handleInputChange}
              className="rsvp-select"
              variants={itemVariants}
            >
              <option value="">Ban đi bao nhiêu người?</option>
              <option value="1 người">1 người</option>
              <option value="2 người">2 người</option>
              <option value="3 người">3 người</option>
              <option value="4 người">4 người</option>
              <option value="5 người">5 người</option>
              <option value="6+ người">6+ người</option>
            </motion.select>

            <motion.div className="rsvp-invited-by" variants={itemVariants}>
              <label>Bạn là khách mới của ai?</label>
              <div className="rsvp-radio-group">
                <label className="rsvp-radio row">
                  <input
                    type="radio"
                    name="invitedBy"
                    value="Chú Rể"
                    checked={formData.invitedBy === "Chú Rể"}
                    onChange={handleInputChange}
                  />
                  <span>Chú Rể</span>
                </label>
                <label className="rsvp-radio">
                  <input
                    type="radio"
                    name="invitedBy"
                    value="Cô Dâu"
                    checked={formData.invitedBy === "Cô Dâu"}
                    onChange={handleInputChange}
                  />
                  <span>Cô Dâu</span>
                </label>
              </div>
            </motion.div>
          </>
        )}

        {/* Submit Button */}
        {formData.name.trim() && (
          <motion.button
            onClick={sendToTelegram}
            disabled={isSubmitting || !isFormValid()}
            className="rsvp-button"
            variants={itemVariants}
            whileHover={isFormValid() ? { scale: 1.02 } : {}}
            whileTap={isFormValid() ? { scale: 0.98 } : {}}
          >
            {isSubmitting ? "Đang gửi..." : "GỬI LỜI NHẬN VÀ XÁC NHẬN"}
          </motion.button>
        )}

        {/* Gift Button - Always visible below submit button */}
        {formData.name.trim() && (
          <motion.button
            onClick={() => setShowGiftModal(true)}
            className="rsvp-button-gift"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            GỬI QUA CƯỚI
          </motion.button>
        )}

        {/* Status Message */}
        {submitStatus === "success" && (
          <motion.div
            className="rsvp-message success"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ✓ {submitMessage}
          </motion.div>
        )}

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
