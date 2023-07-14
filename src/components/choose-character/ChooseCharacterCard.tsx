import React, { useState } from "react";
import { Typography, useTheme, Paper, Box, Skeleton, Grid } from "@mui/material";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";
import { SquareButton } from "components/styled/SquareButton";
import defaultCharacter from "@assets/default-character-still.png";

interface ChooseCharacterCardProps {
  name: string;
  image: string;
  next: () => void;
  previous: () => void;
  charactersAmount: number;
  handleConfirm: () => void;
}

export default function ChooseCharacterCard({
  name,
  image,
  next,
  previous,
  charactersAmount,
  handleConfirm
}: ChooseCharacterCardProps) {
  const muiTheme = useTheme();

  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Paper sx={{ borderRadius: "0", background: muiTheme.palette.background.light }} elevation={16}>
      <Grid
        direction={"column"}
        container
        sx={{
          pt: 1,
          pb: 2,
          px: 3,
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          [muiTheme.breakpoints.up("xl")]: {
            pt: 3,
            pb: 3,
            px: 6
          }
        }}
      >
        <Grid item xs={12}>
          <Typography
            variant="h4"
            sx={{
              pb: 1,
              [muiTheme.breakpoints.up("xl")]: {
                pb: 3
              }
            }}
          >
            {name}
          </Typography>
        </Grid>
        <Grid
          item
          component={Paper}
          xs={12}
          elevation={12}
          onClick={() => {
            handleConfirm();
          }}
          sx={{
            width: 150,
            cursor: "pointer",
            [muiTheme.breakpoints.up("xs")]: {
              width: 220
            },
            [muiTheme.breakpoints.up("sm")]: {
              width: 230
            },
            [muiTheme.breakpoints.up("xl")]: {
              width: 340
            }
          }}
        >
          <img
            src={image === "" ? defaultCharacter : image}
            alt={name}
            className="w-full rendering-pixelated"
            style={{ display: imageLoaded ? "block" : "none", pointerEvents: "none" }}
            onLoad={() => {
              setImageLoaded(true);
            }}
          />
          {!imageLoaded && (
            <Skeleton
              variant="rectangular"
              sx={{
                backgroundColor: muiTheme.palette.background.light,
                borderRadius: 0,
                pt: "100%",
                width: 150,
                pointerEvents: "none",
                [muiTheme.breakpoints.up("xs")]: {
                  width: 220
                },
                [muiTheme.breakpoints.up("sm")]: {
                  width: 230
                },
                [muiTheme.breakpoints.up("xl")]: {
                  width: 340
                }
              }}
            />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          component={Box}
          sx={{
            display: "flex",
            justifyContent: "center",
            minWidth: "100%",
            pt: 2,
            [muiTheme.breakpoints.up("xl")]: {
              pt: 3
            }
          }}
        >
          <SquareButton
            onClick={() => {
              if (charactersAmount === 1) return;
              setImageLoaded(false);
              previous();
            }}
            variant="contained"
            sx={{ marginY: "auto", marginX: "auto" }}
          >
            <ChevronLeft fontSize="large" />
          </SquareButton>
          <SquareButton
            onClick={() => {
              if (charactersAmount === 1) return;
              setImageLoaded(false);
              next();
            }}
            variant="contained"
            sx={{ marginY: "auto", marginX: "auto" }}
          >
            <ChevronRight fontSize="large" />
          </SquareButton>
        </Grid>
      </Grid>
    </Paper>
  );
}
