import React from 'react';
import eventsCenter from 'utils/eventsCenter';
import EventKeys from 'constants/EventKeys';
import Dialog from '@mui/material/Dialog';
import { DialogTitle, ListItem, ListItemButton, ListItemText, useTheme } from '@mui/material';

interface GameMenuProps {
  menuOpen: boolean;
  closeMenu: () => void;
  openLeaderboard: () => void;
}

export default function GameMenu({ menuOpen, closeMenu, openLeaderboard }: GameMenuProps) {
  const theme = useTheme();

  return (
    <Dialog open={menuOpen} onClose={closeMenu} sx={{width: '100%'}}>
      <DialogTitle align='center'>Menu</DialogTitle>
      <ListItem  sx={{ '&:hover': { backgroundColor: 'background.light' } }}>
        <ListItemButton onClick={() => eventsCenter.emit(EventKeys.GoToHome)}>
          <ListItemText sx={{ textAlign: 'center' }} primary="Home"  />
        </ListItemButton>
      </ListItem>
      <ListItem  sx={{ '&:hover': { backgroundColor: 'background.light' } }}>
        <ListItemButton>
          <ListItemText sx={{ textAlign: 'center' }} primary="Store" className=" line-through" />
        </ListItemButton>
      </ListItem>
      <ListItem  sx={{ '&:hover': { backgroundColor: 'background.light' } }}>
        <ListItemButton onClick={openLeaderboard}>
          <ListItemText sx={{ textAlign: 'center' }} primary="Leaderboard"  />
        </ListItemButton>
      </ListItem>
      <ListItem  sx={{ '&:hover': { backgroundColor: 'background.light' } }}>
        <ListItemButton>
          <ListItemText sx={{ textAlign: 'center' }} primary="Socials" className=" line-through" />
        </ListItemButton>
      </ListItem>
      <ListItem sx={{ backgroundColor: theme.palette.secondary.main }} >
        <ListItemButton onClick={closeMenu}>
          <ListItemText sx={{ color: theme.palette.text.secondary, textAlign: 'center' }} primary="Resume"  />
        </ListItemButton>
      </ListItem>
    </Dialog>
  );
}
