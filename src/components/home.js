import React, { useEffect, useState, useCallback } from "react";
import Web3 from "web3";
import Send from "../transfer/SendPage";
import {
  bnbchain,
  ethchain,
  dogechain,
  polychain,
  arbitrumchain,
  getDefaultTokenForChain,
  getChainNameFromUrl,
} from "../hooks/utils";
import CheckUser from "./CheckUser";
import { Grid, CircularProgress, Box } from "@mui/material";
import TokenImport from "./TokenImport";
import { CenterBox, CenterBoxHome } from "../hooks/styles";
import useWeb3 from "../hooks/useWeb3";
import { useTokenImportHandler } from "../hooks/tokenImportHandler";
import NavBar from "./Navbar";
import Balance from "./Balance";
import Actions from "./Actions";
import LoginWallet from "./loginwallet";
import TokenSection from "./TokenSection";
import { handleAsyncError } from "../hooks/errorHandler";
import Receive from "./receive";
import Backdrop from "@mui/material/Backdrop";
import { useTheme } from "@mui/material/styles";
import useLoading from "../hooks/useLoading";

export default function Home() {
  const {
    web3,
    setWeb3,
    selectedChain,
    setSelectedChain,
    userWallet,
    setUserWallet,
    ethBalance,
    setEthBalance,
    importedTokens,
    setImportedTokens,
    privateKey,
  } = useWeb3(bnbchain);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading, LoadingIndicator] = useLoading(true, 1000);
  const [showSendPopup, setShowSendPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showReceivePopup, setShowReceivePopup] = useState(false);

  const [selectedToken, setSelectedToken] = useState(
    getDefaultTokenForChain(selectedChain)
  );
  const [showImportForm, setShowImportForm] = useState(false);
  const theme = useTheme();
  useEffect(() => {
    setSelectedToken(
      getDefaultTokenForChain(getChainNameFromUrl(selectedChain))
    );
  }, [selectedChain]);

  useEffect(() => {
    if (privateKey) {
      const account = web3.eth.accounts.wallet.add(privateKey);
      setIsLoading(false);
      setUserWallet(account);
    }
  }, [privateKey, web3]);

  const onTokenImport = useTokenImportHandler(
    importedTokens,
    setImportedTokens,
    selectedChain
  );

  useEffect(() => {
    setWeb3(new Web3(new Web3.providers.HttpProvider(selectedChain)));
  }, [selectedChain, setWeb3]);

  useEffect(() => {
    const fetchBalance = async () => {
      if (userWallet) {
        const [error, balance] = await handleAsyncError(web3.eth.getBalance)(
          userWallet.address
        );
        if (error) {
          console.error("Error getting balance:", error);
          setError(error);
          return;
        }
        const balanceInEth = web3.utils.fromWei(balance, "ether");
        setEthBalance(balanceInEth);
      }
    };
    fetchBalance();
  }, [userWallet]);

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
  const handleTokenClick = useCallback(
    (tokenSymbol) => {
      setSelectedToken(tokenSymbol);
      setShowSendPopup(true);
    },
    [setSelectedToken, setShowSendPopup]
  );
  const handleChainChange = useCallback(
    (selectedValue) => {
      setSelectedChain(selectedValue);
    },
    [setSelectedChain]
  );
  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (!userWallet) {
    return <CheckUser />;
  }
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundColor: theme.palette.primary.second,
        height: "100%",
      }}
    >
      <CenterBoxHome item xs={12} sm={6} md={4} lg={3}>
        <LoadingIndicator />

        <NavBar
          selectedChain={selectedChain}
          handleChainChange={handleChainChange}
          userWallet={userWallet}
          copyAddress={copyAddress}
        />
        <Balance
          ethBalance={ethBalance}
          selectedChain={selectedChain}
          ethchain={ethchain}
          bnbchain={bnbchain}
          dogechain={dogechain}
          polychain={polychain}
          arbitrumchain={arbitrumchain}
        />
        <Actions
          onSendClick={() => setShowSendPopup(true)}
          onImportClick={() => setShowImportForm(true)}
          onReceiveClick={() => setShowReceivePopup(true)}
        />
        <TokenSection
          userWallet={userWallet}
          web3={web3}
          selectedChain={selectedChain}
          ethchain={ethchain}
          bnbchain={bnbchain}
          dogechain={dogechain}
          polychain={polychain}
          arbitrumchain={arbitrumchain}
          ethBalance={ethBalance}
          handleTokenClick={handleTokenClick}
        />
        {showImportForm && (
          <CenterBox>
            <TokenImport
              onClose={() => setShowImportForm(false)}
              onTokenImport={onTokenImport}
              selectedChain={selectedChain}
            />
          </CenterBox>
        )}

        {showSendPopup && (
          <CenterBox>
            <Send
              onClose={() => setShowSendPopup(false)}
              selectedToken={selectedToken}
              selectedChain={selectedChain}
            />
          </CenterBox>
        )}
        {showReceivePopup && (
          <CenterBox>
            <Receive
              onClose={() => setShowReceivePopup(false)}
              userWallet={userWallet}
            />
          </CenterBox>
        )}
        {showLoginPopup && (
          <CenterBox>
            <LoginWallet
              onClose={() => setShowLoginPopup(false)}
              userWallet={userWallet}
            />
          </CenterBox>
        )}
      </CenterBoxHome>
    </Grid>
  );
}
