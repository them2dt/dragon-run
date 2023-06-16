import React from 'react';
import eventsCenter from 'utils/eventsCenter';
import EventKeys from 'constants/EventKeys';
import Dialog from '@mui/material/Dialog';
import { Paper, Typography, useTheme } from '@mui/material';
import MenuSlideTransition from '../MenuSlideTransition';
import FullscreenDialog from 'components/FullscreenDialog';

interface ChooseCharacterDialogProps {
  chooseCharacterOpen: boolean;
  closeChooseCharacter: () => void;
}

export default function ChooseCharacterDialog({
  chooseCharacterOpen,
  closeChooseCharacter
}: ChooseCharacterDialogProps) {
  const muiTheme = useTheme();

  return (
    <FullscreenDialog dialogOpen={chooseCharacterOpen} closeDialog={closeChooseCharacter} title="Choose Your Character">
      <Typography align="center" my={2} variant="h2">
        Choose Your Character
      </Typography>
    </FullscreenDialog>
  );
}
