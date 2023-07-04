import React, { useTheme, Grid, Card, Typography, Zoom, Box } from "@mui/material";
import CrateItem from "./CrateItem";
import inventoryCrates from "components/fake-data/inventoryCrates";
import { SquareButton } from "components/styled/SquareButton";

interface CratesSectionProps {
  active: boolean;
}

export default function CratesSection({ active }: CratesSectionProps) {
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
        <Grid item xs={12}>
          <Typography align="center" sx={{ px: 5, my: 3 }} variant="h3">
            Owned
          </Typography>
        </Grid>
        {inventoryCrates.map((crate) => (
          <CrateItem name={crate.name} image={crate.image} key={"Crates" + crate.name}>
            <Box
              sx={{
                width: "100%",
                pt: "90%",
                position: "relative",
                [muiTheme.breakpoints.up("md")]: {
                  pt: "100%"
                }
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  maxHeight: "100%",
                  margin: 2.5,
                  mt: 0,
                  [muiTheme.breakpoints.up("md")]: {
                    mt: 0.5,
                    mr: 2,
                    mb: 3,
                    ml: 0
                  }
                }}
              >
                <Typography variant="body1" color={muiTheme.palette.text.secondary}>
                  Description:
                </Typography>
                <Typography variant="body2" pb={0.4} color={muiTheme.palette.text.secondary}>
                  {crate.description}
                </Typography>
                <Typography variant="body2" color={muiTheme.palette.text.secondary}>
                  You Own: {crate.owned}
                </Typography>
                <Typography variant="body2" color={muiTheme.palette.text.secondary}>
                  Floor Price: {crate.floor}
                </Typography>
                <SquareButton
                  sx={{ position: "absolute", bottom: 0 }}
                  fullWidth
                  variant="contained"
                  color="secondary"
                  size="large"
                >
                  <Typography variant="h6">Open</Typography>
                </SquareButton>
              </Box>
            </Box>
          </CrateItem>
        ))}
      </Grid>
    </Zoom>
  );
}
