import React from "react";
import { motion } from "framer-motion";
import config from "../config/invitation.json";
import { animationVariants } from "../utils/animations";

const Header: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = animationVariants.slideInTop;

  return (
    <motion.div
      className="header-section"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div className="ornament" variants={itemVariants}>
        <svg viewBox="0 0 100 50">
          <path
            d="M50 25 C30 10, 10 25, 10 25 C10 25, 30 40, 50 25 C70 40, 90 25, 90 25 C90 25, 70 10, 50 25"
            fill="none"
            stroke="#c9a227"
            strokeWidth="1"
          />
        </svg>
      </motion.div>

      <motion.div className="header-title" variants={itemVariants}>
        Wedding Invitation
      </motion.div>

      <motion.div className="main-names" variants={itemVariants}>
        <span>{config.couple.brideName}</span>
        <span className="amp">&</span>
        <span>{config.couple.groomName}</span>
      </motion.div>

      <motion.div className="main-date" variants={itemVariants}>
        {config.event.eventDate}
      </motion.div>
    </motion.div>
  );
};

export default Header;
