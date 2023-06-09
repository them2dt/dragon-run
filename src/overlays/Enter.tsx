import React from 'react';
import eventsCenter from 'utils/eventsCenter';
import EventKeys from 'constants/EventKeys';
import AnimatedPage from 'components/animated/AnimatedPage';
import OverlayWrapper from 'components/OverlayWrapper';
import AnimatedEnterTitle from 'components/animated/AnimatedEnterText';
import { Button, Typography, useTheme } from '@mui/material';

interface EnterProps {
  userName: string;
}

export default function Enter({ userName }: EnterProps) {
  const muiTheme = useTheme();
  const handleEnterClick = () => {
    eventsCenter.emit(EventKeys.GoToHome);
  };
  return (
    <AnimatedPage>
      <OverlayWrapper className="bg-bg3 overflow-hidden">
        <div className="w-full h-full m-auto flex flex-col max-w-[1240px] text-center">
          <div className="h-auto my-auto">
            <AnimatedEnterTitle userName={userName} />
            <Button
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
            </Button>
          </div>
        </div>
      </OverlayWrapper>
    </AnimatedPage>
  );
}
