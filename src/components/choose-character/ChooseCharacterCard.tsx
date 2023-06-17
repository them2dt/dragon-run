import React from 'react';
import { Stack, Typography, useTheme } from '@mui/material';
import { ChooseCharacterPaper } from 'components/styled/ChooseCharacterPaper';

interface ChooseCharacterCardProps {
  characterName: string;
}

export default function ChooseCharacterCard({ characterName }: ChooseCharacterCardProps) {
  const muiTheme = useTheme();

  return (
    <ChooseCharacterPaper>
      <Stack direction={'column'} spacing={0} sx={{ py: 3, px: 7, justifyContent: 'center' }}>
        <Typography variant="h3">{characterName}</Typography>
      </Stack>
    </ChooseCharacterPaper>
  );
}
