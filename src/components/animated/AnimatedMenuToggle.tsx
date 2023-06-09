import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface PathProps {
  d?: string;
  variants?: Variants | undefined;
  transition?: object | undefined;
}

const Path = (props: PathProps) => (
  <motion.path fill="transparent" strokeWidth="3" stroke="white" strokeLinecap="square" {...props} />
);

interface AnimatedMenuToggleProps {
  toggle: () => void;
}

const AnimatedMenuToggle = ({ toggle }: AnimatedMenuToggleProps) => (
  <button onClick={toggle} className="py-3 px-0 pr-2 mr-2 rounded-none bg-none ">
    <svg width="50" height="50" viewBox="0 0 23 23" className=" fill-white hidden sm:flex mt-4">
      <Path
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' }
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 }
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' }
        }}
      />
    </svg>
    <svg width="40" height="40" viewBox="0 0 23 23" className=" fill-white sm:hidden mt-3">
      <Path
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' }
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 }
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' }
        }}
      />
    </svg>
  </button>
);

export default AnimatedMenuToggle;
