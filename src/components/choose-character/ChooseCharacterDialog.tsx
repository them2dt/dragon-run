import React, { useState } from 'react';
import EventKeys from 'constants/EventKeys';
import { Paper, Stack, Typography, useTheme, Box } from '@mui/material';
import { ChevronRight, ChevronLeft } from '@mui/icons-material';
import FullscreenDialog from 'components/FullscreenDialog';
import { SquareButton } from 'components/styled/SquareButton';
import loadCharacter from 'utils/loadCharacter';
import ChooseCharacterCard from './ChooseCharacterCard';

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
      <Paper sx={{ background: muiTheme.palette.background.default, justifyContent: 'center', minHeight: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Stack direction={'column'} spacing={3} sx={{ py: 5, px: 7, justifyContent: 'center', minHeight: '100%' }}>
            <ChooseCharacterCard characterName="Knight #1" />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <SquareButton variant="contained" sx={{ marginY: 'auto', marginX: 7 }}>
                <ChevronLeft fontSize="large" />
              </SquareButton>
              <SquareButton variant="contained" sx={{ marginY: 'auto', marginX: 7 }}>
                <ChevronRight fontSize="large" />
              </SquareButton>
            </Box>
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
              <Typography variant="h3">Confirm</Typography>
            </SquareButton>
          </Stack>
        </Box>
      </Paper>
    </FullscreenDialog>
  );
}
