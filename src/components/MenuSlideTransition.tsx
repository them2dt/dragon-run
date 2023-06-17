import React from 'react';
import { Slide } from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';

const MenuSlideTransition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default MenuSlideTransition;
