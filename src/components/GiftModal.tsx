import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrCode: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  bankAddress?: string;
}

const GiftModal: React.FC<GiftModalProps> = ({
  isOpen,
  onClose,
  qrCode,
  bankName,
  accountName,
  accountNumber,
  bankAddress,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="gift-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            className="gift-modal-container"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="gift-modal-header">
              <button className="gift-modal-close" onClick={onClose}>
                ✕
              </button>
              <h2 className="gift-modal-title">Hộp Mừng Cưới</h2>
            </div>

            <div className="gift-modal-content">
              <p className="gift-modal-text">
                Cảm ơn tất cả các tình cảm mà các em, các bạn, các anh các chị
                đã dành cho hai vợ chồng
              </p>

              <div className="gift-section">
                <h3 className="gift-section-title">LỊ XỊ MỪNG CƯỚI</h3>

                <div className="gift-qr-container">
                  <div className="gift-bank-logo">VIETQRa™</div>
                  <img src={qrCode} alt="QR Code" className="gift-qr-code" />
                </div>

                <div className="gift-info">
                  <div className="gift-info-row">
                    <span className="gift-info-label">Người nhận:</span>
                    <span className="gift-info-value">{accountName}</span>
                  </div>
                  <div className="gift-info-row">
                    <span className="gift-info-label">Số tài khoản:</span>
                    <span
                      className="gift-info-value"
                      style={{ fontFamily: "Montserrat" }}
                    >
                      {accountNumber}
                    </span>
                  </div>
                  <div className="gift-info-row">
                    <span className="gift-info-label">Ngân hàng:</span>
                    <span className="gift-info-value">{bankName}</span>
                  </div>
                  {bankAddress && (
                    <div className="gift-info-row">
                      <span className="gift-info-label">Chi nhánh:</span>
                      <span className="gift-info-value">{bankAddress}</span>
                    </div>
                  )}
                </div>
              </div>

              <button className="gift-modal-done" onClick={onClose}>
                Hoàn Tất
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GiftModal;
