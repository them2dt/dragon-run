import React from "react";
import { motion } from "framer-motion";
import run from "@assets/RUN.png";

interface AnimatedRunTextProps {
  className?: string;
}

const AnimatedRunText = ({ className }: AnimatedRunTextProps) => {
  return (
    <motion.img
      animate={{ scale: [0.2, 1, 1, 0.2], opacity: [0.8, 1, 1, 1, 0.3] }}
      transition={{ duration: 2, delay: 0, ease: "easeInOut" }}
      className={`mx-auto my-auto h-auto mt-20 w-[200px] md:w-[300px] 
      md:max-w-[30vw] lg:w-[400px] rendering-pixelated ${className}`}
      src={run}
    />
  );
};

export default AnimatedRunText;
