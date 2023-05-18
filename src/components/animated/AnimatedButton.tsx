import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedButtonProps {
  className: string;
  text: string;
  onClick: () => void;
}

const AnimatedButton = (props: AnimatedButtonProps) => {
  const transitions = {
    type: 'spring',
    bounce: 0.5,
    duration: 0.15,
  };
  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: transitions,
    },
    pressed: {
      scale: 0.95,
      transition: transitions,
    },
    rest: {
      scale: 1,
      transition: transitions,
    },
  };

  return (
    <motion.button
      initial="rest"
      whileHover="hover"
      whileTap="pressed"
      variants={buttonVariants}
      className={` text-cC ${props.className} bg-cB py-3 px-7 border-4`}
      onClick={props.onClick}
    >
      {props.text}
    </motion.button>
  );
};
export default AnimatedButton;
