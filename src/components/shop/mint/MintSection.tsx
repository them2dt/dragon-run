import React, { useEffect, useMemo, useState } from "react";
import { useTheme, Grid, Card, Typography, Zoom, Box, Stack } from "@mui/material";
import axios from "axios";
import { type CandyMachine, type DefaultCandyGuardSettings } from "@metaplex-foundation/js";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import loading from "@assets/loading.gif";
import { useWallet } from "../../../hooks/useWallet";
import unrevealed from "@assets/Knights_unrevealed.gif";
import { SquareButton } from "components/styled/SquareButton";
import { useSolana } from "@context/useSolana";

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
  const [balance, setBalance] = useState<number>(0);
  const [mintPrice, setMintPrice] = useState<number>(2);
  const [mintDisabled, setMintDisabled] = useState(false);
  const [warningText, setWarningText] = useState("");
  const [amountMinted, setAmountMinted] = useState<string>("????/3000");

  const { solana, solanaFunctions } = useSolana();
  const muiTheme = useTheme();
  const wallet = useWallet();
  const metaplex = solana.metaplex;
  const solanaPublicKey = solana.publicKey;

  const getBalance = async () => {
    const xnftSolana = window?.xnft?.solana;
    if (!xnftSolana) {
      return;
    }
    const connection = xnftSolana?.connection;
    if (!connection) {
      return;
    }
    const balance = await connection.getBalance(solanaPublicKey);
    setBalance(balance / LAMPORTS_PER_SOL);
  };

  const getMintPrice = async () => {
    const cmMintPrice = candyMachine?.candyGuard?.guards?.solPayment?.amount?.basisPoints;
    console.log("mintPrice: " + cmMintPrice);
    if (cmMintPrice) {
      setMintPrice((cmMintPrice as unknown as number) / LAMPORTS_PER_SOL);
    }
  };

  const getAmountMinted = async () => {
    const minted = candyMachine?.itemsMinted.toNumber();
    const max = candyMachine?.itemsLoaded;
    if (minted !== undefined && max !== undefined) {
      setAmountMinted(minted + "/" + max);
    }
  };

  // function to print out the wallet, which is being used at the moment
  const logWallet = () => {
    if (solana.publicKey) {
      console.log("Using Wallet: " + wallet.publicKey.toBase58());
    } else {
      console.log("Wallet couldn't be found.");
    }
  };
  // function to fetch the candy machine
  const getCandyMachine = async () => {
    if (!metaplex) {
      throw new Error("Metaplex not found");
    }
    const cm = await metaplex.candyMachines().findByAddress({ address: new PublicKey(import.meta.env.VITE_CM) });

    setCandyMachine(cm);
  };
  // function to execute the mint
  const executeMint = async () => {
    console.log("launching mint-process...");

    if (balance < mintPrice) {
      throw new Error("Not enough Sol");
    }

    setIsLoading(true);

    if (!candyMachine) {
      setMintFailed(true);
      throw new Error("Candy Machine not found");
    }

    if (!metaplex) {
      setMintFailed(true);
      throw new Error("Metaplex not found");
    }

    const mintBuilder = await metaplex
      .candyMachines()
      .builders()
      .mint({
        candyMachine,
        collectionUpdateAuthority: new PublicKey("tea5csx62GtMfevNPVNZ1saG1kc8Z8W58mEkPxxLXjm")
      });

    try {
      await mintBuilder.sendAndConfirm(metaplex).then((res) => {
        setMintResult(res.tokenAddress);
        setMinted(true);
      });
      console.log("Minted successfully.");
      getBalance().catch((e) => {
        console.log(e);
      });
    } catch (e) {
      setMintFailed(true);
      console.log("Mint Failed: " + e);
      getBalance().catch((e) => {
        console.log(e);
      });
    }
  };
  // function to the metadata from an NFT
  const fetchMetadata = async () => {
    if (!metaplex) {
      throw new Error("Metaplex not found");
    }
    if (minted) {
      const nft = await metaplex.nfts().findByToken({ token: new PublicKey(mintResult ?? "") });
      const { data } = await axios.get(nft.uri);
      setMetadata(data);
      console.log(data);
    }
  };

  useEffect(() => {
    scrollToTop();
  }, [minted, mintFailed, isLoading, active]);

  useEffect(() => {
    logWallet();
  }, [active]);

  useEffect(() => {
    getCandyMachine().catch((e) => {
      console.log(e);
    });
  }, [wallet, minted, mintFailed, active]);

  useEffect(() => {
    fetchMetadata().catch((e) => {
      console.log(e);
    });
    solanaFunctions.getOwnedKnights().catch((e) => {
      console.log(e);
    });
  }, [minted]);

  useMemo(() => {
    getMintPrice().catch((e) => {
      console.log(e);
    });
    getAmountMinted().catch((e) => {
      console.log(e);
    });
  }, [candyMachine]);

  useEffect(() => {
    getBalance().catch((e) => {
      console.log(e);
    });
  }, [wallet, minted, mintFailed]);

  useEffect(() => {
    if (balance < mintPrice) {
      setMintDisabled(true);
      setWarningText("You need more SOL!");
    } else {
      if (mintDisabled) {
        setMintDisabled(false);
      }
    }
  }, [balance, mintPrice]);

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
                  {mintPrice} Sol
                </Typography>
                <Typography variant="h5" textAlign={"center"} width={1} color={"white"} noWrap>
                  {amountMinted}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
                <SquareButton
                  disabled={mintDisabled}
                  sx={{
                    width: "100%",
                    marginTop: "20px",
                    padding: "10px",
                    backgroundColor: muiTheme.palette.secondary.main,
                    "&:hover": {
                      backgroundColor: muiTheme.palette.text.secondary,
                      color: muiTheme.palette.secondary.main
                    }
                  }}
                  onClick={() => {
                    executeMint().catch((e) => {
                      console.log(e);
                      setMintFailed(true);
                    });
                  }}
                >
                  <Typography variant="h4">Mint</Typography>
                </SquareButton>
              </Stack>
              <Stack direction="column" spacing={2} sx={{ justifyContent: "center" }}>
                {mintDisabled && (
                  <Typography
                    variant="h4"
                    style={{
                      width: "100%",
                      textAlign: "center",
                      marginTop: "30px",
                      color: muiTheme.palette.secondary.main
                    }}
                  >
                    {warningText}
                  </Typography>
                )}
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
                  Emptea Knights is a collection of 3000 brave knights, forged to achieve greatness.
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
                <SquareButton
                  sx={{
                    padding: "10px",
                    borderRadius: "0",
                    width: "100%",
                    backgroundColor: muiTheme.palette.secondary.main,
                    "&:hover": {
                      backgroundColor: muiTheme.palette.text.secondary,
                      color: muiTheme.palette.secondary.main
                    }
                  }}
                  onClick={() => {
                    setIsLoading(false);
                    setMinted(false);
                    setMintFailed(false);
                  }}
                >
                  <Typography variant="h4">close</Typography>
                </SquareButton>
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
                <SquareButton
                  sx={{
                    padding: "10px",
                    borderRadius: "0",
                    width: "100%",
                    backgroundColor: muiTheme.palette.secondary.main,
                    "&:hover": {
                      backgroundColor: muiTheme.palette.text.secondary,
                      color: muiTheme.palette.secondary.main
                    }
                  }}
                  onClick={() => {
                    setIsLoading(false);
                    setMinted(false);
                    setMintFailed(false);
                  }}
                >
                  <Typography variant="h4">close</Typography>
                </SquareButton>
              </Stack>
            </Grid>
          </Zoom>
        )}
      </Grid>
    </Zoom>
  );
}
