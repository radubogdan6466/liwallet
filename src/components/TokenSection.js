// TokenSection.js
import React from "react";
import TokenList from "./TokenList";
import { useTranslation } from "react-i18next";
import "./tokenList.css";
export default function TokenSection(props) {
  const { t } = useTranslation();
  const {
    userWallet,
    web3,
    selectedChain,
    ethchain,
    bnbchain,
    dogechain,
    polychain,
    arbitrumchain,
    goerlichain,
    sepoliachain,
    ethBalance,
    handleTokenClick,
  } = props;
  return (
    <div className="tokenList">
      <h1 style={{ color: "#f4f3f2" }}>{t("tokens")}</h1>
      <TokenList
        userWallet={userWallet}
        web3={web3}
        selectedChain={selectedChain}
        ethchain={ethchain}
        bnbchain={bnbchain}
        polychain={polychain}
        dogechain={dogechain}
        arbitrumchain={arbitrumchain}
        goerlichain={goerlichain}
        sepoliachain={sepoliachain}
        ethBalance={ethBalance}
        handleTokenClick={handleTokenClick}
      />
    </div>
  );
}
