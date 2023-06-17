import React from 'react';
import Dialog from '@mui/material/Dialog';
import { IconButton, Paper, useTheme } from '@mui/material';
import MenuSlideTransition from './MenuSlideTransition';
import CloseIcon from '@mui/icons-material/Close';

interface FullscreenDialogProps {
  dialogOpen: boolean;
  closeDialog: () => void;
  children: React.ReactNode;
}

export default function FullscreenDialog({ dialogOpen, closeDialog, children }: FullscreenDialogProps) {
  const muiTheme = useTheme();

  return (
    <Dialog
      open={dialogOpen}
      onClose={closeDialog}
      TransitionComponent={MenuSlideTransition}
      fullScreen
      sx={{
        margin: 2,
        [muiTheme.breakpoints.up('sm')]: {
          margin: 3
        },
        [muiTheme.breakpoints.up('md')]: {
          margin: 5
        },
        [muiTheme.breakpoints.up('xl')]: {
          margin: 7
        }
      }}
    >
      <Paper sx={{ background: muiTheme.palette.background.default }}>
        <IconButton
          aria-label="close"
          onClick={closeDialog}
          sx={{
            position: 'absolute',
            top: 10,
            right: 4,
            [muiTheme.breakpoints.up('lg')]: {
              top: 14,
              right: 20
            }
          }}
        >
          <CloseIcon sx={{ fill: muiTheme.palette.secondary.main }} fontSize="large" />
        </IconButton>
      </Paper>
      {children}
    </Dialog>
  );
}
