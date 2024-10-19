import React from "react";
import { motion } from "framer-motion";

const animationVariants = {
  initial: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      style={{ width: "100%", height: "100%" }}
      variants={animationVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
