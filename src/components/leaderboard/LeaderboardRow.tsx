import React from "react";
import { TableRow, TableCell, useTheme, Typography } from "@mui/material";
import { useFirestore } from "@context/useFirestore";
import { blue } from "@mui/material/colors";

interface LeaderboardRowProps {
  rank: number;
  name: string;
  score: number;
}

export default function LeaderboardRow({ rank, name, score }: LeaderboardRowProps) {
  const muiTheme = useTheme();
  const { firestoreData } = useFirestore();
  const currentUserName = firestoreData?.userData?.userName;
  return (
    <TableRow
      key={name}
      sx={{
        backgroundColor: name === currentUserName ? "background.light" : "background.default",
        "td, th": { border: 0 },
        "&:hover": {
          cursor: "pointer"
        }
      }}
    >
      <TableCell align="center" sx={{ color: name === currentUserName ? blue[500] : muiTheme.palette.text.secondary }}>
        <Typography variant="body1">{rank}</Typography>
      </TableCell>
      <TableCell
        align="center"
        sx={{
          color: name === currentUserName ? blue[500] : muiTheme.palette.text.primary,
          [muiTheme.breakpoints.down("sm")]: {
            padding: 1,
            maxWidth: 150
          }
        }}
      >
        <Typography variant="body2" noWrap>
          {name}
        </Typography>
      </TableCell>
      <TableCell align="center" sx={{ color: name === currentUserName ? blue[500] : muiTheme.palette.text.secondary }}>
        <Typography variant="body1">{score}</Typography>
      </TableCell>
    </TableRow>
  );
}
