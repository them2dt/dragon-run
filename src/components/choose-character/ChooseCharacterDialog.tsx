import React, { useState } from 'react';
import EventKeys from 'constants/EventKeys';
import { Paper, Stack, Typography, useTheme, Box } from '@mui/material';
import FullscreenDialog from 'components/FullscreenDialog';
import { SquareButton } from 'components/styled/SquareButton';
import loadCharacter from 'utils/loadCharacter';
import ChooseCharacterCard from './ChooseCharacterCard';
import availableCharacters from './availableCharacters';

interface ChooseCharacterDialogProps {
  chooseCharacterOpen: boolean;
  closeChooseCharacter: () => void;
}

export default function ChooseCharacterDialog({
  chooseCharacterOpen,
  closeChooseCharacter
}: ChooseCharacterDialogProps) {
  const muiTheme = useTheme();

  const [characterIndex, setCharacterIndex] = useState(0);

  const handleNextCharacterClick = () => {
    setCharacterIndex((prevIndex) => (prevIndex + 1) % availableCharacters.length);
  };

  const handlePreviousCharacterClick = () => {
    setCharacterIndex((prevIndex) => (prevIndex - 1 + availableCharacters.length) % availableCharacters.length);
  };

  const handleConfirm = () => {
    loadCharacter(availableCharacters[characterIndex].spritesheet, EventKeys.GoToGame);
    closeChooseCharacter();
  };

  return (
    <FullscreenDialog dialogOpen={chooseCharacterOpen} closeDialog={closeChooseCharacter} title="Choose Your Character">
      <Paper
        component={Stack}
        sx={{ background: muiTheme.palette.background.default, justifyContent: 'center', height: '100%' }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', height: 'auto' }}>
          <Stack direction={'column'} spacing={3} sx={{ px: 3, pb: 3, justifyContent: 'center', minHeight: '100%' }}>
            <ChooseCharacterCard
              name={availableCharacters[characterIndex].name}
              image={availableCharacters[characterIndex].image}
              next={handleNextCharacterClick}
              previous={handlePreviousCharacterClick}
            />
            <SquareButton
              sx={{
                paddingY: 2,
                paddingX: 4,
                marginY: 'auto',
                color: muiTheme.palette.text.secondary,
                background: muiTheme.palette.secondary.main,
                '&:hover': {
                  backgroundColor: muiTheme.palette.text.secondary,
                  color: muiTheme.palette.secondary.main
                }
              }}
              onClick={handleConfirm}
            >
              <Typography variant="h4">Confirm</Typography>
            </SquareButton>
          </Stack>
        </Box>
      </Paper>
    </FullscreenDialog>
  );
}
