import React, { useEffect, useState, useRef } from "react";
import { Typography, useTheme, Box, Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import InventoryIcon from "@mui/icons-material/Inventory";
import FullscreenDialog from "components/FullscreenDialog";
import KnightsSection from "./knights/KnightsSection";
import ComingSoonCratesSection from "./crates/ComingSoonCratesSection";

interface InventoryDialogProps {
  inventoryOpen: boolean;
  closeInventory: () => void;
  openShop: () => void;
}

export default function InventoryDialog({ inventoryOpen, closeInventory, openShop }: InventoryDialogProps) {
  const muiTheme = useTheme();
  const [value, setValue] = useState(0);
  const [cratesActive, setCratesActive] = useState(false);
  const [knightsActive, setKnightsActive] = useState(false);
  const [title, setTitle] = useState("Inventory");

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
    if (newValue === 0) {
      setTitle("Knights");
      setKnightsActive(true);
    } else if (newValue === 1) {
      setTitle("Crates");
      setCratesActive(true);
    }
  };

  useEffect(() => {
    handleValueChange(value);
  }, []);

  return (
    <FullscreenDialog dialogOpen={inventoryOpen} closeDialog={closeInventory}>
      <Typography align="center" sx={{ px: 5, my: 3 }} variant="h3" color={muiTheme.palette.text.secondary}>
        {title}
      </Typography>
      <Box
        ref={scrollBoxRef}
        sx={{
          overflowY: "scroll",
          overflowX: "hidden",
          my: "auto"
        }}
      >
        <Box sx={{ minHeight: "100vh" }}>
          <KnightsSection
            active={knightsActive}
            goToShop={() => {
              openShop();
            }}
          />
          <ComingSoonCratesSection
            active={cratesActive}
            goToShop={() => {
              openShop();
            }}
          />
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
        </BottomNavigation>
      </Paper>
    </FullscreenDialog>
  );
}
