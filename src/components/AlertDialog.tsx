import React from 'react';
import Dialog from '@mui/material/Dialog';
import { IconButton, Paper, Stack, Typography, useTheme } from '@mui/material';
import MenuSlideTransition from './MenuSlideTransition';
import CloseIcon from '@mui/icons-material/Close';
import { SquareButton } from './styled/SquareButton';

interface AlertDialogProps {
  dialogOpen: boolean;
  closeDialog: () => void;
  title: string;
  acceptFunction?: () => void;
  acceptText?: string;
  denyFunction?: () => void;
  denyText?: string;
}

export default function AlertDialog({
  dialogOpen,
  closeDialog,
  title,
  acceptFunction,
  acceptText,
  denyFunction,
  denyText
}: AlertDialogProps) {
  const muiTheme = useTheme();

  return (
    <Dialog open={dialogOpen} onClose={closeDialog} TransitionComponent={MenuSlideTransition}>
      <Paper
        sx={{
          background: muiTheme.palette.background.default,
          px: 0,
          py: 3,
          [muiTheme.breakpoints.up('md')]: {
            py: 5
          }
        }}
      >
        <IconButton
          aria-label="close"
          onClick={closeDialog}
          sx={{
            position: 'absolute',
            top: 4,
            right: 4,
            [muiTheme.breakpoints.up('lg')]: {
              top: 8,
              right: 10
            }
          }}
        >
          <CloseIcon sx={{ fill: muiTheme.palette.secondary.main }} fontSize="large" />
        </IconButton>
        <Typography
          align="center"
          sx={{
            px: 2,
            [muiTheme.breakpoints.up('md')]: {
              px: 10
            }
          }}
          variant="h4"
          color={muiTheme.palette.text.secondary}
        >
          {title}
        </Typography>
        <Stack
          direction={'row'}
          spacing={3}
          sx={{
            pt: 3,
            px: 5,
            justifyContent: 'center',
            textAlign: 'center',
            minWidth: '100%',
            [muiTheme.breakpoints.up('md')]: {
              pt: 6,
              px: 10
            }
          }}
        >
          <SquareButton
            onClick={() => {
              acceptFunction?.();
              closeDialog();
            }}
            variant="contained"
            sx={{ marginY: 'auto' }}
            fullWidth
          >
            <Typography variant="h5">{acceptText ?? 'Accept'}</Typography>
          </SquareButton>
          <SquareButton
            onClick={() => {
              denyFunction?.();
              closeDialog();
            }}
            variant="contained"
            sx={{ marginY: 'auto' }}
            fullWidth
          >
            <Typography variant="h5">{denyText ?? 'Deny'}</Typography>
          </SquareButton>
        </Stack>
      </Paper>
    </Dialog>
  );
}
