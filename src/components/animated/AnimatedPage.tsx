import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedPageProps {
  children: React.ReactNode;
}

const AnimatedPage = ({ children }: AnimatedPageProps) => {
  const pageAnimations = {
    initial: { scale: 1, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1, opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div variants={pageAnimations} initial="initial" animate="animate" exit="exit" transition={{ duration: 1 }}>
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
