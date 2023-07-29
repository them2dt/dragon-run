import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { useAlert } from "@context/useAlert";

export default function BottomAlert() {
  const { alert, setAlert } = useAlert();

  const { open, message, severity, hideDuration } = alert;

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({
      ...alert,
      open: false
    });
  };

  return (
    <Snackbar open={open} autoHideDuration={hideDuration ?? 3000} onClose={handleClose}>
      <Alert variant="filled" onClose={handleClose} severity={severity} sx={{ width: "100%", borderRadius: 0 }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
