import React from 'react';
import { Stack, Typography, useTheme, Paper, Box, Skeleton } from '@mui/material';
import { ChevronRight, ChevronLeft } from '@mui/icons-material';
import { SquareButton } from 'components/styled/SquareButton';
import defaultCharacter from '@assets/default-character-still.png';

interface ChooseCharacterCardProps {
  name: string;
  image: string;
  next: () => void;
  previous: () => void;
}

export default function ChooseCharacterCard({ name, image, next, previous }: ChooseCharacterCardProps) {
  const muiTheme = useTheme();

  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <Paper sx={{ borderRadius: '0', background: muiTheme.palette.background.light }} elevation={12}>
      <Stack
        direction={'column'}
        spacing={0}
        sx={{
          pt: 1,
          pb: 2,
          px: 3,
          justifyContent: 'center',
          textAlign: 'center',
          [muiTheme.breakpoints.up('md')]: {
            pt: 3,
            pb: 3,
            px: 6
          }
        }}
      >
        <Typography
          variant="h4"
          sx={{
            pb: 1,
            [muiTheme.breakpoints.up('md')]: {
              pb: 3
            }
          }}
        >
          {name}
        </Typography>
        <Paper elevation={12} sx={{ width: '100%', height: '100%' }}>
          <img
            src={image === '' ? defaultCharacter : image}
            alt={name}
            className="w-[240px] max-w-full rendering-pixelated"
            style={{ display: imageLoaded ? 'block' : 'none' }}
            onLoad={() => {
              setImageLoaded(true);
            }}
          />
          {!imageLoaded && (
            <Skeleton
              variant="rectangular"
              sx={{ backgroundColor: muiTheme.palette.background.light, borderRadius: 0 }}
              width={240}
              height={240}
            />
          )}
        </Paper>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            minWidth: '100%',
            pt: 2,
            [muiTheme.breakpoints.up('md')]: {
              pt: 3
            }
          }}
        >
          <SquareButton
            onClick={() => {
              setImageLoaded(false);
              previous();
            }}
            variant="contained"
            sx={{ marginY: 'auto', marginX: 'auto' }}
          >
            <ChevronLeft fontSize="large" />
          </SquareButton>
          <SquareButton
            onClick={() => {
              setImageLoaded(false);
              next();
            }}
            variant="contained"
            sx={{ marginY: 'auto', marginX: 'auto' }}
          >
            <ChevronRight fontSize="large" />
          </SquareButton>
        </Box>
      </Stack>
    </Paper>
  );
}
