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
}) {
  const theme = useTheme();

  return (
    <Box sx={{ width: "100%" }}>
      <TypographyTitle
        variant="h5"
        sx={{
          color: theme.palette.text.secondary,
        }}
      >
        {Number(ethBalance).toFixed(4)}
        {selectedChain === ethchain
          ? "ETH Token"
          : selectedChain === bnbchain
          ? "BNB"
          : selectedChain === polychain
          ? "Matic Token"
          : selectedChain === dogechain
          ? "DOGECOIN"
          : selectedChain === arbitrumchain
          ? "ETH Arbitrum"
          : "Unknown Chain"}
      </TypographyTitle>
    </Box>
  );
}
