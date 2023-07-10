import React, { useState, useEffect } from "react";
import { useTheme, Paper, Skeleton, Grid, Typography, Box } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import defaultCharacter from "@assets/default-character-still.png";
import { green } from "@mui/material/colors";

interface ChooseLevelItemProps {
  name: string;
  image: string;
  comingSoon?: boolean;
  completed?: boolean;
  locked?: boolean;
}

export default function ChooseLevelItem({ name, image, completed, comingSoon, locked }: ChooseLevelItemProps) {
  const muiTheme = useTheme();

  const [imageLoaded, setImageLoaded] = useState(false);
  const [colorPrimary, setColorPrimary] = useState(muiTheme.palette.text.secondary);
  const [colorSecondary, setColorSecondary] = useState<string>(green[400]);

  useEffect(() => {
    if (locked ?? comingSoon) {
      setColorPrimary(muiTheme.palette.grey[500]);
      setColorSecondary(muiTheme.palette.grey[500]);
    }
  }, []);

  return (
    <Grid
      item
      xs={10}
      md={8}
      sx={{
        width: "fit-content",
        m: 1,
        [muiTheme.breakpoints.up("md")]: {
          m: 2
        }
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
          sx={{
            p: 1,
            [muiTheme.breakpoints.up("md")]: {
              p: 2
            }
          }}
        >
          <Paper
            sx={{
              borderRadius: "0",
              width: "100%",
              overflow: "hidden",
              pt: "34%",
              position: "relative",
              cursor: locked ?? comingSoon ? "auto" : "pointer"
            }}
            elevation={16}
          >
            <img
              src={image === "" ? defaultCharacter : `game-assets/level-images/${image}`}
              alt={name}
              className="h-full absolute top-0 rendering-pixelated object-cover"
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
                  position: "absolute",
                  top: 0,
                  width: 1,
                  height: 1,
                  borderRadius: 0
                }}
              />
            )}
            <Box sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
              {locked && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "black",
                    opacity: 0.8
                  }}
                >
                  <LockIcon
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      fontSize: "2rem",
                      color: muiTheme.palette.grey[500],
                      [muiTheme.breakpoints.up("md")]: {
                        fontSize: "3rem"
                      }
                    }}
                  />
                </Box>
              )}
              {comingSoon && (
                <Typography
                  variant={"h5"}
                  textAlign={"left"}
                  sx={{
                    [muiTheme.breakpoints.down("sm")]: {
                      fontSize: "1rem"
                    },
                    color: colorSecondary,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    marginX: 1
                  }}
                >
                  Coming Soon...
                </Typography>
              )}
              {completed && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    opacity: 1,
                    background: muiTheme.palette.background.light,
                    m: 1
                  }}
                >
                  <Typography
                    variant={"h5"}
                    textAlign={"center"}
                    sx={{
                      [muiTheme.breakpoints.down("sm")]: {
                        fontSize: "1rem"
                      },
                      color: colorSecondary,
                      marginX: 1,
                      marginY: 0.3
                    }}
                  >
                    Completed
                  </Typography>
                </Box>
              )}
              {name && (
                <Typography
                  variant={"h4"}
                  textAlign={"left"}
                  sx={{
                    color: colorPrimary,
                    position: "absolute",
                    bottom: 2.6,
                    left: 0,
                    marginX: 1
                  }}
                >
                  {name}
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}
