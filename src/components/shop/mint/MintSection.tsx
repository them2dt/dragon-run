import {
  useTheme,
  Grid,
  Card,
  Typography,
  Zoom,
  Box,
  Stack,
} from "@mui/material";

import unrevealed from "@assets/Knights_unrevealed.gif";

interface MintSectionProps {
  active: boolean;
  goToShop: () => void;
}

export default function MintSection({ active, goToShop }: MintSectionProps) {
  const muiTheme = useTheme();
  return (
    <Zoom
      in={active}
      style={{ transitionDelay: active ? "200ms" : "0ms" }}
      unmountOnExit
    >
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
            maxWidth: 1300,
            mx: "auto",
          },
        }}
      >
        <Grid
          component={Box}
          item
          xs={12}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            width: 1,
          }}
        >
          <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
            <img
              src={unrevealed}
              style={{
                width: "50vw",
                borderRadius: "20px",
              }}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "center" }}
            style={{ marginTop: "10px" }}
          >
            <Typography variant="h5" color={"white"}>
              5 SOL
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "center" }}
            style={{ marginTop: "10px" }}
          >
            <Typography variant="h5" color={"white"}>
              15/2000
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
            <button
              style={{
                width: "50vw",
                marginTop: "10px",
                padding: "10px",
                backgroundColor: "#ff3c00",
                borderRadius: "20px",
              }}
              onClick={goToShop}
            >
              <Typography variant="h4" color={"white"}>
                Mint
              </Typography>
            </button>
          </Stack>
        </Grid>
      </Grid>
    </Zoom>
  );
}
