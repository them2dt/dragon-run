import React, { useState } from "react";
import { useTheme, Paper, Skeleton, Grid, Typography, Box } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { green } from "@mui/material/colors";

interface ChooseLevelItemProps {
  name: string;
  image?: string;
  comingSoon?: boolean;
  completed?: boolean;
  locked?: boolean;
  selectLevel?: () => void;
}

export default function ChooseLevelItem({
  name,
  image,
  completed,
  comingSoon,
  locked,
  selectLevel
}: ChooseLevelItemProps) {
  const muiTheme = useTheme();

  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Grid
      item
      xs={10}
      md={8}
      sx={{
        width: "fit-content",
        m: 1,
        "&:hover": {
          borderColor: locked ?? comingSoon ? "none" : muiTheme.palette.grey[500],
          border: locked ?? comingSoon ? 0 : 2
        },
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
            onClick={locked ?? comingSoon ? undefined : selectLevel}
          >
            <img
              src={image ? `game-assets/level-images/${image}` : "game-assets/level-images/coming-soon-level.png"}
              alt={name}
              className="h-full absolute top-0 rendering-pixelated object-cover pointer-events-none"
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
                  borderRadius: 0,
                  pointerEvents: "none"
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
                    opacity: 0.6
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
                <>
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: "black",
                      opacity: 0.6
                    }}
                  />
                  <Typography
                    variant={"h5"}
                    textAlign={"left"}
                    sx={{
                      [muiTheme.breakpoints.down("sm")]: {
                        fontSize: "0.8rem"
                      },
                      color: muiTheme.palette.text.secondary,
                      position: "absolute",
                      top: 0,
                      left: 0,
                      marginX: 1,
                      marginY: 0.3
                    }}
                  >
                    Coming Soon...
                  </Typography>
                </>
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
                        fontSize: "0.8rem"
                      },
                      color: green[400],
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
                    [muiTheme.breakpoints.down("sm")]: {
                      fontSize: "1.2rem"
                    },
                    color: locked ?? comingSoon ? muiTheme.palette.grey[400] : muiTheme.palette.text.secondary,
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
