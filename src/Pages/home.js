import { useEffect, useState } from "react";
import React from "react";
import Web3 from "web3";
import Send from "./SendPage";
import mimabi from "../mimabi";
import binanceAbi from "../binance";
import ChainSelector from "./ChainSelector";
import { bnbchain, ethchain, dogechain } from "./ChainSelector";
import Meniu from "./Navigate";
import CheckUser from "./CheckUser";
import { ethchainTokens, bnbchainTokens, dogechainTokens } from "./tokens";
import TokenList from "./TokenList";
import NativeChainValue from "./NativeChainValue";
import { Box, Typography, Button, Container } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { ContentCopy } from "@mui/icons-material";
import { Grid, useMediaQuery } from "@mui/material";
//import ImportToken from "./import";
const CenterBox = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    minWidth: "54vw",
    width: "100%", // Full width on small screens
  },
  [theme.breakpoints.up("md")]: {
    minWidth: "50vw", // 50% of the viewport width on larger screens
    fontSize: "2rem",
  },
}));

const TypographyTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "",
  textAlign: "center",
  marginTop: "12px",
  marginBottom: "12px",
  [theme.breakpoints.up("600")]: {
    fontSize: "2rem",
  },
}));

export default function Home() {
  const [selectedChain, setSelectedChain] = useState(ethchain);
  const [web3, setWeb3] = useState(
    new Web3(new Web3.providers.HttpProvider(ethchain))
  );
  const [userWallet, setUserWallet] = useState(null);
  const [tokenBalances, setTokenBalances] = useState({});
  const [ethBalance, setEthBalance] = useState(0);
  const privateKey = localStorage.getItem("pkey");
  const [showSendPopup, setShowSendPopup] = useState(false);
  const { address } = userWallet || {};
  const [selectedToken, setSelectedToken] = useState("ETH");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  let tokens;
  if (selectedChain === ethchain) {
    tokens = ethchainTokens;
  } else if (selectedChain === bnbchain) {
    tokens = bnbchainTokens;
  } else if (selectedChain === dogechain) {
    tokens = dogechainTokens;
  } else {
    tokens = [];
  }
  useEffect(() => {
    setWeb3(new Web3(new Web3.providers.HttpProvider(selectedChain)));
  }, [selectedChain]);
  useEffect(() => {
    const fetchTokenBalances = async () => {
      if (userWallet) {
        const balances = { ...tokenBalances };

        for (const token of tokens) {
          const { symbol, address, abi } = token;
          const tokenContract = new web3.eth.Contract(abi, address);
          const balance = await tokenContract.methods
            .balanceOf(userWallet.address)
            .call();
          const balanceInToken = web3.utils.fromWei(balance, "ether");
          const updatedTokenBalance = { address, balance: balanceInToken };
          updatedTokenBalance.name = symbol;
          balances[symbol] = updatedTokenBalance;
        }

        setTokenBalances(balances);
      }
    };
    fetchTokenBalances();
  }, [userWallet, web3]);
  useEffect(() => {
    const fetchBalance = async () => {
      if (userWallet) {
        const balance = await web3.eth.getBalance(userWallet.address);
        const balanceInEth = web3.utils.fromWei(balance, "ether");
        setEthBalance(balanceInEth);
      }
    };
    fetchBalance();
  }, [userWallet, web3, address]);
  useEffect(() => {
    if (privateKey) {
      const account = web3.eth.accounts.wallet.add(privateKey);
      setUserWallet(account);
    }
  }, [privateKey, web3]);

  function copyAddress(address) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(address)
        .then(() => {
          const copyMessage = document.getElementById("copyMessage");
          copyMessage.textContent = "Address copied!";
          setTimeout(() => {
            copyMessage.textContent = "";
          }, 1000);
        })
        .catch((error) => {
          console.error("Error copying address:", error);
        });
    }
  }
  function handleTokenClick(tokenSymbol) {
    setSelectedToken(tokenSymbol);
    setShowSendPopup(true);
  }
  const handleChainChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedChain(selectedValue);
  };
  if (!userWallet) {
    return <CheckUser />;
  }
  const shortenedAddress = `${userWallet.address.substring(
    0,
    5
  )}...${userWallet.address.substring(userWallet.address.length - 4)}`;
  return (
    <Grid
      sx={{ backgroundColor: "#24272a" }}
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <CenterBox item xs={12} sm={6} md={4} lg={3}>
        <Box
          className="nav"
          sx={{
            height: "100px",
            display: "flex",
            justifyContent: "space-between",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.5)",
          }}
        >
          <ChainSelector
            selectedChain={selectedChain}
            handleChainChange={handleChainChange}
            bnbchain={bnbchain}
            ethchain={ethchain}
            dogechain={dogechain}
          />
          <CenterBox>
            <Button
              onClick={() => copyAddress(userWallet.address)}
              endIcon={<ContentCopy />}
            >
              {shortenedAddress}
            </Button>
            <Typography id="copyMessage"></Typography>
          </CenterBox>
          <Meniu />
        </Box>
        <Box sx={{ width: "100%" }}>
          <TypographyTitle variant="h5">
            {Number(ethBalance).toFixed(4)}{" "}
            {selectedChain === ethchain
              ? "ETH"
              : selectedChain === bnbchain
              ? "BNB"
              : "DOGE"}
          </TypographyTitle>
        </Box>
        <CenterBox>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowSendPopup(true)}
            >
              Send
            </Button>
          </Box>
          <TypographyTitle>Tokens</TypographyTitle>
        </CenterBox>
        <TokenList
          userWallet={userWallet}
          web3={web3}
          selectedChain={selectedChain}
          ethchain={ethchain}
          bnbchain={bnbchain}
          dogechain={dogechain}
          ethBalance={ethBalance}
          handleTokenClick={handleTokenClick}
        />

        {showSendPopup && (
          <CenterBox>
            <Send
              onClose={() => setShowSendPopup(false)}
              selectedToken={selectedToken}
              selectedChain={selectedChain}
            />
          </CenterBox>
        )}
      </CenterBox>
    </Grid>
  );
}
//<ImportToken />
