import React from "react";
import { Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { styled } from "@mui/material/styles";

export const bnbchain = "https://data-seed-prebsc-2-s2.bnbchain.org:8545";
export const ethchain =
  "https://sepolia.infura.io/v3/74bc4d4122e04aedba2a6d8bcc3164fd";
export const dogechain = "https://rpc-testnet.dogechain.dog";

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#333", // Schimbați culoarea de fundal a meniului
  color: "white", // Schimbați culoarea textului
  padding: "20px",
  minWidth: "100px",
});

const ChainSelector = ({ selectedChain, handleChainChange }) => {
  return (
    <StyledBox>
      <FormControl variant="filled" sx={{ minWidth: "100px" }}>
        <InputLabel id="chain-selector-label" sx={{ color: "white" }}>
          Chain
        </InputLabel>
        <Select
          labelId="chain-selector-label"
          id="chain-selector"
          value={selectedChain}
          onChange={handleChainChange}
          sx={{ color: "white" }}
        >
          <MenuItem value={ethchain}>Ethereum</MenuItem>
          <MenuItem value={bnbchain}>Smart Chain</MenuItem>
          <MenuItem value={dogechain}>Dogecoin</MenuItem>
        </Select>
      </FormControl>
    </StyledBox>
  );
};
export default ChainSelector;
