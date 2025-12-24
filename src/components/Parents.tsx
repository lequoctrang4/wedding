import React from "react";
import { motion } from "framer-motion";
import config from "../config/invitation.json";
import { animationVariants } from "../utils/animations";

const Parents: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="parents-container"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className="parent-side"
        variants={animationVariants.slideInRight}
      >
        <motion.div
          className="parent-label"
          variants={animationVariants.slideInTop}
        >
          Nhà Gái
        </motion.div>
        <motion.div
          className="parent-names"
          variants={animationVariants.slideInRight}
        >
          <strong>{config.couple.brideFather}</strong>
          <strong>{config.couple.brideMother}</strong>
        </motion.div>
      </motion.div>
      <motion.div
        className="parent-side"
        variants={animationVariants.slideInLeft}
      >
        <motion.div
          className="parent-label"
          variants={animationVariants.slideInTop}
        >
          Nhà Trai
        </motion.div>
        <motion.div
          className="parent-names"
          variants={animationVariants.slideInLeft}
        >
          <strong>{config.couple.groomFather}</strong>
          <strong>{config.couple.groomMother}</strong>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Parents;
