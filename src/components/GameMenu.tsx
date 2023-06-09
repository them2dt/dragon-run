import React from 'react';
import eventsCenter from 'utils/eventsCenter';
import EventKeys from 'constants/EventKeys';
import Dialog from '@mui/material/Dialog';
import { DialogTitle, ListItem, ListItemButton, ListItemText, Paper, useTheme } from '@mui/material';

interface GameMenuProps {
  menuOpen: boolean;
  closeMenu: () => void;
  openLeaderboard: () => void;
  openSettings: () => void;
}

export default function GameMenu({ menuOpen, closeMenu, openLeaderboard, openSettings }: GameMenuProps) {
  const muiTheme = useTheme();

  return (
    <Dialog open={menuOpen} onClose={closeMenu} sx={{ width: '100%' }}>
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
          <ListItemButton>
            <ListItemText sx={{ textAlign: 'center' }} primary="Socials" className=" line-through" />
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ '&:hover': { backgroundColor: 'background.light' } }}>
          <ListItemButton onClick={openSettings}>
            <ListItemText sx={{ textAlign: 'center' }} primary="Settings" />
          </ListItemButton>
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
