import React, { useState, useMemo, useEffect } from "react";
import EventKeys from "constants/EventKeys";
import { Paper, Stack, Typography, useTheme, Box, Zoom } from "@mui/material";
import { SquareButton } from "components/styled/SquareButton";
import loadCharacter from "utils/loadCharacter";
import ChooseCharacterCard from "./ChooseCharacterCard";
import { useSolana } from "@context/useSolana";
import type KnightNFT from "types/KnightNFT";
import { useGameData } from "@context/useGameData";

interface ChooseCharacterScreenProps {
  active: boolean;
  openShop: () => void;
  handleLoading: () => void;
}

export default function ChooseCharacterScreen({ active, openShop, handleLoading }: ChooseCharacterScreenProps) {
  const muiTheme = useTheme();
  const { solana } = useSolana();
  const { selectedLevel, selectedSceneKey, equipKnight, equippedKnight } = useGameData();
  const [characterIndex, setCharacterIndex] = useState(0);
  const [ownedKnights, setOwnedKnights] = useState<KnightNFT[]>(solana.ownedKnights);

  useMemo(() => {
    const knights = solana.ownedKnights.sort((a, b) => {
      const aNum = parseInt(a.name.split("#")[1]);
      const bNum = parseInt(b.name.split("#")[1]);
      return aNum - bNum;
    });
    setOwnedKnights(knights);
  }, [solana.ownedKnights]);

  const handleNextCharacterClick = () => {
    setCharacterIndex((prevIndex) => (prevIndex + 1) % solana.ownedKnights.length);
  };

  const handlePreviousCharacterClick = () => {
    setCharacterIndex((prevIndex) => (prevIndex - 1 + solana.ownedKnights.length) % solana.ownedKnights.length);
  };

  const handleConfirm = () => {
    handleLoading();
    equipKnight(ownedKnights[characterIndex].name, ownedKnights[characterIndex].spritesheet);
    setTimeout(() => {
      loadCharacter(ownedKnights[characterIndex].spritesheet, EventKeys.GoToGame, {
        levelNumber: selectedLevel,
        levelSceneKey: selectedSceneKey
      });
    }, 600);
  };

  useEffect(() => {
    // set the equipped knight to the first one in the list
    if (ownedKnights.length > 0) {
      for (let i = 0; i < ownedKnights.length; i++) {
        if (ownedKnights[i].name === equippedKnight.name) {
          setCharacterIndex(i);
          break;
        }
      }
    }
  }, [active]);

  return (
    <Zoom in={active} style={{ transitionDelay: active ? "200ms" : "0ms" }} unmountOnExit>
      <Paper
        component={Stack}
        elevation={0}
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
              name={ownedKnights[characterIndex].name}
              image={ownedKnights[characterIndex].image}
              charactersAmount={ownedKnights.length}
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
