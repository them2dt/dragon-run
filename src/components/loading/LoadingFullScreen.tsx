import React from "react";
import { useTheme, Box, Zoom, Paper, Stack } from "@mui/material";
import LoadingDetails from "./LoadingDetails";

interface LoadingFullScreenProps {
  active: boolean;
  setActive?: React.Dispatch<React.SetStateAction<boolean>>;
  progress?: number;
  success?: boolean;
  error?: boolean;
  description?: string;
}

export default function LoadingFullScreen({
  active,
  setActive,
  progress,
  success,
  error,
  description
}: LoadingFullScreenProps) {
  const muiTheme = useTheme();
  return (
    <Zoom in={active} style={{ transitionDelay: active ? "0ms" : "0ms" }} unmountOnExit>
      <Paper
        component={Stack}
        elevation={0}
        sx={{
          background: muiTheme.palette.background.default,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 1000
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
          }}
        >
          <LoadingDetails
            setActive={setActive}
            progress={progress}
            success={success}
            error={error}
            description={description}
          />
        </Box>
      </Paper>
    </Zoom>
  );
}
