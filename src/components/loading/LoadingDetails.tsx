import React, { useEffect } from "react";
import { Box, LinearProgress, Typography, useTheme } from "@mui/material";
import LoadingSpinner from "./LoadingSpinner";

interface LoadingDetailsProps {
  setActive?: React.Dispatch<React.SetStateAction<boolean>>;
  progress?: number;
  success?: boolean;
  error?: boolean;
  description?: string;
}

export default function LoadingDetails({ setActive, progress, success, error, description }: LoadingDetailsProps) {
  const muiTheme = useTheme();

  const handleSuccess = () => {
    if (setActive) {
      setTimeout(() => {
        setActive(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (success) {
      handleSuccess();
    }
  }, [success]);

  return (
    <>
      <LoadingSpinner success={success} error={error} />
      <Box sx={{ mt: 2, px: 1, maxWidth: "80%", [muiTheme.breakpoints.up("md")]: { maxWidth: "40%" } }}>
        <Typography variant={"h6"}>{description}</Typography>
      </Box>
      <Box sx={{ mt: 2, width: "60%", [muiTheme.breakpoints.up("md")]: { width: "40%" } }}>
        {progress && <LinearProgress color={"inherit"} variant={"determinate"} value={progress} />}
      </Box>
    </>
  );
}
