import React from 'react';
import { Paper, Stack, Typography, useTheme, Box } from '@mui/material';
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
      <Typography align="center" sx={{ px: 5, py: 3 }} variant="h3" color={muiTheme.palette.text.secondary}>
        Inventory
      </Typography>
      <Paper
        component={Stack}
        sx={{
          background: muiTheme.palette.background.default,
          justifyContent: 'center',
          height: '100%',
          maxHeight: '100%'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', height: 'auto' }}>
          <Stack direction={'column'} spacing={2} sx={{ px: 3, pb: 3, justifyContent: 'center', height: '100%' }}>
            {availableCharacters.map((character) => (
              <InventoryItem name={character.name} image={character.image} key={character.name}>
                <Typography variant="h4" sx={{ pb: 2 }}>
                  This is a character
                </Typography>
              </InventoryItem>
            ))}
          </Stack>
        </Box>
      </Paper>
    </FullscreenDialog>
  );
}
