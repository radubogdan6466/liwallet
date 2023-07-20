// NavBar.js
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import ChainSelector from "./ChainSelector";
import Meniu from "./Navigate";
import { CenterBox } from "./styles";

export default function NavBar({
  selectedChain,
  handleChainChange,
  userWallet,
  copyAddress,
}) {
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
