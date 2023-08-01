// TokenSection.js
import React from "react";
import { TypographyTitle } from "../hooks/styles";
import TokenList from "./TokenList";
import { useTheme } from "@mui/material/styles";
export default function TokenSection(props) {
  const theme = useTheme();

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
      <TypographyTitle
        sx={{
          color: theme.palette.text.secondary,
        }}
      >
        Tokens
      </TypographyTitle>
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
