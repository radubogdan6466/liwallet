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
  backgroundColor: "#24272a",
  margin: "auto",
  //width: "200px",
});
const chains = {
  Ethereum: ethchain,
  SmartChain: bnbchain,
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
        <DialogTitle
          sx={{ minWidth: "100px", backgroundColor: "#24272a", color: "white" }}
        >
          Select Chain
        </DialogTitle>
        <DialogContent
          sx={{ minWidth: "100px", backgroundColor: "#24272a", color: "white" }}
        >
          <FormControl
            variant="filled"
            sx={{
              minWidth: "100px",
              backgroundColor: "#24272a",
              color: "white",
            }}
          >
            <InputLabel id="chain-selector-label" sx={{ color: "white" }}>
              Chain
            </InputLabel>
            <Select
              labelId="chain-selector-label"
              id="chain-selector"
              value={selectedChain}
              onChange={handleChainChange}
              sx={{
                color: "white",
                backgroundColor: "#24272a",
                "& .MuiMenuItem-root": {
                  backgroundColor: "#24272a",
                },
              }}
            >
              <MenuItem value={ethchain}>Ethereum</MenuItem>
              <MenuItem value={bnbchain}>Smart Chain</MenuItem>
              <MenuItem value={dogechain}>Dogecoin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions
          sx={{ minWidth: "100px", backgroundColor: "#24272a", color: "white" }}
        >
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </StyledBox>
  );
};

export default ChainSelector;
