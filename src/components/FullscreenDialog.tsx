import React from 'react';
import Dialog from '@mui/material/Dialog';
import { IconButton, Paper, Stack, Typography, useTheme } from '@mui/material';
import MenuSlideTransition from './MenuSlideTransition';
import CloseIcon from '@mui/icons-material/Close';

interface FullscreenDialogProps {
  dialogOpen: boolean;
  closeDialog: () => void;
  title: string;
  children: React.ReactNode;
}

export default function FullscreenDialog({ dialogOpen, closeDialog, title, children }: FullscreenDialogProps) {
  const muiTheme = useTheme();

  return (
    <Dialog
      open={dialogOpen}
      onClose={closeDialog}
      TransitionComponent={MenuSlideTransition}
      fullScreen
      sx={{
        margin: 3,
        [muiTheme.breakpoints.up('sm')]: {
          margin: 5
        },
        [muiTheme.breakpoints.up('md')]: {
          margin: 7
        },
        [muiTheme.breakpoints.up('lg')]: {
          margin: 10
        }
      }}
    >
      <Paper elevation={6} sx={{ background: muiTheme.palette.background.default }}>
        <Stack direction="row" spacing={0} sx={{ py: 3, px: 7, justifyContent: 'center' }}>
          <Typography align="center" variant="h3" my={'auto'} color={muiTheme.palette.text.secondary}>
            {title}
          </Typography>
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
        </Stack>
      </Paper>
      {children}
    </Dialog>
  );
}
