import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedPageDelayedProps {
  children: React.ReactNode;
}

const AnimatedPageDelayed = ({ children }: AnimatedPageDelayedProps) => {
  const pageAnimationsDelayed = {
    initial: { scale: 1, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { delay: 1, duration:2 } },
    exit: { scale: 1, opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div variants={pageAnimationsDelayed} initial="initial" animate="animate" exit="exit" transition={{ duration: 1 }}>
      {children}
    </motion.div>
  );
};

export default AnimatedPageDelayed;
