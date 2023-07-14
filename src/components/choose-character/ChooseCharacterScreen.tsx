import React, { useState } from "react";
import EventKeys from "constants/EventKeys";
import { Paper, Stack, Typography, useTheme, Box, Zoom } from "@mui/material";
import { SquareButton } from "components/styled/SquareButton";
import loadCharacter from "utils/loadCharacter";
import ChooseCharacterCard from "./ChooseCharacterCard";
import { useSolana } from "@context/useSolana";

interface ChooseCharacterScreenProps {
  active: boolean;
  openShop: () => void;
}

export default function ChooseCharacterScreen({ active, openShop }: ChooseCharacterScreenProps) {
  const muiTheme = useTheme();
  const { solana } = useSolana();

  const [characterIndex, setCharacterIndex] = useState(0);

  const handleNextCharacterClick = () => {
    setCharacterIndex((prevIndex) => (prevIndex + 1) % solana.ownedKnights.length);
  };

  const handlePreviousCharacterClick = () => {
    setCharacterIndex((prevIndex) => (prevIndex - 1 + solana.ownedKnights.length) % solana.ownedKnights.length);
  };

  const handleConfirm = () => {
    loadCharacter(solana.ownedKnights[characterIndex].spritesheet, EventKeys.GoToGame);
  };

  return (
    <Zoom in={active} style={{ transitionDelay: active ? "200ms" : "0ms" }} unmountOnExit>
      <Paper
        component={Stack}
        sx={{
          background: muiTheme.palette.background.default,
          overflowY: "scroll",
          height: "100%",
          overflowX: "hidden"
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Stack direction={"column"} spacing={2} sx={{ px: 3, pb: 3, pt: 1, mt: 5 }}>
            <ChooseCharacterCard
              name={solana.ownedKnights[characterIndex].name}
              image={solana.ownedKnights[characterIndex].image}
              charactersAmount={solana.ownedKnights.length}
              next={handleNextCharacterClick}
              previous={handlePreviousCharacterClick}
              handleConfirm={handleConfirm}
            />
            <SquareButton
              sx={{
                paddingY: 1.4,
                paddingX: 4,
                [muiTheme.breakpoints.up("lg")]: {
                  paddingY: 2
                },
                color: muiTheme.palette.text.secondary,
                background: muiTheme.palette.secondary.main,
                "&:hover": {
                  backgroundColor: muiTheme.palette.text.secondary,
                  color: muiTheme.palette.secondary.main
                }
              }}
              onClick={handleConfirm}
            >
              <Typography variant="h4">Confirm</Typography>
            </SquareButton>
          </Stack>
          <Typography align="center" sx={{ px: 5, my: 3 }} variant="h2" color={muiTheme.palette.text.secondary}>
            Get More
          </Typography>
          <Stack direction="row" spacing={2} sx={{ justifyContent: "center", mb: 8 }}>
            <SquareButton sx={{ my: 3, px: 4, py: 2 }} onClick={openShop}>
              <Typography variant="h3">Shop</Typography>
            </SquareButton>
          </Stack>
        </Box>
      </Paper>
    </Zoom>
  );
}
