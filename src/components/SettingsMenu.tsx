import React from 'react';
import Dialog from '@mui/material/Dialog';
import {
  DialogTitle,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Slider,
  useTheme,
  Switch,
  Paper,
} from '@mui/material';
import { VolumeDown, VolumeUp } from '@mui/icons-material';
import { useSettings } from '@context/useSettings';

interface SettingsMenuProps {
  settingsOpen: boolean;
  closeSettings: () => void;
}

export default function SettingsMenu({ settingsOpen, closeSettings }: SettingsMenuProps) {
  const muiTheme = useTheme();
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
      <DialogTitle align="center" color={muiTheme.palette.text.secondary}>Settings</DialogTitle>
      <Paper
        sx={{
          minWidth: 200,
          [muiTheme.breakpoints.up('sm')]: {
            minWidth: 200,
          },
          [muiTheme.breakpoints.up('md')]: {
            minWidth: 300,
          },
          [muiTheme.breakpoints.up('lg')]: {
            minWidth: 400,
          },
        }}
      >
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
        <ListItem sx={{ backgroundColor: muiTheme.palette.secondary.main }}>
          <ListItemButton onClick={closeSettings}>
            <ListItemText sx={{ color: muiTheme.palette.text.secondary, textAlign: 'center' }} primary="close" />
          </ListItemButton>
        </ListItem>
      </Paper>
    </Dialog>
  );
}
