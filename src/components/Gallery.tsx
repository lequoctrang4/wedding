import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { animationVariants } from "../utils/animations";

interface GalleryImage {
  src: string;
  alt: string;
  layout?: string;
}

interface GalleryProps {
  images: GalleryImage[];
  cols?: 1 | 2 | 3;
  carousel?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  marquee?: boolean;
  marqueeSpeed?: number;
}

const Gallery: React.FC<GalleryProps> = ({
  images,
  cols = 2,
  carousel = false,
  autoPlay = false,
  autoPlayInterval = 3000,
  marquee = false,
  marqueeSpeed = 50,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto play functionality for single image carousel
  useEffect(() => {
    if (carousel && !marquee && autoPlay && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, autoPlayInterval);

      return () => clearInterval(interval);
    }
  }, [carousel, marquee, autoPlay, images.length, autoPlayInterval]);

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

  // Carousel slide variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  // Marquee carousel - scrolling multiple images (CSS-based)
  if (carousel && marquee) {
    return (
      <motion.div
        className="gallery-section marquee"
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="marquee-container">
          <div className="marquee-track">
            {/* Duplicate images for seamless loop */}
            {[...images, ...images].map((img, index) => (
              <div key={index} className="marquee-image-wrapper">
                <img src={img.src} alt={img.alt} className="marquee-image" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  // Single image carousel
  if (carousel) {
    return (
      <motion.div
        className="gallery-section carousel"
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="carousel-container">
          <AnimatePresence mode="wait" custom={1}>
            <motion.img
              key={currentIndex}
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="carousel-image"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            />
          </AnimatePresence>

          {/* Dots indicator */}
          <div className="carousel-dots">
            {images.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${
                  index === currentIndex ? "active" : ""
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

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
