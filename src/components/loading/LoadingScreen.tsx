import React from "react";
import { Paper, Stack, useTheme, Box, Zoom } from "@mui/material";
import LoadingDetails from "./LoadingDetails";

interface LoadingScreenProps {
  active: boolean;
  setActive?: React.Dispatch<React.SetStateAction<boolean>>;
  progress?: number;
  success?: boolean;
  error?: boolean;
  description?: string;
}

export default function LoadingScreen({
  active,
  setActive,
  progress,
  success,
  error,
  description
}: LoadingScreenProps) {
  const muiTheme = useTheme();

  return (
    <Zoom in={active} style={{ transitionDelay: active ? "0ms" : "0ms" }} unmountOnExit>
      <Paper
        component={Stack}
        elevation={0}
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
