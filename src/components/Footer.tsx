import React from "react";
import { motion } from "framer-motion";
import config from "../config/invitation.json";
import { animationVariants } from "../utils/animations";

const Footer: React.FC = () => {
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

  const itemVariants = animationVariants.slideInBottom;

  return (
    <motion.div
      className="footer-section"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div className="footer-names" variants={itemVariants}>
        <div>{config.couple.brideName}</div>
        {"  &  "}
        <div>{config.couple.groomName}</div>
      </motion.div>

      <motion.div className="footer-date" variants={itemVariants}>
        {config.event.eventDate}
      </motion.div>

      <motion.div className="footer-thanks" variants={itemVariants}>
        {config.footer.thanks}
      </motion.div>
    </motion.div>
  );
};

export default Footer;
