import React, { useEffect, useState, useCallback } from "react";
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
import CheckUser from "../components/CheckUser/CheckUser";
import { Grid } from "@mui/material";
import TokenImport from "../components/TokenImport";
import { CenterBox, CenterBoxHome } from "../hooks/styles";
import useWeb3 from "../hooks/useWeb3";
import { useTokenImportHandler } from "../hooks/tokenImportHandler";
import NavBar from "../components/Navbar";
import Balance from "../components/Balance";
import Actions from "./Actions";
import LoginWallet from "../components/loginwallet";
import TokenSection from "../components/TokenSection";
import Receive from "../components/receive";
import { useTheme } from "@mui/material/styles";
import useLoading from "../hooks/useLoading";
import { useChainLogic } from "../hooks/useChainLogic";
import { useWalletLogic } from "../hooks/useWalletLogic";
import "./home.css";
export default function Home() {
  const { importedTokens, setImportedTokens, privateKey } = useWeb3(bnbchain);
  const { selectedChain, web3, handleChainChange } = useChainLogic(bnbchain);
  const { userWallet, ethBalance } = useWalletLogic(web3, privateKey);
  const [isLoading, setIsLoading, LoadingIndicator] = useLoading(true, 50);
  const [currentPopup, setCurrentPopup] = useState(null);
  const [selectedToken, setSelectedToken] = useState(
    getDefaultTokenForChain(selectedChain)
  );
  const theme = useTheme();

  useEffect(() => {
    setSelectedToken(
      getDefaultTokenForChain(getChainNameFromUrl(selectedChain))
    );
  }, [selectedChain]);

  const onTokenImport = useTokenImportHandler(
    importedTokens,
    setImportedTokens,
    selectedChain
  );

  const handleTokenClick = useCallback(
    (tokenSymbol) => {
      setSelectedToken(tokenSymbol);
      setCurrentPopup("send");
    },
    [setSelectedToken]
  );

  if (isLoading) {
    console.log("Loading");
    return <LoadingIndicator />;
  }
  if (!userWallet) {
    return <CheckUser />;
  }
  return (
    <div
      className="gridHome"
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <CenterBoxHome className="inHome" item xs={12} sm={6} md={4} lg={3}>
        <LoadingIndicator />

        <NavBar
          selectedChain={selectedChain}
          handleChainChange={handleChainChange}
          userWallet={userWallet}
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
          onSendClick={() => setCurrentPopup("send")}
          onImportClick={() => setCurrentPopup("import")}
          onReceiveClick={() => setCurrentPopup("receive")}
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
        {currentPopup === "import" && (
          <CenterBox>
            <TokenImport
              onClose={() => setCurrentPopup(null)}
              onTokenImport={onTokenImport}
              selectedChain={selectedChain}
            />
          </CenterBox>
        )}

        {currentPopup === "send" && (
          <CenterBox>
            <Send
              onClose={() => setCurrentPopup(null)}
              selectedToken={selectedToken}
              selectedChain={selectedChain}
            />
          </CenterBox>
        )}
        {currentPopup === "receive" && (
          <CenterBox>
            <Receive
              onClose={() => setCurrentPopup(null)}
              userWallet={userWallet}
            />
          </CenterBox>
        )}
        {currentPopup === "login" && (
          <CenterBox>
            <LoginWallet
              onClose={() => setCurrentPopup(null)}
              userWallet={userWallet}
            />
          </CenterBox>
        )}
      </CenterBoxHome>
    </div>
  );
}
