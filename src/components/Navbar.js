// NavBar.js
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import ChainSelector from "../hooks/ChainSelector";
import Meniu from "./Navigate";
import { CenterBox } from "../hooks/styles";
import { useTheme } from "@mui/material/styles"; // Importă useTheme hook
import { Clipboard } from "@capacitor/clipboard";
import "./nav.css";
export default function NavBar({
  selectedChain,
  handleChainChange,
  userWallet,
  copyAddress,
}) {
  function copyAddress(address) {
    Clipboard.write({
      string: address,
    })
      .then(() => {
        const copyMessage = document.getElementById("copyMessage");
        copyMessage.textContent = "Adresa copiată!";
        setTimeout(() => {
          copyMessage.textContent = "";
        }, 1000);
      })
      .catch((error) => {
        console.error("Eroare la copierea adresei:", error);
      });
  }
  const theme = useTheme(); // Folosește useTheme hook pentru a obține tema

  const shortenedAddress = `${userWallet.address.substring(
    0,
    5
  )}...${userWallet.address.substring(userWallet.address.length - 4)}`;

  return (
    <Box className="nav">
      <ChainSelector
        selectedChain={selectedChain}
        handleChainChange={handleChainChange}
      />
      <CenterBox>
        <Button
          onClick={() => copyAddress(userWallet.address)}
          endIcon={<ContentCopy />}
        >
          {shortenedAddress}
        </Button>
        <Typography id="copyMessage"></Typography>
      </CenterBox>
      <Meniu />
    </Box>
  );
}
