import React from 'react';
import eventsCenter from '@events-center';
import EventKeys from '@consts/EventKeys';
import Dialog from '@mui/material/Dialog';
import { DialogTitle, ListItem, ListItemButton, ListItemText, useTheme } from '@mui/material';

interface GameMenuProps {
    menuOpen: boolean;
    closeMenu: () => void;
}

export default function GameMenu({ menuOpen, closeMenu }: GameMenuProps) {

    const theme = useTheme();

  return (
    <Dialog open={menuOpen} onClose={closeMenu}>
      <DialogTitle className="text-center">Menu</DialogTitle>
      <ListItem className="text-center">
        <ListItemButton onClick={() => eventsCenter.emit(EventKeys.GoToHome)}>
          <ListItemText primary="Home" className="text-center" />
        </ListItemButton>
      </ListItem>
      <ListItem className="text-center">
        <ListItemButton >
          <ListItemText primary="Store" className="text-center line-through" />
        </ListItemButton>
      </ListItem>
      <ListItem className="text-center">
        <ListItemButton >
          <ListItemText primary="Leaderboard" className="text-center line-through" />
        </ListItemButton>
      </ListItem>
      <ListItem className="text-center">
        <ListItemButton >
          <ListItemText primary="Socials" className="text-center line-through" />
        </ListItemButton>
      </ListItem>
      <ListItem sx={{backgroundColor: theme.palette.secondary.main}} className="text-center">
        <ListItemButton onClick={closeMenu}>
          <ListItemText sx={{color: theme.palette.text.secondary}} primary="Resume" className="text-center" />
        </ListItemButton>
      </ListItem>
    </Dialog>
  );

}
