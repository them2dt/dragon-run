import React from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { discord, twitter } from '@consts/Socials';
import { FaDiscord, FaTwitter } from 'react-icons/fa';

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
      <IconButton onClick={() => window.open(twitter, '_blank')} size="large">
        <FaTwitter color="#1C98E5" />
      </IconButton>
      <IconButton onClick={() => window.open(discord, '_blank')} size="large">
        <FaDiscord color="#5460E6" />
      </IconButton>
    </Box>
  );
}
