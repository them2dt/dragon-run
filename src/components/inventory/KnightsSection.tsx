import React from 'react';
import { useTheme, Grid, Card, Typography, Zoom } from '@mui/material';
import KnightItem from './KnightItem';
import availableCharacters from '../choose-character/availableCharacters';

interface KnightsSectionProps {
  active: boolean;
}

export default function KnightsSection({ active }: KnightsSectionProps) {
  const muiTheme = useTheme();
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
          mx: 'auto',
          mb: 10,
          [muiTheme.breakpoints.up('xl')]: {
            mt: 6,
            mb: 16,
            maxWidth: 1300,
            mx: 'auto'
          }
        }}
      >
        {availableCharacters.map((character) => (
          <KnightItem name={character.name} image={character.image} key={'knights' + character.name}>
            <Typography variant="h5">{character.name}</Typography>
            <Typography
              variant="h6"
              sx={{
                pb: 0.2,
                pt: 0.3,
                [muiTheme.breakpoints.up('lg')]: {
                  pb: 1,
                  pt: 2
                }
              }}
              color={muiTheme.palette.text.secondary}
            >
              Traits:
            </Typography>
            <Typography color={muiTheme.palette.text.secondary}>Head: Default</Typography>
            <Typography color={muiTheme.palette.text.secondary}>Arms: Default</Typography>
            <Typography color={muiTheme.palette.text.secondary}>Torso: Default</Typography>
            <Typography color={muiTheme.palette.text.secondary}>Legs: Default</Typography>
          </KnightItem>
        ))}
      </Grid>
    </Zoom>
  );
}
