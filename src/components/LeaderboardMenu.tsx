import React, { useEffect } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Dialog,
  DialogTitle,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
} from '@mui/material';
import { useFirestore } from '@context/useFirestore';
import LeaderboardItem from '@firestore/LeaderboardItem';
import { getLeaderboardDataFromLeaderboard } from 'utils/leaderboard';

interface LeaderboardMenuProps {
  leaderboardOpen: boolean;
  closeLeaderboard: () => void;
}

export default function LeaderboardMenu({ leaderboardOpen, closeLeaderboard }: LeaderboardMenuProps) {
  const theme = useTheme();
  const { firestoreData, firestoreFunctions } = useFirestore();
  const [leaderboard, setLeaderboard] = React.useState<LeaderboardItem[] | []>([]);

  useEffect(() => {
    if (leaderboard == null) {
      firestoreFunctions.getLeaderboard();
    }
    console.log('Leaderboard:' + leaderboard);
    console.log('Firestore Leaderboard: ' + firestoreData?.leaderboard);
    const newLeaderboard = firestoreData?.leaderboard;
    if (newLeaderboard) {
      console.log('Getting leaderboard data...' + newLeaderboard);
      const leaderboardData = getLeaderboardDataFromLeaderboard(newLeaderboard);
      if (leaderboardData !== null) {
        setLeaderboard(leaderboardData.leaderboardItems);
      } else {
        console.log('Error getting leaderboard data');
        return;
      }
    }

    console.log('Leaderboard updated!');
    console.log(firestoreData?.leaderboard);
  }, [leaderboardOpen, firestoreData?.leaderboard]);

  return (
    <Dialog open={leaderboardOpen} onClose={closeLeaderboard} sx={{ width: '100%' }}>
      <DialogTitle align="center">Leaderboard</DialogTitle>
      <Paper sx={{ width: '100%' }}>
        <TableContainer
          sx={{
            maxHeight: '50vh',
            minWidth: '30vw',
            [theme.breakpoints.up('lg')]: {
              maxHeight: 430,
            },
          }}
        >
          <Table aria-label="leaderboard" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ color: theme.palette.text.secondary }}>
                  Rank
                </TableCell>
                <TableCell align="center" sx={{ color: theme.palette.text.secondary }}>
                  Player
                </TableCell>
                <TableCell align="center" sx={{ color: theme.palette.text.secondary }}>
                  Score
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboard.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    'td, th': { border: 0 },
                    '&:hover': {
                      backgroundColor: 'background.light',
                      cursor: 'pointer',
                    },
                  }}
                >
                  <TableCell align="center" sx={{ color: theme.palette.text.secondary }}>
                    {row.rank}
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center" sx={{ color: theme.palette.text.secondary }}>
                    {row.score}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ListItem sx={{ backgroundColor: theme.palette.secondary.main }}>
          <ListItemButton onClick={closeLeaderboard}>
            <ListItemText sx={{ color: theme.palette.text.secondary, textAlign: 'center' }} primary="Close" />
          </ListItemButton>
        </ListItem>
      </Paper>
    </Dialog>
  );
}
