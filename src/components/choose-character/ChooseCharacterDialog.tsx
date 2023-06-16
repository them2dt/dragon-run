import React, { useState } from 'react';
import EventKeys from 'constants/EventKeys';
import { Paper, Stack, Typography, useTheme } from '@mui/material';
import FullscreenDialog from 'components/FullscreenDialog';
import { SquareButton } from 'components/styled/SquareButton';
import loadCharacter from 'utils/loadCharacter';

interface ChooseCharacterDialogProps {
  chooseCharacterOpen: boolean;
  closeChooseCharacter: () => void;
}

export default function ChooseCharacterDialog({
  chooseCharacterOpen,
  closeChooseCharacter
}: ChooseCharacterDialogProps) {
  const muiTheme = useTheme();

  const [characterLink, setCharacterLink] = useState('');

  const handleConfirm = () => {
    loadCharacter(characterLink, EventKeys.GoToGame);
    closeChooseCharacter();
  };

  return (
    <FullscreenDialog dialogOpen={chooseCharacterOpen} closeDialog={closeChooseCharacter} title="Choose Your Character">
      <Paper sx={{ background: muiTheme.palette.background.default, justifyContent: 'center' }}>
        <Stack direction={'column'} spacing={0} sx={{ py: 3, px: 7, justifyContent: 'center' }}>
          <SquareButton
            sx={{
              marginX: 'auto',
              color: muiTheme.palette.text.secondary,
              background: muiTheme.palette.secondary.main,
              '&:hover': {
                backgroundColor: muiTheme.palette.text.secondary,
                color: muiTheme.palette.secondary.main
              }
            }}
            onClick={handleConfirm}
          >
            <Typography variant="h3">Confirm</Typography>
          </SquareButton>
        </Stack>
      </Paper>
    </FullscreenDialog>
  );
}
