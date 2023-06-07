import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedOnViewTitleLgProps {
  text: string;
  className?: string;
  onClick?: () => void;
  delay: number;
}

const AnimatedOnViewTitleLg = (props: AnimatedOnViewTitleLgProps) => {
  const titleAnimations = {
    offscreen: { opacity: 0, scale: 0.7 },
    onscreen: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', bounce: 0.5, duration: 1.5, delay: 0 + props.delay },
    },
  };

  return (
    <motion.h1
      initial={'offscreen'}
      whileInView={'onscreen'}
      viewport={{ once: true, amount: 1 }}
      onClick={props.onClick}
      variants={titleAnimations}
      className={`py-4 text-cB text-4xl sm:text-7xl md:text-8xl ${props.className}`}
    >
      {props.text}
    </motion.h1>
  );
};

export default AnimatedOnViewTitleLg;
