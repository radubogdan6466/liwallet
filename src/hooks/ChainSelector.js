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
  const theme = useTheme(); // Folosește useTheme hook pentru a obține tema
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
    }, 2000);
  };

  return (
    <StyledBox>
      <Button
        variant="text"
        onClick={handleClickOpen}
        sx={{
          color: theme.palette.text.secondary,
        }}
      >
        {Object.keys(chains).find((key) => chains[key] === selectedChain)}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent
          sx={{
            minWidth: "100px",
            backgroundColor: theme.palette.button.hover,
          }}
        >
          <DialogTitle
            sx={{
              backgroundColor: theme.palette.button.hover,
              minWidth: "100px",
              backgroundColor: theme.palette.button.hover,
              color: theme.palette.text.secondary,
            }}
          >
            {t("selectChain")}
          </DialogTitle>
          {isLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                color: theme.palette.text.secondary,
                backgroundColor: theme.palette.button.hover,
              }}
            >
              <CircularProgress color="secondary" size={24} />
              <Box ml={2}>
                {t("connectingTo")}{" "}
                {Object.keys(chains).find((key) => chains[key] === value)}
              </Box>
            </Box>
          ) : (
            <FormControl
              variant="filled"
              sx={{
                minWidth: "100px",
                color: theme.palette.text.secondary,
                backgroundColor: theme.palette.button.hover,
              }}
            >
              <InputLabel
                id="chain-selector-label"
                sx={{
                  color: theme.palette.text.secondary,
                  backgroundColor: theme.palette.button.hover,
                }}
              >
                Chain
              </InputLabel>
              <Select
                labelId="chain-selector-label"
                id="chain-selector"
                value={value}
                onChange={handleSelectionChange}
                sx={{
                  color: theme.palette.text.secondary,
                  backgroundColor: theme.palette.button.hover,
                }}
              >
                <MenuItem
                  sx={{
                    backgroundColor: theme.palette.button.hover,
                  }}
                  value={bnbchain}
                >
                  BNB Smart Chain
                </MenuItem>
                <MenuItem
                  sx={{
                    backgroundColor: theme.palette.button.hover,
                  }}
                  value={ethchain}
                >
                  Ethereum Mainnet
                </MenuItem>
                <MenuItem
                  sx={{
                    backgroundColor: theme.palette.button.hover,
                  }}
                  value={polychain}
                >
                  Polygon Mainnet
                </MenuItem>
                <MenuItem
                  sx={{
                    backgroundColor: theme.palette.button.hover,
                  }}
                  value={arbitrumchain}
                >
                  Arbitrum One
                </MenuItem>
                <MenuItem
                  sx={{
                    backgroundColor: theme.palette.button.hover,
                  }}
                  value={dogechain}
                >
                  Dogecoin ERC20
                </MenuItem>
              </Select>
            </FormControl>
          )}
        </DialogContent>
      </Dialog>
    </StyledBox>
  );
};

export default ChainSelector;
