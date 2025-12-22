import React from "react";
import { motion } from "framer-motion";
import { animationVariants } from "../utils/animations";

interface QuoteProps {
  text: string;
  author: string;
}

const Quote: React.FC<QuoteProps> = ({ text, author }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.div className="quote-text" variants={animationVariants.rotateIn}>
        <span dangerouslySetInnerHTML={{ __html: text }} />
      </motion.div>
      <motion.div
        className="quote-author"
        variants={animationVariants.slideInBottom}
      >
        {author}
      </motion.div>
    </motion.div>
  );
};

export default Quote;
