import React from 'react';
import { TableRow, TableCell, useTheme } from '@mui/material';
import { useFirestore } from '@context/useFirestore';

interface LeaderboardRowProps {
  rank: number;
  name: string;
  score: number;
}

export default function LeaderboardRow({ rank, name, score }: LeaderboardRowProps) {
  const theme = useTheme();
  const { firestoreData } = useFirestore();
  const currentUserName = firestoreData?.userData?.userName;
  return (
    <TableRow
      key={name}
      sx={{
        backgroundColor: name === currentUserName ? 'background.light' : 'background.default',
        'td, th': { border: 0 },
        '&:hover': {
          cursor: 'pointer',
        },
      }}
    >
      <TableCell align="center" sx={{ color: name === currentUserName ? '#a3e635' : theme.palette.text.secondary }}>
        {rank}
      </TableCell>
      <TableCell align="center" sx={{ color: name === currentUserName ? '#a3e635' : theme.palette.text.primary }}>
        {name}
      </TableCell>
      <TableCell align="center" sx={{ color: name === currentUserName ? '#a3e635' : theme.palette.text.secondary }}>
        {score}
      </TableCell>
    </TableRow>
  );
}
