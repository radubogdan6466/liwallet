import React, { useState } from "react";
import { bnbchain, ethchain, dogechain, chains } from "./utils.js";
import { StyledBox } from "./styles.js";
import { useTheme } from "@mui/material/styles"; // Importă useTheme hook

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
  CircularProgress,
  Button,
} from "@mui/material";

const ChainSelector = ({ selectedChain, handleChainChange }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(selectedChain);
  const theme = useTheme(); // Folosește useTheme hook pentru a obține tema

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (isLoading) return;

    setOpen(false);
  };

  const handleSelectionChange = async (event) => {
    const newChain = event.target.value;
    setIsLoading(true);
    setValue(newChain);

    setTimeout(async () => {
      await handleChainChange(newChain);
      setIsLoading(false);
      handleClose();
    }, 2000);
  };

  return (
    <StyledBox>
      <Button
        variant="text"
        onClick={handleClickOpen}
        sx={{
          color: theme.palette.text.secondary, // Folosește culoarea principală din tema
        }}
      >
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
          {isLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              color="white"
            >
              <CircularProgress color="secondary" size={24} />
              <Box ml={2}>
                Connecting to{" "}
                {Object.keys(chains).find((key) => chains[key] === value)}
              </Box>
            </Box>
          ) : (
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
                value={value}
                onChange={handleSelectionChange}
                sx={{
                  color: "white",
                  backgroundColor: "#24272a",
                  "& .MuiMenuItem-root": {
                    backgroundColor: "#24272a",
                  },
                }}
              >
                <MenuItem value={bnbchain}>BNB Smart Chain</MenuItem>
                <MenuItem value={ethchain}>Ethereum chain</MenuItem>
                <MenuItem value={dogechain}>Dogecoin chain</MenuItem>
              </Select>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions
          sx={{ minWidth: "100px", backgroundColor: "#24272a", color: "white" }}
        >
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </StyledBox>
  );
};

export default ChainSelector;
