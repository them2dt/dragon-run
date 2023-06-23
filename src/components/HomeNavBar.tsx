import React from 'react';
import { Box, IconButton, Stack, useTheme } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { discord, twitter } from '@consts/Links';
import { FaDiscord, FaTwitter } from 'react-icons/fa';

interface HomeNavBarProps {
  openSettings: () => void;
}

export default function HomeNavBar({ openSettings }: HomeNavBarProps) {
  const muiTheme = useTheme();
  return (
    <Box className="fixed left-[5px] top-[2px]">
      <Stack direction="row" spacing={0} justifyContent="center" width={'100%'} height={'100%'}>
        <IconButton
          aria-label="settings"
          onClick={openSettings}
          sx={{ '&:hover': { backgroundColor: muiTheme.palette.background.light } }}
        >
          <Settings sx={{ fill: muiTheme.palette.text.secondary }} fontSize="large" />
        </IconButton>
        <IconButton
          onClick={() => window.open(twitter, '_blank')}
          size="small"
          sx={{ my: 'auto', '&:hover': { backgroundColor: muiTheme.palette.background.light } }}
        >
          <FaTwitter fontSize={'1.6rem'} color="#1C98E5" />
        </IconButton>
        <IconButton
          onClick={() => window.open(discord, '_blank')}
          size="small"
          sx={{ my: 'auto', '&:hover': { backgroundColor: muiTheme.palette.background.light } }}
        >
          <FaDiscord fontSize={'1.9rem'} color="#5460E6" />
        </IconButton>
      </Stack>
    </Box>
  );
}
