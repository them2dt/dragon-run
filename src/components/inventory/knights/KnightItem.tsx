import React, { useState } from "react";
import { useTheme, Paper, Skeleton, Grid } from "@mui/material";
import defaultCharacter from "@assets/default-character-still.png";

interface KnightItemProps {
  name: string;
  image: string;
  children?: React.ReactNode;
  equipped?: boolean;
}

export default function KnightItem({ name, image, children, equipped }: KnightItemProps) {
  const muiTheme = useTheme();

  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Grid
      item
      xs={10}
      sm={5}
      md={5}
      sx={{
        m: 2,
        width: "fit-content",
        borderWidth: equipped ? 2 : 0,
        borderColor: muiTheme.palette.secondary.main
      }}
    >
      <Grid
        spacing={0}
        component={Paper}
        container
        direction="row"
        sx={{
          borderRadius: "0",
          background: muiTheme.palette.background.light
        }}
        elevation={12}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            p: 2
          }}
        >
          <Paper
            sx={{
              borderRadius: "0"
            }}
            elevation={16}
          >
            <img
              src={image === "" ? defaultCharacter : image}
              alt={name}
              className="w-full rendering-pixelated"
              style={{ display: imageLoaded ? "block" : "none" }}
              onLoad={() => {
                setImageLoaded(true);
              }}
            />
            {!imageLoaded && (
              <Skeleton
                variant="rectangular"
                sx={{
                  backgroundColor: muiTheme.palette.background.light,
                  width: 1,
                  pt: "100%",
                  borderRadius: 0
                }}
              />
            )}
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            p: 2,
            pl: 2.4,
            pt: 0,
            [muiTheme.breakpoints.up("md")]: {
              pl: 0,
              pt: 2
            }
          }}
        >
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
}
