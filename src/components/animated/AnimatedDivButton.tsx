import React from "react";
import { motion } from "framer-motion";

interface AnimatedDivButtonProps {
  className: string;
  text: string;
  onClick: () => void;
}

const AnimatedDivButton = (props: AnimatedDivButtonProps) => {
  const divButtonVariants = {
    hover: {
      scale: 1.1
    },
    pressed: {
      scale: 0.9
    },
    rest: {
      scale: 1
    }
  };

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileTap="pressed"
      variants={divButtonVariants}
      className={props.className}
      onClick={props.onClick}
    >
      {props.text}
    </motion.div>
  );
};
export default AnimatedDivButton;
