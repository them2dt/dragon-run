import React from 'react';
import { motion } from 'framer-motion';
import theme from '@consts/theme/theme';

interface AnimatedNewHighScoreTitleProps {
  text: string;
  className?: string;
}

const AnimatedNewHighScoreTitle = (props: AnimatedNewHighScoreTitleProps) => {
  return (
    <motion.h1
      animate={{ color: [theme.colors.cB, theme.colors.cC, theme.colors.cB] }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={`py-4 text-2xl xs:text-2xl sm:text-3xl md:text-4xl ${props.className}`}
    >
      {props.text}
    </motion.h1>
  );
};

export default AnimatedNewHighScoreTitle;
