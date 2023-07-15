import React, { useMemo, useState } from "react";
import { useTheme, Grid, Card, Typography, Zoom, Stack, Box } from "@mui/material";
import { SquareButton } from "components/styled/SquareButton";
import KnightItem from "./KnightItem";
import { useSolana } from "@context/useSolana";
import type KnightNFT from "types/KnightNFT";

interface KnightsSectionProps {
  active: boolean;
  goToShop: () => void;
}

export default function KnightsSection({ active, goToShop }: KnightsSectionProps) {
  const muiTheme = useTheme();
  const { solana } = useSolana();
  const [ownedKnights, setOwnedKnights] = useState<KnightNFT[]>(solana.ownedKnights);

  useMemo(() => {
    const knights = solana.ownedKnights.sort((a, b) => {
      const aNum = parseInt(a.name.split("#")[1]);
      const bNum = parseInt(b.name.split("#")[1]);
      return aNum - bNum;
    });
    setOwnedKnights(knights);
  }, [solana.ownedKnights]);

  return (
    <Zoom in={active} style={{ transitionDelay: active ? "200ms" : "0ms" }} unmountOnExit>
      <Box>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          component={Card}
          elevation={0}
          sx={{
            mx: "auto",
            mb: 4,
            [muiTheme.breakpoints.up("xl")]: {
              mt: 6,
              mb: 6,
              maxWidth: 1300,
              mx: "auto"
            }
          }}
        >
          <Grid item xs={12}>
            <Typography align="center" sx={{ px: 5, my: 3 }} variant="h3">
              Owned
            </Typography>
          </Grid>
          {ownedKnights.map((character: KnightNFT) => (
            <KnightItem name={character.name} image={character.image} key={"knights" + character.name}>
              <Typography variant="h5">{character.name}</Typography>
              <Typography
                variant="h6"
                sx={{
                  pb: 0.2,
                  pt: 0.3,
                  [muiTheme.breakpoints.up("lg")]: {
                    pb: 1,
                    pt: 2
                  }
                }}
                color={muiTheme.palette.text.secondary}
              >
                Traits:
              </Typography>
              <Typography color={muiTheme.palette.text.secondary}>
                Head: {character.traits.head === "" ? "Default" : character.traits.head}
              </Typography>
              <Typography color={muiTheme.palette.text.secondary}>
                Arms: {character.traits.arms === "" ? "Default" : character.traits.arms}
              </Typography>
              <Typography color={muiTheme.palette.text.secondary}>
                Torso: {character.traits.torso === "" ? "Default" : character.traits.torso}
              </Typography>
              <Typography color={muiTheme.palette.text.secondary}>
                Legs: {character.traits.legs === "" ? "Default" : character.traits.legs}
              </Typography>
            </KnightItem>
          ))}
        </Grid>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mb: 6,
            [muiTheme.breakpoints.up("xl")]: {
              mb: 10
            }
          }}
        >
          <Typography align="center" sx={{ px: 5, my: 3 }} variant="h2" color={muiTheme.palette.text.secondary}>
            Get More
          </Typography>
          <Stack direction="row" spacing={2} sx={{ justifyContent: "center", mb: 8 }}>
            <SquareButton sx={{ my: 3, px: 4, py: 2 }} onClick={goToShop}>
              <Typography variant="h3">Shop</Typography>
            </SquareButton>
          </Stack>
        </Box>
      </Box>
    </Zoom>
  );
}
