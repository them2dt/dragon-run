import React from 'react';
import { Typography, useTheme, Paper, Box, Skeleton, Grid } from '@mui/material';
import defaultCharacter from '@assets/default-character-still.png';

interface InventoryItemProps {
  name: string;
  image: string;
  children?: React.ReactNode;
}

export default function InventoryItem({ name, image, children }: InventoryItemProps) {
  const muiTheme = useTheme();

  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <Paper sx={{ borderRadius: '0', background: muiTheme.palette.background.light }} elevation={12}>
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
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
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
        </Grid>
        <Grid item xs={12} md={6}>
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
            {children}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
