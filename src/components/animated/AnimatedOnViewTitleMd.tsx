import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedOnViewTitleMdProps {
  className?: string;
  text: string;
  onClick?: () => void;
  delay: number;
}

const AnimatedOnViewTitleMd = (props: AnimatedOnViewTitleMdProps) => {
  const titleMDAnimations = {
    offscreen: { opacity: 0, scale: 0.7 },
    onscreen: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', bounce: 0.5, duration: 1.5, delay: 0 + props.delay }
    }
  };

  return (
    <motion.h1
      initial={'offscreen'}
      whileInView={'onscreen'}
      viewport={{ once: true, amount: 1 }}
      onClick={props.onClick}
      variants={titleMDAnimations}
      className={` text-4xl sm:text-5xl md:text-7xl ${props.className}`}
    >
      {props.text}
    </motion.h1>
  );
};

export default AnimatedOnViewTitleMd;
