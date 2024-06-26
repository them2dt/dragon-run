import React, { useMemo, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  Typography
} from "@mui/material";
import { useFirestore } from "@context/useFirestore";
import type LeaderboardItem from "@firestore/LeaderboardItem";
import { getLeaderboardDataFromLeaderboard } from "utils/leaderboard";
import LeaderboardRow from "./LeaderboardRow";
import MenuSlideTransition from "../MenuSlideTransition";

interface LeaderboardMenuProps {
  leaderboardOpen: boolean;
  closeLeaderboard: () => void;
}

export default function LeaderboardMenu({ leaderboardOpen, closeLeaderboard }: LeaderboardMenuProps) {
  const muiTheme = useTheme();
  const { firestoreData } = useFirestore();
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[] | []>([]);

  useMemo(() => {
    if (firestoreData?.leaderboard != null) {
      const leaderboardData = getLeaderboardDataFromLeaderboard(firestoreData?.leaderboard);
      if (leaderboardData != null) {
        setLeaderboard(leaderboardData.leaderboardItems);
      } else {
        console.log("Error getting leaderboard data");
      }
    }
  }, [firestoreData?.leaderboard]);

  return (
    <Dialog
      open={leaderboardOpen}
      onClose={closeLeaderboard}
      TransitionComponent={MenuSlideTransition}
      sx={{ width: "100%" }}
      PaperProps={{
        style: { borderRadius: 0 }
      }}
    >
      <DialogTitle align="center" color={muiTheme.palette.text.secondary}>
        Leaderboard
      </DialogTitle>
      <TableContainer
        sx={{
          minWidth: 200,
          [muiTheme.breakpoints.up("sm")]: {
            minWidth: 300
          },
          [muiTheme.breakpoints.up("md")]: {
            minWidth: 400
          },
          [muiTheme.breakpoints.up("lg")]: {
            maxHeight: 430,
            minWidth: 500
          }
        }}
      >
        <Table aria-label="leaderboard" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{
                  color: muiTheme.palette.text.secondary,
                  [muiTheme.breakpoints.down("sm")]: {
                    padding: 1,
                    paddingLeft: 2
                  }
                }}
              >
                <Typography variant="subtitle1">Rank</Typography>
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: muiTheme.palette.text.secondary,
                  [muiTheme.breakpoints.down("sm")]: {
                    padding: 1
                  }
                }}
              >
                <Typography variant="subtitle1">Player</Typography>
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: muiTheme.palette.text.secondary,
                  [muiTheme.breakpoints.down("sm")]: {
                    padding: 1,
                    paddingRight: 2
                  }
                }}
              >
                <Typography variant="subtitle1">Score</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ overflow: "scroll" }}>
            {leaderboard.map((row) => (
              <LeaderboardRow key={row.name} rank={row.rank} name={row.name} score={row.score} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ListItem sx={{ backgroundColor: muiTheme.palette.secondary.main }}>
        <ListItemButton onClick={closeLeaderboard}>
          <ListItemText sx={{ color: muiTheme.palette.text.secondary, textAlign: "center" }}>
            <Typography variant="body1">Close</Typography>
          </ListItemText>
        </ListItemButton>
      </ListItem>
    </Dialog>
  );
}
