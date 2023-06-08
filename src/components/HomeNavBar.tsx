import React from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { Settings } from '@mui/icons-material';

interface HomeNavBarProps {
  openSettings: () => void;
}

export default function HomeNavBar({ openSettings }: HomeNavBarProps) {
  const muiTheme = useTheme();
  return (
    <Box className="fixed left-[5px] top-[2px]">
      <IconButton aria-label="settings" onClick={openSettings}>
        <Settings sx={{ fill: muiTheme.palette.text.secondary }} fontSize="large" />
      </IconButton>
    </Box>
  );
}
