// TokenSection.js
import React from "react";
import { TypographyTitle } from "../hooks/styles";
import TokenList from "./TokenList";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

export default function TokenSection(props) {
  const theme = useTheme();
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
        {t("tokens")}
      </TypographyTitle>
      <TokenList
        userWallet={userWallet}
        web3={web3}
        selectedChain={selectedChain}
        ethchain={ethchain}
        bnbchain={bnbchain}
        polychain={polychain}
        dogechain={dogechain}
        arbitrumchain={arbitrumchain}
        ethBalance={ethBalance}
        handleTokenClick={handleTokenClick}
      />
    </React.Fragment>
  );
}
