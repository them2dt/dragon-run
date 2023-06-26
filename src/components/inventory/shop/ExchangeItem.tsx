import React, { useState } from "react";
import { useTheme, Paper, Skeleton, Grid, Typography, Box, Card } from "@mui/material";
import { SquareButton } from "components/styled/SquareButton";

interface ExchangeItemProps {
  name: string;
  image: string;
  link: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export default function ExchangeItem({ name, image, link, primaryColor, secondaryColor }: ExchangeItemProps) {
  const muiTheme = useTheme();

  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Grid
      item
      xs={10}
      sm={5}
      md={10}
      lg={5}
      sx={{
        m: 2
      }}
    >
      <Grid
        spacing={0}
        component={Card}
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
              src={image}
              alt={name}
              className="w-full rendering-pixelated"
              style={{ display: imageLoaded ? "block" : "none" }}
              onClick={() => {
                window.open(link, "_blank");
              }}
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
        <Grid item component={Box} xs={12} md={6}>
          <Box
            sx={{
              width: "100%",
              pt: "70%",
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
                display: "flex",
                [muiTheme.breakpoints.up("md")]: {
                  mt: 1.5,
                  mr: 2,
                  mb: 2,
                  ml: 0
                }
              }}
            >
              <Typography
                align="center"
                variant="h2"
                color={muiTheme.palette.text.secondary}
                sx={{
                  my: "auto",
                  pb: "55px",
                  fontSize: "2rem",
                  [muiTheme.breakpoints.up("sm")]: {
                    fontSize: "2.2rem"
                  }
                }}
              >
                Trade on {name}
              </Typography>
              <SquareButton
                sx={{
                  mt: "auto",
                  position: "absolute",
                  bottom: 0,
                  background: primaryColor ?? muiTheme.palette.secondary.main,
                  color: secondaryColor ?? muiTheme.palette.text.secondary,
                  "&:hover": {
                    color: primaryColor ?? muiTheme.palette.secondary.main
                  }
                }}
                fullWidth
                variant="contained"
                size="large"
                onClick={() => {
                  window.open(link, "_blank");
                }}
              >
                <Typography variant="h6">Trade</Typography>
              </SquareButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
