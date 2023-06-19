import React, { useEffect, useState, useRef, useMemo } from 'react';
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
  defaultTab?: number;
}

export default function InventoryDialog({ inventoryOpen, closeInventory, defaultTab }: InventoryDialogProps) {
  const muiTheme = useTheme();
  const [value, setValue] = useState(defaultTab ?? 0);
  const [cratesActive, setCratesActive] = useState(false);
  const [knightsActive, setKnightsActive] = useState(false);
  const [shopActive, setShopActive] = useState(false);
  const [title, setTitle] = useState('Inventory');

  const scrollBoxRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    scrollBoxRef.current?.scrollTo({
      top: 0
    });
  };

  const handleValueChange = (newValue: number) => {
    scrollToTop();
    setValue(newValue);
    setCratesActive(false);
    setKnightsActive(false);
    setShopActive(false);
    if (newValue === 0) {
      setTitle('Knights');
      setKnightsActive(true);
    } else if (newValue === 1) {
      setTitle('Crates');
      setCratesActive(true);
    } else if (newValue === 2) {
      setTitle('Shop');
      setShopActive(true);
    }
  };

  const goToShop = () => {
    handleValueChange(2);
  };

  useEffect(() => {
    handleValueChange(value);
  }, []);

  useMemo(() => {
    handleValueChange(defaultTab ?? 0);
  }, [defaultTab, inventoryOpen]);

  return (
    <FullscreenDialog dialogOpen={inventoryOpen} closeDialog={closeInventory}>
      <Typography align="center" sx={{ px: 5, my: 3 }} variant="h3" color={muiTheme.palette.text.secondary}>
        {title}
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
          <KnightsSection active={knightsActive} goToShop={goToShop} />
          <CratesSection active={cratesActive} goToShop={goToShop} />
          <ShopSection active={shopActive} />
        </Box>
      </Box>
      <Paper sx={{}} elevation={20}>
        <BottomNavigation
          showLabels
          value={value}
          sx={{
            height: 70,
            background: muiTheme.palette.background.light
          }}
          onChange={(event, newValue) => {
            handleValueChange(newValue);
          }}
        >
          <BottomNavigationAction label="Knights" icon={<DirectionsRunIcon />} />
          <BottomNavigationAction label="Crates" icon={<InventoryIcon />} />
          <BottomNavigationAction label="Shop" icon={<StoreIcon />} />
        </BottomNavigation>
      </Paper>
    </FullscreenDialog>
  );
}
