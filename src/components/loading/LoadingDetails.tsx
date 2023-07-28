import React, { useEffect } from "react";
import { Box, LinearProgress, Typography, useTheme } from "@mui/material";
import LoadingSpinner from "./LoadingSpinner";
import { green } from "@mui/material/colors";

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

  const handleError = () => {
    if (setActive) {
      setTimeout(() => {
        setActive(false);
      }, 2000);
    }
  };

  useEffect(() => {
    if (success === true) {
      handleSuccess();
    }
  }, [success]);

  useEffect(() => {
    if (error === true) {
      handleError();
    }
  }, [error]);

  return (
    <>
      <LoadingSpinner success={success} error={error} />
      <Box sx={{ mt: 2, px: 1, maxWidth: "80%", [muiTheme.breakpoints.up("md")]: { maxWidth: "40%" } }}>
        <Typography
          align={"center"}
          variant={"h6"}
          sx={{ color: success ? green[500] : muiTheme.palette.secondary.main }}
        >
          {description}
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 2,
          width: "60%",
          alignItems: "center",
          textAlign: "center",
          [muiTheme.breakpoints.up("md")]: { width: "40%" }
        }}
      >
        {progress && <LinearProgress color={"inherit"} variant={"determinate"} value={progress} />}
      </Box>
    </>
  );
}
