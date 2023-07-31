// NavBar.js
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import ChainSelector from "./ChainSelector";
import Meniu from "./Navigate";
import { CenterBox } from "./styles";
import { useTheme } from "@mui/material/styles"; // Importă useTheme hook

export default function NavBar({
  selectedChain,
  handleChainChange,
  userWallet,
  copyAddress,
}) {
  const theme = useTheme(); // Folosește useTheme hook pentru a obține tema

  const shortenedAddress = `${userWallet.address.substring(
    0,
    5
  )}...${userWallet.address.substring(userWallet.address.length - 4)}`;

  return (
    <Box
      className="nav"
      sx={{
        height: "100px",
        display: "flex",
        justifyContent: "space-between",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.5)",
      }}
    >
      <ChainSelector
        selectedChain={selectedChain}
        handleChainChange={handleChainChange}
      />
      <CenterBox>
        <Button
          onClick={() => copyAddress(userWallet.address)}
          endIcon={
            <ContentCopy
              sx={{
                color: theme.palette.primary.icon,
              }}
            />
          }
          sx={{
            color: theme.palette.text.secondary,
          }}
        >
          {shortenedAddress}
        </Button>
        <Typography
          id="copyMessage"
          sx={{
            color: theme.palette.text.span,
          }}
        ></Typography>
      </CenterBox>
      <Meniu />
    </Box>
  );
}
