// Animation variants for framer-motion
export const animationVariants = {
  // Slide from left
  slideInLeft: {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  },

  // Slide from right
  slideInRight: {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  },

  // Slide from top
  slideInTop: {
    hidden: { opacity: 0, y: -60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  },

  // Slide from bottom
  slideInBottom: {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  },

  // Scale up with fade
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },

  // Rotate and fade
  rotateIn: {
    hidden: { opacity: 0, rotate: -20, scale: 0.8 },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  },

  // Pop in
  popIn: {
    hidden: { opacity: 0, scale: 0.6 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }, // Spring-like easing
    },
  },

  // Bounce up
  bounceUp: {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }, // Spring easing
    },
  },

  // Fade only
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 },
    },
  },

  // Combined: Fade + Slide Up (for staggered lists)
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  },

  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },
};

// Animation presets for different sections
export const sectionAnimations = {
  header: {
    variants: animationVariants.slideInTop,
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.3 },
  },

  greetingText: {
    variants: animationVariants.slideInLeft,
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.5 },
  },

  eventDetails: {
    variants: animationVariants.slideInRight,
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.3 },
  },

  galleryImage: {
    variants: animationVariants.popIn,
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.2 },
  },

  quote: {
    variants: animationVariants.rotateIn,
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.5 },
  },

  couple: {
    variants: animationVariants.bounceUp,
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.3 },
  },
};
