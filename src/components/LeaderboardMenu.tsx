import React, { useMemo } from 'react';
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
import LeaderboardRow from './LeaderboardRow';

interface LeaderboardMenuProps {
  leaderboardOpen: boolean;
  closeLeaderboard: () => void;
}

export default function LeaderboardMenu({ leaderboardOpen, closeLeaderboard }: LeaderboardMenuProps) {
  const theme = useTheme();
  const { firestoreData, firestoreFunctions } = useFirestore();
  const [leaderboard, setLeaderboard] = React.useState<LeaderboardItem[] | []>([]);

  useMemo(() => {
    if (firestoreData?.firestore == null) {
      firestoreFunctions.initializeFirestore();
    }
    if (firestoreData?.leaderboard == null) {
      firestoreFunctions.getLeaderboard();
    }
  }, [firestoreData?.firestore]);

  useMemo(() => {
    if (firestoreData?.leaderboard) {
      const leaderboardData = getLeaderboardDataFromLeaderboard(firestoreData?.leaderboard);
      if (leaderboardData != null) {
        setLeaderboard(leaderboardData.leaderboardItems);
      } else {
        console.log('Error getting leaderboard data');
        return;
      }
    }
  }, [firestoreData?.leaderboard]);

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
                <LeaderboardRow key={row.name} rank={row.rank} name={row.name} score={row.score} />
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
