import React from "react";
import { useTheme, Grid, Card, Zoom } from "@mui/material";
import ComingSoonShopCrates from "./ComingSoonShopCrates";
import TradeOnSection from "./TradeOnSection";

interface ShopSectionProps {
  active: boolean;
}

export default function ShopSection({ active }: ShopSectionProps) {
  const muiTheme = useTheme();
  return (
    <Zoom in={active} style={{ transitionDelay: active ? "200ms" : "0ms" }} unmountOnExit>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        component={Card}
        elevation={0}
        sx={{
          mx: "auto",
          mb: 10,
          [muiTheme.breakpoints.up("xl")]: {
            mt: 6,
            mb: 16,
            maxWidth: 1300
          }
        }}
      >
        <TradeOnSection />
        <ComingSoonShopCrates />
      </Grid>
    </Zoom>
  );
}
