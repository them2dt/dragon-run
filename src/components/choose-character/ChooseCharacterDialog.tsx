import React from 'react';
import eventsCenter from 'utils/eventsCenter';
import EventKeys from 'constants/EventKeys';
import Dialog from '@mui/material/Dialog';
import { DialogTitle, Paper, Typography, useTheme } from '@mui/material';
import { discord, twitter } from '@consts/Socials';
import { FaDiscord, FaTwitter } from 'react-icons/fa';
import MenuSlideTransition from '../MenuSlideTransition';

interface ChooseCharacterDialogProps {
  chooseCharacterOpen: boolean;
  closeChooseCharacter: () => void;
  openSettings: () => void;
}

export default function ChooseCharacterDialog({
  chooseCharacterOpen,
  closeChooseCharacter,
  openSettings
}: ChooseCharacterDialogProps) {
  const muiTheme = useTheme();

  return (
    <Dialog
      open={chooseCharacterOpen}
      onClose={closeChooseCharacter}
      TransitionComponent={MenuSlideTransition}
      fullScreen
      sx={{ margin: 10 }}
    >
      <Paper sx={{ background: muiTheme.palette.background.default }}>
        <Typography align="center" my={2} variant="h2">
          Choose Your Character
        </Typography>
      </Paper>
    </Dialog>
  );
}
