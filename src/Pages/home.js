import React, { useEffect, useState, useCallback } from "react";
import Web3 from "web3";
import Send from "./SendPage";
import { bnbchain, ethchain, dogechain } from "./utils";
import CheckUser from "./CheckUser";
import { Grid } from "@mui/material";
import TokenImport from "./TokenImport";
import { CenterBox } from "./styles";
import useWeb3 from "./useWeb3"; // import the custom hook
import { useTokenImportHandler } from "./tokenImportHandler";
import NavBar from "./Navbar";
import Balance from "./Balance";
import Actions from "./Actions";
import TokenSection from "./TokenSection";
import { handleAsyncError } from "./errorHandler";

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
  } = useWeb3(bnbchain);
  const [error, setError] = useState(null);
  const privateKey = localStorage.getItem("pkey");
  const [showSendPopup, setShowSendPopup] = useState(false);
  const [selectedToken, setSelectedToken] = useState("");
  const [showImportForm, setShowImportForm] = useState(false);
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

  if (!userWallet) {
    return <CheckUser />;
  }

  return (
    <Grid
      sx={{ backgroundColor: "#24272a" }}
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <CenterBox item xs={12} sm={6} md={4} lg={3}>
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
        />
        <Actions
          onSendClick={() => setShowSendPopup(true)}
          onImportClick={() => setShowImportForm(true)}
        />
        {/** */}
        <TokenSection
          userWallet={userWallet}
          web3={web3}
          selectedChain={selectedChain}
          ethchain={ethchain}
          bnbchain={bnbchain}
          dogechain={dogechain}
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
      </CenterBox>
    </Grid>
  );
}
