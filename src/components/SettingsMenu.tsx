import React from 'react';
import Dialog from '@mui/material/Dialog';
import { DialogTitle, ListItem, ListItemButton, ListItemText, Stack, Slider, useTheme, Switch } from '@mui/material';
import { VolumeDown, VolumeUp } from '@mui/icons-material';
import { useSettings } from '@context/useSettings';

interface SettingsMenuProps {
  settingsOpen: boolean;
  closeSettings: () => void;
}

export default function SettingsMenu({ settingsOpen, closeSettings }: SettingsMenuProps) {
  const theme = useTheme();
  const { volume, setVolume, fullscreen, setFullscreen } = useSettings();

  const handleVolumeChange = (event: any, newVolume: number | number[]) => {
    setVolume(newVolume as number);
  };

  const handleFullscreenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!document || !document.body) return;
    try {
      if (event.target.checked) document.body.requestFullscreen();
      else document.exitFullscreen();
      setFullscreen(event.target.checked);
    } catch (e) {
      console.log('Error toggling fullscreen: ', e);
    }
  };

  return (
    <Dialog open={settingsOpen} onClose={closeSettings} sx={{ width: '100%' }}>
      <DialogTitle align="center">Settings</DialogTitle>
      <ListItem sx={{ '&:hover': { backgroundColor: 'background.light' } }}>
        <Stack spacing={1} direction="row" alignItems="center" sx={{ width: '100%' }}>
          <VolumeDown />
          <Slider aria-label="Volume" value={volume} onChange={handleVolumeChange} />
          <VolumeUp />
        </Stack>
      </ListItem>
      <ListItem sx={{ '&:hover': { backgroundColor: 'background.light' } }}>
        <Stack spacing={1} direction="row" alignItems="center" sx={{ width: '100%' }}>
          <ListItemText primary="Fullscreen" />
          <Switch checked={fullscreen} onChange={handleFullscreenChange} />
        </Stack>
      </ListItem>
      <ListItem sx={{ backgroundColor: theme.palette.secondary.main }}>
        <ListItemButton onClick={closeSettings}>
          <ListItemText sx={{ color: theme.palette.text.secondary, textAlign: 'center' }} primary="close" />
        </ListItemButton>
      </ListItem>
    </Dialog>
  );
}
