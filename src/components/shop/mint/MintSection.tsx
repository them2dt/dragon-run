import React, { useEffect, useMemo, useState } from "react";
import { useTheme, Grid, Card, Typography, Zoom, Box, Stack } from "@mui/material";
import axios from "axios";
import {
  type CandyMachine,
  type DefaultCandyGuardSettings,
  Metaplex,
  walletAdapterIdentity
} from "@metaplex-foundation/js";
import { PublicKey } from "@solana/web3.js";
import { useConnection } from "@solana/wallet-adapter-react";

import loading from "@assets/loading.gif";
import { useWallet } from "../../../hooks/useWallet";
import unrevealed from "@assets/Knights_unrevealed.gif";

interface MintSectionProps {
  active: boolean;
  scrollToTop: () => void;
}

export default function MintSection({ active, scrollToTop }: MintSectionProps) {
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

  const [candyMachine, setCandyMachine] = useState<CandyMachine<DefaultCandyGuardSettings>>();
  //
  const muiTheme = useTheme();
  const wallet = useWallet();
  const { connection } = useConnection();
  const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet));
  //
  // function to print out the wallet, which is being used at the moment
  const logWallet = () => {
    if (wallet.publicKey) {
      console.log("Using Wallet: " + wallet.publicKey.toBase58());
    } else {
      console.log("Wallet couldn't be found.");
    }
  };
  // function to fetch the candy machine
  const getCandyMachine = async () => {
    const cm = await metaplex.candyMachines().findByAddress({ address: new PublicKey(import.meta.env.VITE_CM) });

    setCandyMachine(cm);
  };
  // function to execute the mint
  const executeMint = async () => {
    console.log("launching mint-process...");

    setIsLoading(true);
    const cm = await metaplex.candyMachines().findByAddress({ address: new PublicKey(import.meta.env.VITE_CM) });

    const mintBuilder = await metaplex
      .candyMachines()
      .builders()
      .mint({
        candyMachine: cm,
        collectionUpdateAuthority: new PublicKey("teachcUD4nENDLkGynmFnPNcupXMRmwSUJBtCK5QVoc")
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
  // function to the metadata from an NFT
  const fetchMetadata = async () => {
    if (minted) {
      const nft = await metaplex.nfts().findByToken({ token: new PublicKey(mintResult ?? "") });
      const { data } = await axios.get(nft.uri);
      setMetadata(data);
      console.log(data);
    }
  };
  useMemo(() => {
    scrollToTop();
  }, [minted, mintFailed, isLoading]);
  //
  useEffect(() => {
    logWallet();
    getCandyMachine().catch((e) => {
      console.log(e);
    });
  }, []);
  //
  useEffect(() => {
    fetchMetadata().catch((e) => {
      console.log(e);
    });
  }, [minted]);
  return (
    <Zoom in={active} style={{ transitionDelay: active ? "200ms" : "0ms" }} unmountOnExit>
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
            mx: "auto"
          }
        }}
      >
        {!isLoading && !minted && !mintFailed && (
          <Zoom in={active} style={{ transitionDelay: active ? "200ms" : "0ms" }} unmountOnExit>
            <Grid
              component={Box}
              item
              xs={10}
              md={6}
              lg={4}
              sx={{
                alignItems: "center",
                justifyContent: "center",
                width: 1,
                mt: 6
              }}
            >
              <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
                <Card elevation={18} sx={{ borderRadius: "0", width: "100%" }}>
                  <img
                    src={unrevealed}
                    style={{
                      width: "100%",
                      borderRadius: "0"
                    }}
                  />
                </Card>
              </Stack>
              <Stack direction="column" spacing={0.3} sx={{ justifyContent: "center" }} style={{ marginTop: "16px" }}>
                <Typography variant="h5" textAlign={"center"} width={1} color={"white"} noWrap>
                  1 SOL
                </Typography>
                <Typography variant="h5" textAlign={"center"} width={1} color={"white"} noWrap>
                  {candyMachine?.itemsMinted.toNumber()}/{candyMachine?.itemsLoaded}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
                <button
                  style={{
                    width: "100%",
                    marginTop: "20px",
                    padding: "10px",
                    backgroundColor: "#ff3c00",
                    borderRadius: "0"
                  }}
                  onClick={() => {
                    executeMint().catch((e) => {
                      console.log(e);
                      setMintFailed(true);
                    });
                  }}
                >
                  <Typography variant="h4" color={"white"}>
                    Mint
                  </Typography>
                </button>
              </Stack>
              <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
                <Typography
                  variant="body1"
                  color={"white"}
                  style={{
                    width: "100%",
                    textAlign: "center",
                    marginTop: "30px"
                  }}
                >
                  Be the hero of your own story.
                  <br />
                  <br />
                  Emptea Knights is a collection of 2000 brave knights, forged to achieve greatness.
                </Typography>
              </Stack>
            </Grid>
          </Zoom>
        )}

        {isLoading && !minted && !mintFailed && (
          <Zoom in={active} style={{ transitionDelay: active ? "200ms" : "0ms" }} unmountOnExit>
            <Grid
              component={Box}
              item
              xs={10}
              md={6}
              lg={4}
              sx={{
                alignItems: "center",
                justifyContent: "center",
                width: 1
              }}
            >
              <Stack direction="column" spacing={4} sx={{ justifyContent: "center" }}>
                <img
                  src={loading}
                  style={{
                    width: "100%",
                    borderRadius: "0"
                  }}
                />
                <Typography variant="h4" textAlign={"center"} color={"white"}>
                  loading...
                </Typography>
              </Stack>
            </Grid>
          </Zoom>
        )}
        {minted && (
          <Zoom in={active} style={{ transitionDelay: active ? "200ms" : "0ms" }} unmountOnExit>
            <Grid
              component={Box}
              item
              xs={8}
              md={6}
              lg={4}
              sx={{
                alignItems: "center",
                justifyContent: "center",
                my: 4,
                width: 1
              }}
            >
              <Stack direction="column" spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
                <img
                  src={metadata?.image ?? unrevealed}
                  style={{
                    width: "100%",
                    borderRadius: "0"
                  }}
                />
                <Typography variant="h5" color={"white"} style={{ textAlign: "center" }}>
                  {metadata?.name ?? ""} Minted successfully!
                </Typography>
                <button
                  style={{
                    padding: "10px",
                    backgroundColor: "#ff3c00",
                    borderRadius: "0",
                    width: "100%"
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
          </Zoom>
        )}
        {mintFailed && (
          <Zoom in={active} style={{ transitionDelay: active ? "200ms" : "0ms" }} unmountOnExit>
            <Grid
              component={Box}
              item
              xs={8}
              md={6}
              lg={4}
              sx={{
                alignItems: "center",
                justifyContent: "center",
                my: 4,
                width: 1
              }}
            >
              <Stack
                direction="column"
                spacing={4}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}
              >
                <Typography variant="h4" textAlign={"center"} color={"white"}>
                  Minting failed.
                </Typography>
                <button
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#ff3c00",
                    borderRadius: "0"
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
          </Zoom>
        )}
      </Grid>
    </Zoom>
  );
}
