import React, { useState } from 'react';
import EventKeys from 'constants/EventKeys';
import { Paper, Stack, Typography, useTheme, Box } from '@mui/material';
import FullscreenDialog from 'components/FullscreenDialog';
import { SquareButton } from 'components/styled/SquareButton';
import loadCharacter from 'utils/loadCharacter';
import ChooseCharacterCard from './ChooseCharacterCard';
import availableCharacters from '../fake-data/availableCharacters';

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
    <FullscreenDialog dialogOpen={chooseCharacterOpen} closeDialog={closeChooseCharacter}>
      <Typography
        align="center"
        sx={{
          px: 5,
          py: 1.5,
          [muiTheme.breakpoints.up('md')]: {
            py: 3
          }
        }}
        variant="h4"
        color={muiTheme.palette.text.secondary}
      >
        Select character
      </Typography>
      <Paper
        component={Stack}
        sx={{
          background: muiTheme.palette.background.default,
          overflowY: 'scroll',
          height: '100%',
          overflowX: 'hidden'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}
        >
          <Stack direction={'column'} spacing={2} sx={{ px: 3, pb: 3, pt: 1, justifyContent: 'center', my: 'auto' }}>
            <ChooseCharacterCard
              name={availableCharacters[characterIndex].name}
              image={availableCharacters[characterIndex].image}
              next={handleNextCharacterClick}
              previous={handlePreviousCharacterClick}
            />
            <SquareButton
              sx={{
                paddingY: 1.4,
                paddingX: 4,
                [muiTheme.breakpoints.up('lg')]: {
                  paddingY: 2
                },
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
