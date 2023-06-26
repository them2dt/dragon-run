import React from "react";
import { useTheme, Grid, Typography } from "@mui/material";

export default function ComingSoonShopCrates() {
  const muiTheme = useTheme();
  return (
    <>
      <Grid item xs={12}>
        <Typography align="center" sx={{ px: 5, mt: 7 }} variant="h3">
          Crates
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography align="center" color={muiTheme.palette.text.secondary} sx={{ px: 5, my: 3 }} variant="h1">
          ???
        </Typography>
      </Grid>
    </>
  );
}
