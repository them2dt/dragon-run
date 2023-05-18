import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  className: string;
  onClick: () => void;
}

const LoadingSpinner = (props: LoadingSpinnerProps) => {
  const loadingSpinnerAnimation = {
    initial: { opacity: 0 },
    animate: {
      opacity: 0.8,
      transition: {
        duration: 1,
      },
    },
    exit: { opacity: 0, transition: { duration: 1.5 } },
  };

  return (
    <motion.img
      variants={loadingSpinnerAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`h-[40px] xs:h-[50px] sm:h-[70px] lg:h-[80px] sm:px-3 md:px-0 cursor-pointer ${props.className}`}
      src={'/loading/Blocks-0.9s-200px.svg'}
      alt=""
      onClick={props.onClick}
    />
  );
};

export default LoadingSpinner;
