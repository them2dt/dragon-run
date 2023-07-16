import React, { useState } from "react";
import { Box, IconButton, Stack, useTheme, ClickAwayListener, Tooltip } from "@mui/material";
import { Settings } from "@mui/icons-material";
import { discord, twitter } from "@consts/data/Links";
import { FaDiscord, FaTwitter } from "react-icons/fa";

interface HomeNavBarProps {
  openSettings: () => void;
}

export default function HomeNavBar({ openSettings }: HomeNavBarProps) {
  const muiTheme = useTheme();

  const [twitterCopied, setTwitterCopied] = useState(false);

  const handleTwitterCopy = () => {
    navigator.clipboard.writeText(twitter).catch((err) => {
      console.error("Failed to copy to clipboard: ", err);
    });
    setTwitterCopied(true);
    setTimeout(() => {
      setTwitterCopied(false);
    }, 1000);
  };

  const handleTwitterCopyReset = () => {
    setTwitterCopied(false);
  };

  return (
    <Box className="fixed left-[5px] top-[2px]">
      <Stack direction="row" spacing={0} justifyContent="center" width={"100%"} height={"100%"}>
        <IconButton
          aria-label="settings"
          onClick={openSettings}
          sx={{ "&:hover": { backgroundColor: muiTheme.palette.background.light } }}
        >
          <Settings sx={{ fill: muiTheme.palette.text.secondary }} fontSize="large" />
        </IconButton>
        <ClickAwayListener onClickAway={handleTwitterCopyReset}>
          <Tooltip
            PopperProps={{
              disablePortal: true
            }}
            onClose={handleTwitterCopyReset}
            open={twitterCopied}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title="Copied!"
          >
            <IconButton
              onClick={() => {
                handleTwitterCopy();
              }}
              size="small"
              sx={{ my: "auto", "&:hover": { backgroundColor: muiTheme.palette.background.light } }}
            >
              <FaTwitter fontSize={"1.6rem"} color="#1C98E5" />
            </IconButton>
          </Tooltip>
        </ClickAwayListener>
        <IconButton
          onClick={() => window.open(discord, "_blank")}
          size="small"
          sx={{ my: "auto", "&:hover": { backgroundColor: muiTheme.palette.background.light } }}
        >
          <FaDiscord fontSize={"1.9rem"} color="#5460E6" />
        </IconButton>
      </Stack>
    </Box>
  );
}
