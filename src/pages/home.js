import React, { useEffect, useState, useCallback } from "react";
import Send from "../transfer/SendPage";
import {
  bnbchain,
  ethchain,
  dogechain,
  polychain,
  arbitrumchain,
  goerlichain,
  sepoliachain,
  getDefaultTokenForChain,
  getChainNameFromUrl,
} from "../hooks/utils";
import CheckUser from "../components/CheckUser/CheckUser";
import TokenImport from "../components/TokenImport";
import { CenterBox, CenterBoxHome } from "../hooks/styles";
import useWeb3 from "../hooks/useWeb3";
import { useTokenImportHandler } from "../hooks/tokenImportHandler";
import NavBar from "../components/Navbar";
import Balance from "../components/Balance";
import Actions from "./Actions";
import LoginWallet from "../components/Login/loginwallet";
import TokenSection from "../components/TokenSection";
import TokenList from "../components/TokenList";
import Receive from "../components/receive";
import useLoading from "../hooks/useLoading";
import { useChainLogic } from "../hooks/useChainLogic";
import { useWalletLogic } from "../hooks/useWalletLogic";
import Settings from "../components/settings";
import ChainSelectorUi from "../components/ChainSelector/ChainSelectorUi";
import ChainSelector from "../hooks/ChainSelector";
import "./home.css";
import Meniu from "../components/Navigate";

export default function Home() {
  const { importedTokens, setImportedTokens, privateKey } = useWeb3(bnbchain);
  const { selectedChain, web3, handleChainChange } = useChainLogic(bnbchain);
  const { userWallet, ethBalance } = useWalletLogic(web3, privateKey);
  const [isLoading, setIsLoading, LoadingIndicator] = useLoading(true, 50);
  const [currentPopup, setCurrentPopup] = useState(null);
  const [selectedTokenBalance, setSelectedTokenBalance] = useState(null);
  const [nativeTokenBalance, setNativeTokenBalance] = useState({});

  const [selectedToken, setSelectedToken] = useState(
    getDefaultTokenForChain(selectedChain)
  );

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
  const handleTokenBalanceClick = (tokenBalance) => {
    if (tokenBalance.isNative) {
      // Este balanța pentru tokenul nativ
      setNativeTokenBalance(tokenBalance);
    } else {
      // Este balanța pentru un alt token non-native
      setSelectedTokenBalance(tokenBalance);
    }
    setCurrentPopup("send");
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (!userWallet) {
    return <CheckUser />;
  }
  return (
    <div className="home-container">
      <div className="home-container">
        <LoadingIndicator />
        <div className="menu-settings-chain-selector-btn-home">
          <Meniu />
          <ChainSelector
            selectedChain={selectedChain}
            handleChainChange={handleChainChange}
          />
        </div>

        <NavBar
          selectedChain={selectedChain}
          handleChainChange={handleChainChange}
          userWallet={userWallet}
          //-nav
          ethBalance={ethBalance}
          ethchain={ethchain}
          bnbchain={bnbchain}
          dogechain={dogechain}
          polychain={polychain}
          arbitrumchain={arbitrumchain}
          goerlichain={goerlichain}
          sepoliachain={sepoliachain}
        />
        <TokenList
          userWallet={userWallet}
          web3={web3}
          selectedChain={selectedChain}
          ethchain={ethchain}
          bnbchain={bnbchain}
          dogechain={dogechain}
          polychain={polychain}
          arbitrumchain={arbitrumchain}
          goerlichain={goerlichain}
          sepoliachain={sepoliachain}
          ethBalance={ethBalance}
          handleTokenClick={handleTokenClick}
          onTokenBalanceClick={handleTokenBalanceClick} // Adaugă prop-ul pentru transmiterea datelor
        />
        <Actions
          onSendClick={() => setCurrentPopup("send")}
          onImportClick={() => setCurrentPopup("import")}
          onReceiveClick={() => setCurrentPopup("receive")}
        />

        {currentPopup === "import" && (
          <div>
            <TokenImport
              onClose={() => setCurrentPopup(null)}
              onTokenImport={onTokenImport}
              selectedChain={selectedChain}
            />
          </div>
        )}

        {currentPopup === "send" && (
          <div>
            <Send
              onClose={() => {
                setCurrentPopup(null);
                // Resetează starea pentru tokenBalance după închiderea Send
                setSelectedTokenBalance(null);
              }}
              selectedToken={selectedToken}
              selectedChain={selectedChain}
              selectedTokenBalance={selectedTokenBalance} // Transmitere date către Send
              ethBalance={ethBalance}
            />
          </div>
        )}
        {currentPopup === "receive" && (
          <div>
            <Receive
              onClose={() => setCurrentPopup(null)}
              userWallet={userWallet}
            />
          </div>
        )}

        {currentPopup === "login" && (
          <div>
            <LoginWallet
              onClose={() => setCurrentPopup(null)}
              userWallet={userWallet}
            />
          </div>
        )}
      </div>
    </div>
  );
}
