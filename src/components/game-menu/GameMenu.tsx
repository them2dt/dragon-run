import React, { useState } from "react";
import eventsCenter from "utils/eventsCenter";
import EventKeys from "constants/EventKeys";
import Dialog from "@mui/material/Dialog";
import {
  DialogTitle,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  useTheme,
  ClickAwayListener,
  Tooltip
} from "@mui/material";
import { discord, twitter } from "@consts/data/Links";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import MenuSlideTransition from "../MenuSlideTransition";

interface GameMenuProps {
  menuOpen: boolean;
  closeMenu: () => void;
  openLeaderboard: () => void;
  openSettings: () => void;
  openInventory: () => void;
  openShop: () => void;
}

export default function GameMenu({
  menuOpen,
  closeMenu,
  openLeaderboard,
  openSettings,
  openInventory,
  openShop
}: GameMenuProps) {
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
    <Dialog open={menuOpen} onClose={closeMenu} TransitionComponent={MenuSlideTransition} sx={{ width: "100%" }}>
      <Paper
        sx={{
          minWidth: 200,
          [muiTheme.breakpoints.up("sm")]: {
            minWidth: 300
          },
          [muiTheme.breakpoints.up("md")]: {
            minWidth: 400
          },
          [muiTheme.breakpoints.up("lg")]: {
            minWidth: 500
          }
        }}
      >
        <DialogTitle align="center" color={muiTheme.palette.text.secondary}>
          Menu
        </DialogTitle>
        <ListItem sx={{ "&:hover": { backgroundColor: "background.light" } }}>
          <ListItemButton onClick={openLeaderboard}>
            <ListItemText sx={{ textAlign: "center" }} primary="Leaderboard" />
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ "&:hover": { backgroundColor: "background.light" } }}>
          <ListItemButton onClick={openShop}>
            <ListItemText sx={{ textAlign: "center" }} primary="Shop" />
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ "&:hover": { backgroundColor: "background.light" } }}>
          <ListItemButton onClick={openInventory}>
            <ListItemText sx={{ textAlign: "center" }} primary="Inventory" />
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ "&:hover": { backgroundColor: "background.light" } }}>
          <ListItemButton onClick={openSettings}>
            <ListItemText sx={{ textAlign: "center" }} primary="Settings" />
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ "&:hover": { backgroundColor: "background.light" } }}>
          <ListItemButton onClick={() => eventsCenter.emit(EventKeys.GoToHome)}>
            <ListItemText sx={{ textAlign: "center" }} primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <Stack direction="row" spacing={2} justifyContent="center" width={"100%"}>
            <IconButton
              onClick={() => window.open(discord, "_blank")}
              size="large"
              sx={{ "&:hover": { backgroundColor: muiTheme.palette.background.light } }}
            >
              <FaDiscord color="#5460E6" />
            </IconButton>
            <ClickAwayListener onClickAway={handleTwitterCopyReset}>
              <div>
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
                    size="large"
                    sx={{ "&:hover": { backgroundColor: muiTheme.palette.background.light } }}
                  >
                    <FaTwitter color="#1C98E5" />
                  </IconButton>
                </Tooltip>
              </div>
            </ClickAwayListener>
          </Stack>
        </ListItem>
        <ListItem sx={{ backgroundColor: muiTheme.palette.secondary.main }}>
          <ListItemButton onClick={closeMenu}>
            <ListItemText sx={{ color: muiTheme.palette.text.secondary, textAlign: "center" }} primary="Resume" />
          </ListItemButton>
        </ListItem>
      </Paper>
    </Dialog>
  );
}
