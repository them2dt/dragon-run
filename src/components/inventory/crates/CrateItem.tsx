import React, { useState } from 'react';
import { useTheme, Paper, Skeleton, Grid, Typography, Box, Card } from '@mui/material';
import defaultCharacter from '@assets/default-character-still.png';

interface CrateItemProps {
  name: string;
  image: string;
  children?: React.ReactNode;
}

export default function CrateItem({ name, image, children }: CrateItemProps) {
  const muiTheme = useTheme();

  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Grid item xs={10} sm={5} md={10} lg={5} m={2}>
      <Grid
        spacing={0}
        component={Card}
        container
        direction="row"
        sx={{
          borderRadius: '0',
          background: muiTheme.palette.background.light
        }}
        elevation={12}
      >
        <Grid item xs={12} sx={{ textAlign: 'center', pt: 1 }}>
          <Typography variant="h5">{name}</Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            p: 2,
            pt: 1
          }}
        >
          <Paper
            sx={{
              borderRadius: '0'
            }}
            elevation={16}
          >
            <img
              src={image === '' ? defaultCharacter : image}
              alt={name}
              className="w-full rendering-pixelated"
              style={{ display: imageLoaded ? 'block' : 'none' }}
              onLoad={() => {
                setImageLoaded(true);
              }}
            />
            {!imageLoaded && (
              <Skeleton
                variant="rectangular"
                sx={{
                  backgroundColor: muiTheme.palette.background.light,
                  width: 1,
                  pt: '100%',
                  borderRadius: 0
                }}
              />
            )}
          </Paper>
        </Grid>
        <Grid item component={Box} xs={12} md={6}>
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
}
