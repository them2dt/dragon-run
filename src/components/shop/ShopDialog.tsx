import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  Typography,
  useTheme,
  Box,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import StoreIcon from "@mui/icons-material/Store";
import FullscreenDialog from "components/FullscreenDialog";
import MintSection from "./knights/MintSection";
import ShopSection from "./shop/ShopSection";

interface ShopDialogProps {
  mintOpen: boolean;
  closeMint: () => void;
  defaultTab?: number;
}

export default function ShopDialog({
  mintOpen,
  closeMint,
  defaultTab,
}: ShopDialogProps) {
  const muiTheme = useTheme();
  const [value, setValue] = useState(defaultTab ?? 0);
  const [knightsActive, setKnightsActive] = useState(false);
  const [shopActive, setShopActive] = useState(false);
  const [title, setTitle] = useState("Mint");

  const scrollBoxRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    scrollBoxRef.current?.scrollTo({
      top: 0,
    });
  };

  const handleValueChange = (newValue: number) => {
    scrollToTop();
    setValue(newValue);
    setKnightsActive(false);
    setShopActive(false);
    if (newValue === 0) {
      setTitle("Mint");
      setKnightsActive(true);
    } else if (newValue === 1) {
      setTitle("Shop");
      setShopActive(true);
    }
  };

  const goToShop = () => {
    handleValueChange(2);
  };

  useEffect(() => {
    handleValueChange(value);
    console.log("Opened shopDialog");
  }, []);

  useMemo(() => {
    handleValueChange(defaultTab ?? 0);
  }, [defaultTab, mintOpen]);

  return (
    <FullscreenDialog dialogOpen={mintOpen} closeDialog={closeMint}>
      <Typography
        align="center"
        sx={{ px: 5, my: 3 }}
        variant="h3"
        color={muiTheme.palette.text.secondary}
      >
        {title}
      </Typography>
      <Box
        ref={scrollBoxRef}
        sx={{
          overflowY: "scroll",
          overflowX: "hidden",
          my: "auto",
        }}
      >
        <Box sx={{ minHeight: "100vh" }}>
          <MintSection active={knightsActive} goToShop={goToShop} />
          <ShopSection active={shopActive} />
        </Box>
      </Box>
      <Paper sx={{}} elevation={20}>
        <BottomNavigation
          showLabels
          value={value}
          sx={{
            height: 70,
            background: muiTheme.palette.background.light,
          }}
          onChange={(event, newValue) => {
            handleValueChange(newValue);
          }}
        >
          <BottomNavigationAction label="Mint" icon={<AutoFixHighIcon />} />
          <BottomNavigationAction label="Buy" icon={<StoreIcon />} />
        </BottomNavigation>
      </Paper>
    </FullscreenDialog>
  );
}
