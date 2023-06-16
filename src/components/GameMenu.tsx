import React from 'react';
import eventsCenter from 'utils/eventsCenter';
import EventKeys from 'constants/EventKeys';
import Dialog from '@mui/material/Dialog';
import { DialogTitle, IconButton, ListItem, ListItemButton, ListItemText, Paper, Stack, useTheme } from '@mui/material';
import { discord, twitter } from '@consts/Socials';
import { FaDiscord, FaTwitter } from 'react-icons/fa';
import MenuSlideTransition from './MenuSlideTransition';

interface GameMenuProps {
  menuOpen: boolean;
  closeMenu: () => void;
  openLeaderboard: () => void;
  openSettings: () => void;
}

export default function GameMenu({ menuOpen, closeMenu, openLeaderboard, openSettings }: GameMenuProps) {
  const muiTheme = useTheme();

  return (
    <Dialog open={menuOpen} onClose={closeMenu} TransitionComponent={MenuSlideTransition} sx={{ width: '100%' }}>
      <Paper
        sx={{
          minWidth: 200,
          [muiTheme.breakpoints.up('sm')]: {
            minWidth: 300
          },
          [muiTheme.breakpoints.up('md')]: {
            minWidth: 400
          },
          [muiTheme.breakpoints.up('lg')]: {
            minWidth: 500
          }
        }}
      >
        <DialogTitle align="center" color={muiTheme.palette.text.secondary}>
          Menu
        </DialogTitle>
        <ListItem sx={{ '&:hover': { backgroundColor: 'background.light' } }}>
          <ListItemButton onClick={() => eventsCenter.emit(EventKeys.GoToHome)}>
            <ListItemText sx={{ textAlign: 'center' }} primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ '&:hover': { backgroundColor: 'background.light' } }}>
          <ListItemButton onClick={() => eventsCenter.emit(EventKeys.GoToStore)}>
            <ListItemText sx={{ textAlign: 'center' }} primary="Store" />
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ '&:hover': { backgroundColor: 'background.light' } }}>
          <ListItemButton onClick={openLeaderboard}>
            <ListItemText sx={{ textAlign: 'center' }} primary="Leaderboard" />
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ '&:hover': { backgroundColor: 'background.light' } }}>
          <ListItemButton onClick={openSettings}>
            <ListItemText sx={{ textAlign: 'center' }} primary="Settings" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <Stack direction="row" spacing={2} justifyContent="center" width={'100%'}>
            <IconButton onClick={() => window.open(discord, '_blank')} size="large">
              <FaDiscord color="#5460E6" />
            </IconButton>
            <IconButton onClick={() => window.open(twitter, '_blank')} size="large">
              <FaTwitter color="#1C98E5" />
            </IconButton>
          </Stack>
        </ListItem>
        <ListItem sx={{ backgroundColor: muiTheme.palette.secondary.main }}>
          <ListItemButton onClick={closeMenu}>
            <ListItemText sx={{ color: muiTheme.palette.text.secondary, textAlign: 'center' }} primary="Resume" />
          </ListItemButton>
        </ListItem>
      </Paper>
    </Dialog>
  );
}
