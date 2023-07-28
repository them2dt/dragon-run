import React, { useEffect, useMemo, useState } from "react";
import { useSolana } from "context/useSolana";
import EventKeys from "constants/EventKeys";
import AnimatedPage from "components/animated/AnimatedPage";
import OverlayWrapper from "components/OverlayWrapper";
import AnimatedEnterTitle from "components/animated/AnimatedEnterTitle";
import { Typography, useTheme, Checkbox, Box } from "@mui/material";
import { SquareButton } from "components/styled/SquareButton";
import eventsCenter from "utils/eventsCenter";
import AlertDialog from "components/AlertDialog";
import { useFirestore } from "@context/useFirestore";
import { getAuth } from "firebase/auth";
import { green, grey } from "@mui/material/colors";
import TermsAndConditionsDialog from "components/TermsAndConditionsDialog";
import LoadingFullScreen from "components/loading/LoadingFullScreen";

interface EnterProps {
  userName: string;
}

export default function Enter({ userName }: EnterProps) {
  const muiTheme = useTheme();
  const { solanaFunctions, solanaLoadingDescription } = useSolana();
  const { firestoreData } = useFirestore();

  const [loading, setLoading] = useState(false);
  const [loadingDescription, setLoadingDescription] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [authorised, setAuthorised] = useState(false);
  const [needsSignIn, setNeedsSignIn] = useState(false);
  const [failedSignIn, setFailedSignIn] = useState(false);
  const [fullScreenDialogOpen, setFullScreenDialogOpen] = useState(false);
  const [termsAndConditionsDialogOpen, setTermsAndConditionsDialogOpen] = useState(false);
  const [termsAndConditionsAccepted, setTermsAndConditionsAccepted] = useState(false);

  const openFullScreenDialog = () => {
    setFullScreenDialogOpen(true);
  };
  const closeFullScreenDialog = () => {
    setFullScreenDialogOpen(false);
  };

  const openTermsAndConditionsDialog = () => {
    setTermsAndConditionsDialogOpen(true);
  };
  const closeTermsAndConditionsDialog = () => {
    setTermsAndConditionsDialogOpen(false);
  };

  const handleTermsAndConditionsAcceptedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAndConditionsAccepted(event.target.checked);
    localStorage.setItem("termsAndConditionsAccepted", JSON.stringify({ accepted: event.target.checked, userName }));
  };

  const handleEnterClick = async () => {
    setLoading(true);
    setLoadingDescription("Fetching your stats...");
    if (!userName) {
      eventsCenter.emit(EventKeys.GoToHome);
      return;
    }
    const auth = getAuth();
    if (auth.currentUser?.uid === userName) {
      if (!termsAndConditionsAccepted) return;
      setAuthorised(true);
      setSuccess(true);
      eventsCenter.emit(EventKeys.GoToHome);
      return;
    }
    const xnftSolana = window?.xnft?.solana;
    if (!xnftSolana) {
      setError(true);
      setLoadingDescription("Error: Couldn't connect to Backpack. Please check your connection and try again.");
      return;
    }
    const pubkey = xnftSolana?.publicKey?.toString();
    if (!pubkey) {
      setError(true);
      setLoadingDescription("Error: Couldn't get your wallet details. Please check your connection and try again.");
      return;
    }
    if (pubkey == null) {
      setError(true);
      setLoadingDescription("Error: Couldn't get your wallet details. Please check your connection and try again.");
      return;
    }

    await solanaFunctions
      .getAuthSignature(userName)
      .then(() => {
        setAuthorised(true);
        setFailedSignIn(false);
      })
      .catch((error) => {
        console.log(error);
        setFailedSignIn(true);
      });
    setLoading(false);
  };

  const enterFullScreen = () => {
    window?.xnft?.popout({ fullscreen: true });
  };

  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        if (user.uid === userName) {
          setAuthorised(true);
        } else {
          setAuthorised(false);
        }
      } else {
        console.log("User is signed out");
      }
    });
  }, []);

  useEffect(() => {
    const auth = getAuth();
    if (auth.currentUser?.uid === userName) {
      setAuthorised(true);
    } else {
      setAuthorised(false);
    }
  }, [firestoreData?.userData?.userName]);

  useMemo(() => {
    if (userName && !authorised) {
      setNeedsSignIn(true);
    } else {
      setNeedsSignIn(false);
    }
  }, [userName, authorised]);

  useEffect(() => {
    if (window?.xnft?.metadata != null && window.innerWidth < screen.width - 30) {
      openFullScreenDialog();
    }
  }, []);

  useEffect(() => {
    const result = localStorage.getItem("termsAndConditionsAccepted");
    if (!result) return;
    const resultParsed = JSON.parse(result);
    if (resultParsed.accepted && resultParsed.userName === userName) {
      setTermsAndConditionsAccepted(true);
    } else {
      setTermsAndConditionsAccepted(false);
    }
  }, [userName]);

  return (
    <AnimatedPage>
      <OverlayWrapper className="bg-bg3 overflow-hidden">
        <AlertDialog
          title="Enter Fullscreen?"
          dialogOpen={fullScreenDialogOpen}
          closeDialog={closeFullScreenDialog}
          acceptFunction={enterFullScreen}
        />
        <TermsAndConditionsDialog
          termsAndConditionsOpen={termsAndConditionsDialogOpen}
          closeTermsAndConditions={closeTermsAndConditionsDialog}
        />
        <div className="w-full h-full m-auto flex flex-col max-w-[1240px] text-center">
          <div className="h-auto my-auto">
            <AnimatedEnterTitle userName={userName} signedIn={!needsSignIn} failedSignIn={failedSignIn} />
            <SquareButton
              variant="contained"
              size="large"
              sx={{
                backgroundColor: needsSignIn ? muiTheme.palette.secondary.main : green[500],
                "&:hover": {
                  backgroundColor: muiTheme.palette.text.secondary,
                  color: needsSignIn ? muiTheme.palette.secondary.main : green[500]
                },
                minWidth: "200px",
                py: "10px",
                [muiTheme.breakpoints.up("sm")]: { minWidth: "300px", py: "14px" },
                [muiTheme.breakpoints.up("md")]: { minWidth: "500px", py: "18px" },
                "&:disabled": {
                  color: muiTheme.palette.text.secondary,
                  backgroundColor: grey[500]
                }
              }}
              onClick={() => {
                handleEnterClick().catch((error) => {
                  console.log(error);
                });
              }}
              disabled={!needsSignIn && !termsAndConditionsAccepted}
            >
              <Typography
                sx={{ fontSize: "2.2rem", [muiTheme.breakpoints.up("md")]: { fontSize: "3rem" } }}
                fontWeight={400}
                component="h3"
                lineHeight="1.1"
              >
                {needsSignIn ? "Sign In" : "Enter"}
              </Typography>
            </SquareButton>
            {!needsSignIn && (
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 2, px: 2 }}>
                <Checkbox
                  checked={termsAndConditionsAccepted}
                  onChange={handleTermsAndConditionsAcceptedChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <Typography
                  noWrap
                  color={termsAndConditionsAccepted ? muiTheme.palette.text.secondary : muiTheme.palette.secondary.main}
                  component="h3"
                >
                  I accept the{" "}
                  <span
                    className="underline cursor-pointer"
                    onClick={() => {
                      openTermsAndConditionsDialog();
                    }}
                  >
                    Terms and Conditions
                  </span>
                </Typography>
              </Box>
            )}
          </div>
        </div>
        <LoadingFullScreen active={loading} description={solanaLoadingDescription ?? loadingDescription} />
      </OverlayWrapper>
    </AnimatedPage>
  );
}
