import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  className?: string;
  success?: boolean;
  error?: boolean;
}

const LoadingSpinner = ({ className, success, error }: LoadingSpinnerProps) => {
  const loadingSpinnerAnimation = {
    initial: { opacity: 0 },
    animate: {
      opacity: 0.8,
      transition: {
        duration: 1
      }
    },
    exit: { opacity: 0, transition: { duration: 1.5 } }
  };

  const [source, setSource] = useState("/loading/blocks-loading.svg");

  useEffect(() => {
    if (success) {
      setSource("/loading/blocks-success.svg");
    } else if (error) {
      setSource("/loading/blocks-error.svg");
    } else {
      setSource("/loading/blocks-loading.svg");
    }
  }, [success, error]);

  return (
    <motion.img
      variants={loadingSpinnerAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`h-[40px] xs:h-[50px] sm:h-[70px] lg:h-[80px] sm:px-3 md:px-0 cursor-auto ${className}`}
      src={source}
      alt=""
    />
  );
};

export default LoadingSpinner;
