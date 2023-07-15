import React, { useEffect, useMemo, useState } from "react";
import { useSolana } from "context/useSolana";
import EventKeys from "constants/EventKeys";
import AnimatedPage from "components/animated/AnimatedPage";
import OverlayWrapper from "components/OverlayWrapper";
import AnimatedEnterTitle from "components/animated/AnimatedEnterTitle";
import { Typography, useTheme } from "@mui/material";
import { SquareButton } from "components/styled/SquareButton";
import eventsCenter from "utils/eventsCenter";
import AlertDialog from "components/AlertDialog";
import { useFirestore } from "@context/useFirestore";
import { getAuth } from "firebase/auth";
import Loading from "./Loading";
import { green } from "@mui/material/colors";

interface EnterProps {
  userName: string;
}

export default function Enter({ userName }: EnterProps) {
  const muiTheme = useTheme();
  const { solanaFunctions } = useSolana();
  const { firestoreData } = useFirestore();

  const [loading, setLoading] = useState(false);
  const [authorised, setAuthorised] = useState(false);
  const [needsSignIn, setNeedsSignIn] = useState(false);
  const [failedSignIn, setFailedSignIn] = useState(false);
  const [fullScreenDialogOpen, setFullScreenDialogOpen] = useState(false);

  const openFullScreenDialog = () => {
    setFullScreenDialogOpen(true);
  };

  const closeFullScreenDialog = () => {
    setFullScreenDialogOpen(false);
  };

  const handleEnterClick = async () => {
    setLoading(true);
    if (!userName) {
      eventsCenter.emit(EventKeys.GoToHome);
      return;
    }
    if (firestoreData?.firestore?.app == null) {
      console.log("Firestore not initialized");
      setFailedSignIn(true);
      setLoading(false);
      return;
    }
    const auth = getAuth(firestoreData?.firestore?.app);
    if (auth.currentUser?.uid === userName) {
      setAuthorised(true);
      console.log("User already signed in");
      eventsCenter.emit(EventKeys.GoToHome);
      return;
    }
    const xnftSolana = window?.xnft?.solana;
    if (!xnftSolana) {
      return;
    }
    const pubkey = xnftSolana?.publicKey?.toString();
    if (!pubkey) {
      return;
    }
    if (pubkey == null) {
      console.log("Pubkey not found");
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
    const auth = getAuth(firestoreData?.firestore?.app);
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

  return (
    <AnimatedPage>
      <OverlayWrapper className="bg-bg3 overflow-hidden">
        <AlertDialog
          title="Enter Fullscreen?"
          dialogOpen={fullScreenDialogOpen}
          closeDialog={closeFullScreenDialog}
          acceptFunction={enterFullScreen}
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
                [muiTheme.breakpoints.up("md")]: { minWidth: "500px", py: "18px" }
              }}
              onClick={() => {
                handleEnterClick().catch((error) => {
                  console.log(error);
                });
              }}
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
          </div>
        </div>
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full bg-bg3">
            <Loading />
          </div>
        )}
      </OverlayWrapper>
    </AnimatedPage>
  );
}
