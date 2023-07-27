import React, { useState } from "react";
import { useTheme, Paper, Skeleton, Grid, Typography, Box, Card, ClickAwayListener, Tooltip } from "@mui/material";
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
  const [imgTooltipOpen, setImgTooltipOpen] = useState(false);
  const [buttonTooltipOpen, setButtonTooltipOpen] = useState(false);

  const handleExchangeImgClick = () => {
    if (link !== "") {
      window.open(link, "_blank");
      return;
    }
    setImgTooltipOpen(true);
    setTimeout(() => {
      setImgTooltipOpen(false);
    }, 1000);
  };

  const handleImgTooltipOpenReset = () => {
    setImgTooltipOpen(false);
  };

  const handleExchangeButtonClick = () => {
    if (link !== "") {
      window.open(link, "_blank");
      return;
    }
    setButtonTooltipOpen(true);
    setTimeout(() => {
      setButtonTooltipOpen(false);
    }, 1000);
  };

  const handleButtonTooltipOpenReset = () => {
    setButtonTooltipOpen(false);
  };

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
          <ClickAwayListener onClickAway={handleImgTooltipOpenReset}>
            <Tooltip
              PopperProps={{
                disablePortal: false,
                sx: {
                  "& .MuiTooltip-tooltip": {
                    background: primaryColor ?? muiTheme.palette.secondary.main,
                    color: secondaryColor ?? muiTheme.palette.text.secondary
                  }
                }
              }}
              onClose={handleImgTooltipOpenReset}
              open={imgTooltipOpen}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title="Coming Soon!"
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
                  className="w-full rendering-pixelated cursor-pointer"
                  style={{ display: imageLoaded ? "block" : "none" }}
                  onClick={() => {
                    handleExchangeImgClick();
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
            </Tooltip>
          </ClickAwayListener>
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
              <ClickAwayListener onClickAway={handleButtonTooltipOpenReset}>
                <Tooltip
                  PopperProps={{
                    disablePortal: false,
                    sx: {
                      "& .MuiTooltip-tooltip": {
                        background: primaryColor ?? muiTheme.palette.secondary.main,
                        color: secondaryColor ?? muiTheme.palette.text.secondary
                      }
                    }
                  }}
                  onClose={handleButtonTooltipOpenReset}
                  open={buttonTooltipOpen}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title="Coming Soon!"
                >
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
                      handleExchangeButtonClick();
                    }}
                  >
                    <Typography variant="h6">Trade</Typography>
                  </SquareButton>
                </Tooltip>
              </ClickAwayListener>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
