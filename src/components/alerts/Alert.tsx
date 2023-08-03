import React, { useState } from "react";
import { Alert, Snackbar, ClickAwayListener, Tooltip, IconButton } from "@mui/material";
import { useAlert } from "@context/useAlert";
import { useTheme } from "@mui/material/styles";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CloseIcon from "@mui/icons-material/Close";

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
      <Alert
        variant="filled"
        onClose={handleClose}
        severity={severity}
        sx={{ width: "100%", borderRadius: 0 }}
        action={
          <>
            {copyText !== "" && (
              <ClickAwayListener onClickAway={handleTextCopyReset}>
                <div>
                  <Tooltip
                    PopperProps={{
                      disablePortal: false
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
                      size="small"
                    >
                      <ContentCopyIcon sx={{ fill: muiTheme.palette.text.secondary }} fontSize="medium" />
                    </IconButton>
                  </Tooltip>
                </div>
              </ClickAwayListener>
            )}
            <IconButton aria-label="close" sx={{ ml: 0.2 }} onClick={handleClose} size="small">
              <CloseIcon sx={{ fill: muiTheme.palette.text.secondary }} fontSize="medium" />
            </IconButton>
          </>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
