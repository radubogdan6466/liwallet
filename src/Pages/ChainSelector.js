import React, { useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const bnbchain = "https://data-seed-prebsc-2-s2.bnbchain.org:8545";
export const ethchain =
  "https://sepolia.infura.io/v3/74bc4d4122e04aedba2a6d8bcc3164fd";
export const dogechain = "https://rpc-testnet.dogechain.dog";

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  backgroundColor: "#333",
});
const chains = {
  Ethereum: ethchain,
  "Smart Chain": bnbchain,
  Dogecoin: dogechain,
};
const ChainSelector = ({ selectedChain, handleChainChange }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyledBox>
      <Button variant="text" onClick={handleClickOpen}>
        {Object.keys(chains).find((key) => chains[key] === selectedChain)}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select Chain</DialogTitle>
        <DialogContent>
          <FormControl
            variant="filled"
            sx={{ minWidth: "200px", backgroundColor: "#333", color: "white" }}
          >
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </StyledBox>
  );
};

export default ChainSelector;
