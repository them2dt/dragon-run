import React, { useEffect, useState } from 'react';
import EventKeys from 'constants/EventKeys';
import AnimatedPage from 'components/animated/AnimatedPage';
import OverlayWrapper from 'components/OverlayWrapper';
import AnimatedEnterTitle from 'components/animated/AnimatedEnterText';
import { Typography, useTheme } from '@mui/material';
import { SquareButton } from 'components/styled/SquareButton';
import eventsCenter from 'utils/eventsCenter';
import AlertDialog from 'components/AlertDialog';

interface EnterProps {
  userName: string;
}

export default function Enter({ userName }: EnterProps) {
  const muiTheme = useTheme();

  const [fullScreenDialogOpen, setFullScreenDialogOpen] = useState(false);

  const openFullScreenDialog = () => {
    setFullScreenDialogOpen(true);
  };

  const closeFullScreenDialog = () => {
    setFullScreenDialogOpen(false);
  };

  const handleEnterClick = () => {
    eventsCenter.emit(EventKeys.GoToHome);
  };

  const enterFullScreen = () => {
    window?.xnft?.popout({ fullscreen: true });
  };

  useEffect(() => {
    if (window?.xnft && window.innerWidth < screen.width - 30) {
      openFullScreenDialog();
    }
  }, []);

  return (
    <AnimatedPage>
      <OverlayWrapper className="bg-bg3 overflow-hidden">
        <AlertDialog
          title="Enter Fullscreen?"
          dialogOpen={fullScreenDialogOpen}
          closeDialog={closeFullScreenDialog}
          acceptFunction={enterFullScreen}
        />
        <div className="w-full h-full m-auto flex flex-col max-w-[1240px] text-center">
          <div className="h-auto my-auto">
            <AnimatedEnterTitle userName={userName} />
            <SquareButton
              variant="contained"
              size="large"
              sx={{
                backgroundColor: muiTheme.palette.secondary.main,
                '&:hover': {
                  backgroundColor: muiTheme.palette.text.secondary,
                  color: muiTheme.palette.secondary.main
                },
                width: '200px',
                height: '70px',
                [muiTheme.breakpoints.up('sm')]: { width: '300px', height: '80px' },
                [muiTheme.breakpoints.up('md')]: { width: '500px', height: '100px' }
              }}
              onClick={() => {
                handleEnterClick();
              }}
            >
              <Typography
                sx={{ fontSize: '2.2rem', [muiTheme.breakpoints.up('md')]: { fontSize: '3rem' } }}
                fontWeight={400}
                component="h3"
              >
                Enter
              </Typography>
            </SquareButton>
          </div>
        </div>
      </OverlayWrapper>
    </AnimatedPage>
  );
}
