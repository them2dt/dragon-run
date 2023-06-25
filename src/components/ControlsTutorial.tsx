/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

export default function ControlsTutorial() {
  const muiTheme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        width: 1,
        height: 1,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        left: 0,
        top: 0,
        px: 2
      }}
    >
      <motion.div
        animate={{ opacity: [1, 0.6, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="flex flex-col justify-center items-center w-full h-full"
      >
        <Typography sx={{ color: muiTheme.palette.text.secondary, mt: 'auto', mb: '20%', px: 3 }} variant="h4">
          The game begins when you move!
        </Typography>
        <Typography sx={{ color: muiTheme.palette.text.secondary, my: 'auto', px: 3 }} variant="h5">
          Use 'W' 'A' 'S' 'D' or arrow keys to move
        </Typography>
      </motion.div>
    </Box>
  );
}
