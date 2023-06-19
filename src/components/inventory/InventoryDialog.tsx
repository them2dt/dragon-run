import React, { useEffect, useState, useRef } from 'react';
import { Typography, useTheme, Box, Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import InventoryIcon from '@mui/icons-material/Inventory';
import StoreIcon from '@mui/icons-material/Store';
import FullscreenDialog from 'components/FullscreenDialog';
import KnightsSection from './KnightsSection';
import ShopSection from './ShopSection';
import CratesSection from './CreatesSection';

interface InventoryDialogProps {
  inventoryOpen: boolean;
  closeInventory: () => void;
}

export default function InventoryDialog({ inventoryOpen, closeInventory }: InventoryDialogProps) {
  const muiTheme = useTheme();
  const [value, setValue] = useState(0);
  const [cratesActive, setCratesActive] = useState(false);
  const [knightsActive, setKnightsActive] = useState(false);
  const [shopActive, setShopActive] = useState(false);

  const scrollBoxRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    scrollBoxRef.current?.scrollTo({
      top: 0
    });
  };

  const handleValueChange = (newValue: number) => {
    setValue(newValue);
    newValue === 0 ? setKnightsActive(true) : setKnightsActive(false);
    newValue === 1 ? setCratesActive(true) : setCratesActive(false);
    newValue === 2 ? setShopActive(true) : setShopActive(false);
    scrollToTop();
  };

  useEffect(() => {
    handleValueChange(value);
  }, []);

  return (
    <FullscreenDialog dialogOpen={inventoryOpen} closeDialog={closeInventory}>
      <Typography align="center" sx={{ px: 5, my: 3 }} variant="h3" color={muiTheme.palette.text.secondary}>
        Inventory
      </Typography>
      <Box
        ref={scrollBoxRef}
        sx={{
          overflowY: 'scroll',
          overflowX: 'hidden',
          my: 'auto'
        }}
      >
        <Box sx={{ minHeight: '100vh' }}>
          <KnightsSection active={knightsActive} />
          <CratesSection active={cratesActive} />
          <ShopSection active={shopActive} />
        </Box>
      </Box>
      <Paper sx={{}} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          sx={{
            height: 70
          }}
          onChange={(event, newValue) => {
            handleValueChange(newValue);
          }}
        >
          <BottomNavigationAction label="Knights" icon={<DirectionsRunIcon />} />
          <BottomNavigationAction label="Crates" icon={<InventoryIcon />} />
          <BottomNavigationAction label="Store" icon={<StoreIcon />} />
        </BottomNavigation>
      </Paper>
    </FullscreenDialog>
  );
}
