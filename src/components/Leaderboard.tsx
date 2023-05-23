import React from 'react';
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

function createData(rank: number, name: string, score: number) {
  return { rank, name, score };
}

const rows = [
  createData(1, 'zombi', 1480),
  createData(2, 'm2d2', 1360),
  createData(3, '3', 1200),
  createData(4, '4', 1000),
  createData(5, '5', 800),
  createData(6, '6', 700),
  createData(7, '7', 600),
  createData(8, '8', 500),
  createData(9, '9', 400),
  createData(10, '10', 300),
];

interface LeaderboardProps {
  leaderboardOpen: boolean;
  closeLeaderboard: () => void;
}

export default function Leaderboard({ leaderboardOpen, closeLeaderboard }: LeaderboardProps) {
  const theme = useTheme();

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
              {rows.map((row) => (
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
