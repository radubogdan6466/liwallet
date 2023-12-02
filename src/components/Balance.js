// Balance.js
import React from "react";
import { Box } from "@mui/material";
import { TypographyTitle } from "../hooks/styles";
import { useTheme } from "@mui/material/styles";

export default function Balance({
  ethBalance,
  selectedChain,
  ethchain,
  bnbchain,
  polychain,
  dogechain,
  arbitrumchain,
  goerlichain,
  sepoliachain,
}) {
  const theme = useTheme();

  return (
    <Box sx={{ width: "100%" }}>
      <TypographyTitle variant="h5">
        {Number(ethBalance).toFixed(4)}
        {selectedChain === ethchain
          ? "   ETH"
          : selectedChain === bnbchain
          ? "   BNB"
          : selectedChain === polychain
          ? "   MATIC"
          : selectedChain === dogechain
          ? "   DOGECOIN"
          : selectedChain === arbitrumchain
          ? "   ETH"
          : selectedChain === goerlichain
          ? "   ETH"
          : selectedChain === sepoliachain
          ? "   ETH"
          : "   Unknown Chain"}
      </TypographyTitle>
    </Box>
  );
}
