import React from "react";
import { motion } from "framer-motion";
import { animationVariants } from "../utils/animations";

interface CoupleIntroProps {
  groomName: string;
  brideName: string;
  photo?: string;
}

const CoupleIntro: React.FC<CoupleIntroProps> = ({
  groomName,
  brideName,
  photo,
}) => {
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
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className="couple-intro"
        variants={animationVariants.slideInTop}
      >
        Chú Rể & Cô Dâu
      </motion.div>

      <motion.div
        className="couple-main-names"
        variants={animationVariants.bounceUp}
      >
        <div>{groomName}</div>
        <div>&</div>
        <div>{brideName}</div>
      </motion.div>

      {photo && (
        <motion.img
          src={photo}
          alt="Couple"
          className="couple-photo-large"
          variants={animationVariants.popIn}
        />
      )}
    </motion.div>
  );
};

export default CoupleIntro;
