import React, { useState } from "react";
import { Alert, Snackbar, ClickAwayListener, Tooltip, IconButton } from "@mui/material";
import { useAlert } from "@context/useAlert";
import { useTheme } from "@mui/material/styles";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function BottomAlert() {
  const { alert, setAlert } = useAlert();
  const muiTheme = useTheme();

  const { open, message, severity, hideDuration, copyText } = alert;

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({
      ...alert,
      open: false
    });
  };

  const [textCopied, setTextCopied] = useState(false);

  const handleTCopyText = () => {
    if (copyText === undefined) {
      return;
    }
    navigator.clipboard.writeText(copyText).catch((err) => {
      console.error("Failed to copy to clipboard: ", err);
    });
    setTextCopied(true);
    setTimeout(() => {
      setTextCopied(false);
    }, 1000);
  };

  const handleTextCopyReset = () => {
    setTextCopied(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={hideDuration} onClose={handleClose}>
      <Alert variant="filled" onClose={handleClose} severity={severity} sx={{ width: "100%", borderRadius: 0 }}>
        {message}
        {copyText !== "" && (
          <ClickAwayListener onClickAway={handleTextCopyReset}>
            <div>
              <Tooltip
                PopperProps={{
                  disablePortal: true
                }}
                onClose={handleTextCopyReset}
                open={textCopied}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="Copied!"
              >
                <IconButton
                  onClick={() => {
                    handleTCopyText();
                  }}
                  size="large"
                  sx={{ "&:hover": { backgroundColor: muiTheme.palette.background.light } }}
                >
                  <ContentCopyIcon sx={{ fill: muiTheme.palette.text.secondary }} fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
          </ClickAwayListener>
        )}
      </Alert>
    </Snackbar>
  );
}
