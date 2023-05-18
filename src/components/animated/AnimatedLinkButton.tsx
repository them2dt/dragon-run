import React from 'react';
import { motion } from 'framer-motion';
import { useOverlay } from '../../context/useOverlay';
import OverlayKeys from '../../consts/OverlayKeys';

interface AnimatedLinkButtonProps {
  className: string;
  text: string;
  linkOrOverlay: string | OverlayKeys;
}

const AnimatedLinkButton = (props: AnimatedLinkButtonProps) => {
  const { setOverlay } = useOverlay();

  const buttonVariants = {
    hover: {
      scale: 1.1,
    },
    pressed: {
      scale: 0.9,
    },
    rest: {
      scale: 1,
    },
  };

  const handleButtonClick = (linkOrOverlay: string | OverlayKeys) => {
    if (typeof linkOrOverlay === 'string') {
      window.open(linkOrOverlay, '_blank');
      return;
    } else {
      setOverlay(linkOrOverlay);
    }
  };

  return (
    <motion.button
      initial="rest"
      whileHover="hover"
      whileTap="pressed"
      variants={buttonVariants}
      className={`text-xl text-cC ${props.className}`}
      onClick={() => handleButtonClick(props.linkOrOverlay)}
    >
      {props.text}
    </motion.button>
  );
};
export default AnimatedLinkButton;
