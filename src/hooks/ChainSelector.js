import React, { useState } from "react";
import {
  bnbchain,
  ethchain,
  dogechain,
  polychain,
  arbitrumchain,
  chains,
} from "./utils.js";
import { StyledBox } from "./styles.js";
import { useTheme } from "@mui/material/styles"; // Importă useTheme hook
import { useTranslation } from "react-i18next";

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
  const theme = useTheme();
  const { t } = useTranslation();
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
    }, 1000);
  };

  return (
    <StyledBox>
      <Button variant="text" onClick={handleClickOpen}>
        {Object.keys(chains).find((key) => chains[key] === selectedChain)}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogTitle>{t("selectChain")}</DialogTitle>
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress color="secondary" size={24} />
              <Box ml={2}>
                {t("connectingTo")}{" "}
                {Object.keys(chains).find((key) => chains[key] === value)}
              </Box>
            </Box>
          ) : (
            <FormControl variant="filled">
              <InputLabel id="chain-selector-label">Chain</InputLabel>
              <Select
                labelId="chain-selector-label"
                id="chain-selector"
                value={value}
                onChange={handleSelectionChange}
              >
                <MenuItem value={bnbchain}>BNB Smart Chain</MenuItem>
                <MenuItem value={ethchain}>Ethereum Mainnet</MenuItem>
                <MenuItem value={polychain}>Polygon Mainnet</MenuItem>
                <MenuItem value={arbitrumchain}>Arbitrum One</MenuItem>
                <MenuItem value={dogechain}>Dogecoin ERC20</MenuItem>
              </Select>
            </FormControl>
          )}
        </DialogContent>
      </Dialog>
    </StyledBox>
  );
};

export default ChainSelector;
