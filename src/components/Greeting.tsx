import React from "react";
import { motion } from "framer-motion";
import config from "../config/invitation.json";
import { animationVariants } from "../utils/animations";

const Greeting: React.FC = () => {
  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={animationVariants.slideInLeft}
      >
        <p className="greeting-text">
          <span dangerouslySetInnerHTML={{ __html: config.greeting.text }} />
        </p>
      </motion.div>
      <motion.div
        className="divider"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        style={{ originX: 0.5 }}
      />
    </>
  );
};

export default Greeting;
