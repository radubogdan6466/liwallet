// TokenSection.js
import React from "react";
import { TypographyTitle } from "./styles";
import TokenList from "./TokenList";

export default function TokenSection(props) {
  // destructure the props
  const {
    userWallet,
    web3,
    selectedChain,
    ethchain,
    bnbchain,
    dogechain,
    ethBalance,
    handleTokenClick,
  } = props;

  return (
    <React.Fragment>
      <TypographyTitle>Tokens</TypographyTitle>
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
    </React.Fragment>
  );
}
