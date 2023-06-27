import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  useTheme,
  Grid,
  Card,
  Typography,
  Zoom,
  Box,
  Stack,
} from "@mui/material";
//web3
import axios from "axios";
import {
  CandyMachine,
  DefaultCandyGuardSettings,
  Metaplex,
  walletAdapterIdentity,
} from "@metaplex-foundation/js";
import { PublicKey, Connection } from "@solana/web3.js";
import { useConnection } from "@solana/wallet-adapter-react";

import loading from "@assets/loading.gif";
import { useWallet } from "../../../hooks/useWallet";
import unrevealed from "@assets/Knights_unrevealed.gif";

interface MintSectionProps {
  active: boolean;
  goToShop: () => void;
}

export default function MintSection({ active, goToShop }: MintSectionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [minted, setMinted] = useState(false);
  const [mintFailed, setMintFailed] = useState(false);
  const [metadata, setMetadata] = useState<{
    attributes: any[];
    description: string;
    external_url: string;
    image: "string";
    name: string;
    properties: { files: any[]; category: string; creators: any[] };
    seller_fee_basis_points: number;
    symbol: "TEA";
  }>();
  const [mintResult, setMintResult] = useState<PublicKey>();

  const [candyMachine, setCandyMachine] =
    useState<CandyMachine<DefaultCandyGuardSettings>>();
  //
  const muiTheme = useTheme();
  const wallet = useWallet();
  const { connection } = useConnection();
  const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet));
  //
  //function to print out the wallet, which is being used at the moment
  const logWallet = () => {
    if (wallet.publicKey) {
      console.log("Using Wallet: " + wallet.publicKey.toBase58());
    } else {
      console.log("Wallet couldn't be found.");
    }
  };
  //function to fetch the candy machine
  const getCandyMachine = async () => {
    const cm = await metaplex
      .candyMachines()
      .findByAddress({ address: new PublicKey(import.meta.env.VITE_CM) });

    setCandyMachine(cm);
  };
  //function to execute the mint
  const executeMint = async () => {
    console.log("launching mint-process...");

    setIsLoading(true);
    const cm = await metaplex
      .candyMachines()
      .findByAddress({ address: new PublicKey(import.meta.env.VITE_CM) });

    const mintBuilder = await metaplex
      .candyMachines()
      .builders()
      .mint({
        candyMachine: cm,
        collectionUpdateAuthority: new PublicKey(
          "teachcUD4nENDLkGynmFnPNcupXMRmwSUJBtCK5QVoc"
        ),
      });

    try {
      await mintBuilder.sendAndConfirm(metaplex).then((res) => {
        setMintResult(res.tokenAddress);
        setMinted(true);
      });
      console.log("Minted successfully.");
    } catch (e) {
      setMintFailed(true);
      console.log("Mint Failed.");
    }
  };
  //function to the metadata from an NFT
  const fetchMetadata = async () => {
    if (minted) {
      const nft = await metaplex
        .nfts()
        .findByToken({ token: new PublicKey(mintResult || "") });
      const { data } = await axios.get(nft.uri);
      setMetadata(data);
      console.log(data);
    }
  };
  //
  useEffect(() => {
    logWallet();
    getCandyMachine();
  }, []);
  //
  useEffect(() => {
    fetchMetadata();
  }, [minted]);
  return (
    <Zoom
      in={active}
      style={{ transitionDelay: active ? "200ms" : "0ms" }}
      unmountOnExit
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        component={Card}
        elevation={0}
        sx={{
          mx: "auto",
          mb: 10,
          [muiTheme.breakpoints.up("xl")]: {
            mt: 6,
            mb: 16,
            maxWidth: 1300,
            mx: "auto",
          },
        }}
      >
        {!isLoading && !minted && !mintFailed && (
          <Grid
            component={Box}
            item
            xs={12}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              width: 1,
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "center" }}
            >
              <img
                src={unrevealed}
                style={{
                  width: "50vw",
                  borderRadius: "20px",
                }}
              />
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "center" }}
              style={{ marginTop: "10px" }}
            >
              <Typography variant="h5" color={"white"}>
                5 SOL
              </Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "center" }}
              style={{ marginTop: "10px" }}
            >
              <Typography variant="h5" color={"white"}>
                {candyMachine?.itemsMinted.toNumber()}/
                {candyMachine?.itemsLoaded}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "center" }}
            >
              <button
                style={{
                  width: "50vw",
                  marginTop: "10px",
                  padding: "10px",
                  backgroundColor: "#ff3c00",
                  borderRadius: "20px",
                }}
                onClick={executeMint}
              >
                <Typography variant="h4" color={"white"}>
                  Mint
                </Typography>
              </button>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "center" }}
            >
              <Typography
                variant="body1"
                color={"white"}
                style={{
                  width: "60vw",
                  textAlign: "center",
                  marginTop: "40px",
                }}
              >
                Be the hero of your own story.
                <br />
                <br />
                Emptea Knights is a collection of 2000 brave knights, forged to
                achieve greatness.
              </Typography>
            </Stack>
          </Grid>
        )}
        {isLoading && !minted && !mintFailed && (
          <Grid
            component={Box}
            item
            xs={12}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              width: 1,
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "center" }}
            >
              <img
                src={loading}
                style={{
                  width: "50vw",
                  borderRadius: "20px",
                }}
              />
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "center" }}
              style={{ marginTop: "10px" }}
            >
              <Typography variant="h5" color={"white"}>
                loading...
              </Typography>
            </Stack>
          </Grid>
        )}
        {minted && (
          <Grid
            component={Box}
            item
            xs={12}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              width: 1,
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "center" }}
            >
              <img
                src={
                  metadata?.image ||
                  unrevealed
                }
                style={{
                  width: "50vw",
                  borderRadius: "20px",
                }}
              />
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "center" }}
            >
              <Typography variant="h5" color={"white"} style={{textAlign:"center",marginTop:"10px"}}>
                {metadata?.name || ""} Minted successfully!
              </Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "center" }}
            >
              <button
                style={{
                  width: "50vw",
                  marginTop: "10px",
                  padding: "10px",
                  backgroundColor: "#ff3c00",
                  borderRadius: "20px",
                }}
                onClick={() => {
                  setIsLoading(false);
                  setMinted(false);
                  setMintFailed(false);
                }}
              >
                <Typography variant="h4" color={"white"}>
                  close
                </Typography>
              </button>
            </Stack>
          </Grid>
        )}
        {mintFailed && (
          <Grid
            component={Box}
            item
            xs={12}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              width: 1,
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "center" }}
            >
              <Typography variant="h5" color={"white"}>
                Minting failed.
              </Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "center" }}
            >
              <button
                style={{
                  width: "50vw",
                  marginTop: "10px",
                  padding: "10px",
                  backgroundColor: "#ff3c00",
                  borderRadius: "20px",
                }}
                onClick={() => {
                  setIsLoading(false);
                  setMinted(false);
                  setMintFailed(false);
                }}
              >
                <Typography variant="h4" color={"white"}>
                  close
                </Typography>
              </button>
            </Stack>
          </Grid>
        )}
      </Grid>
    </Zoom>
  );
}
