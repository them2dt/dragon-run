import React from "react";
import { motion } from "framer-motion";

interface AnimatedNewHighScoreTitleProps {
  text: string;
  className?: string;
}

const AnimatedNewHighScoreTitle = (props: AnimatedNewHighScoreTitleProps) => {
  return (
    <motion.h1
      animate={{ color: ["#a3e635", "#ffffff", "#ffffff", "#a3e635", "#a3e635", "#a3e635"] }}
      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      className={`text-2xl xs:text-2xl sm:text-3xl md:text-4xl ${props.className}`}
    >
      {props.text}
    </motion.h1>
  );
};

export default AnimatedNewHighScoreTitle;
