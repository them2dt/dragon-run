import React from 'react';
import { Typography, useTheme, Grid, Box, Card } from '@mui/material';
import FullscreenDialog from 'components/FullscreenDialog';
import availableCharacters from '../choose-character/availableCharacters';
import InventoryItem from './InventoryItem';

interface InventoryDialogProps {
  inventoryOpen: boolean;
  closeInventory: () => void;
}

export default function InventoryDialog({ inventoryOpen, closeInventory }: InventoryDialogProps) {
  const muiTheme = useTheme();

  return (
    <FullscreenDialog dialogOpen={inventoryOpen} closeDialog={closeInventory}>
      <Typography align="center" sx={{ px: 5, my: 3 }} variant="h3" color={muiTheme.palette.text.secondary}>
        Inventory
      </Typography>
      <Box
        sx={{
          overflowY: 'scroll',
          my: 'auto'
        }}
      >
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
            <Grid
              item
              xs={10}
              sm={5}
              md={5}
              key={character.name}
              sx={{
                m: 2,
                width: 'fit-content'
              }}
            >
              <InventoryItem name={character.name} image={character.image}>
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
              </InventoryItem>
            </Grid>
          ))}
        </Grid>
      </Box>
    </FullscreenDialog>
  );
}
