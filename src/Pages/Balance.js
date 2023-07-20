// Balance.js
import React from "react";
import { Box } from "@mui/material";
import { TypographyTitle } from "./styles";

export default function Balance({
  ethBalance,
  selectedChain,
  ethchain,
  bnbchain,
}) {
  return (
    <Box sx={{ width: "100%" }}>
      <TypographyTitle variant="h5">
        {Number(ethBalance).toFixed(4)}{" "}
        {selectedChain === ethchain
          ? "ETH"
          : selectedChain === bnbchain
          ? "BNB"
          : "DOGE"}
      </TypographyTitle>
    </Box>
  );
}
