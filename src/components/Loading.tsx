import React from "react";
import { motion } from "framer-motion";

interface LoadingProps {
  isLoading: boolean;
  progress: number;
}

const Loading: React.FC<LoadingProps> = ({ isLoading, progress }) => {
  if (!isLoading) return null;

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="loading-content">
        <motion.div
          className="loading-heart"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ❤️
        </motion.div>

        <motion.h2
          className="loading-text"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Đang chuẩn bị thiệp mời...
        </motion.h2>

        <div className="loading-bar-container">
          <motion.div
            className="loading-bar"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <motion.p
          className="loading-percent"
          animate={{ opacity: [0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {Math.floor(progress)}%
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Loading;
