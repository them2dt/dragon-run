import React from "react";
import { Paper, Stack, useTheme, Box, Zoom } from "@mui/material";
import LoadingSpinner from "components/loading/LoadingSpinner";

interface LoadingScreenProps {
  active: boolean;
}

export default function LoadingScreen({ active }: LoadingScreenProps) {
  const muiTheme = useTheme();

  return (
    <Zoom in={active} style={{ transitionDelay: active ? "200ms" : "0ms" }} unmountOnExit>
      <Paper
        component={Stack}
        sx={{
          background: muiTheme.palette.background.default,
          overflowY: "hidden",
          height: "80vh",
          overflowX: "hidden"
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh"
          }}
        >
          <LoadingSpinner className="m-auto" />
        </Box>
      </Paper>
    </Zoom>
  );
}
