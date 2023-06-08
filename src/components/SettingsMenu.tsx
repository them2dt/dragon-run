import React from 'react';
import Dialog from '@mui/material/Dialog';
import { DialogTitle, ListItem, ListItemButton, ListItemText, Stack, Slider, useTheme } from '@mui/material';
import { VolumeDown, VolumeUp } from '@mui/icons-material';

interface SettingsMenuProps {
  menuOpen: boolean;
  closeMenu: () => void;
}

export default function SettingsMenu({ menuOpen, closeMenu }: SettingsMenuProps) {
  const theme = useTheme();

  return (
    <Dialog open={menuOpen} onClose={closeMenu} sx={{ width: '100%' }}>
      <DialogTitle align="center">Settings</DialogTitle>
      <ListItem sx={{ '&:hover': { backgroundColor: 'background.light' } }}>
        <Stack spacing={2} direction="row" alignItems="center">
          <VolumeDown />
          <Slider aria-label="Volume" />
          <VolumeUp />
        </Stack>
      </ListItem>
      <ListItem sx={{ backgroundColor: theme.palette.secondary.main }}>
        <ListItemButton onClick={closeMenu}>
          <ListItemText sx={{ color: theme.palette.text.secondary, textAlign: 'center' }} primary="close" />
        </ListItemButton>
      </ListItem>
    </Dialog>
  );
}
