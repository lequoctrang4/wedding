import React from "react";
import { motion } from "framer-motion";
import { animationVariants } from "../utils/animations";

interface GalleryImage {
  src: string;
  alt: string;
  layout?: string;
}

interface GalleryProps {
  images: GalleryImage[];
  cols?: 1 | 2 | 3;
}

const Gallery: React.FC<GalleryProps> = ({ images, cols = 2 }) => {
  const gridClass = `gallery-grid-${cols}`;

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

  // Rotate between different animation styles for visual variety
  const imageAnimations = [
    animationVariants.popIn,
    animationVariants.slideInLeft,
    animationVariants.slideInRight,
    animationVariants.rotateIn,
    animationVariants.bounceUp,
    animationVariants.slideInTop,
  ];

  return (
    <motion.div
      className="gallery-section"
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.div className={`gallery-grid ${gridClass}`}>
        {images.map((img, idx) => (
          <motion.img
            key={idx}
            src={img.src}
            alt={img.alt}
            className="gallery-image"
            variants={imageAnimations[idx % imageAnimations.length]}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Gallery;
