import React from 'react';
import { Grid, Card, Typography, Zoom } from '@mui/material';

interface ComingSoonCratesSectionProps {
  active: boolean;
  goToShop: () => void;
}

export default function ComingSoonCratesSection({ active, goToShop }: ComingSoonCratesSectionProps) {
  return (
    <Zoom in={active} style={{ transitionDelay: active ? '200ms' : '0ms' }} unmountOnExit>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        component={Card}
        elevation={0}
        sx={{
          height: '65vh'
        }}
      >
        <Grid item xs={12}>
          <Typography align="center" sx={{ px: 5, my: 'auto' }} variant="h1">
            Coming Soon!
          </Typography>
        </Grid>
      </Grid>
    </Zoom>
  );
}
