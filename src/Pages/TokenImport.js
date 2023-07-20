import React, { useState, useEffect } from "react";
import EthereumAddress from "ethereum-address";
import { getChainNameFromUrl } from "./utils";
import { useTokenImportHandler } from "./tokenImportHandler.js";
import { styled } from "@mui/material/styles";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  TypographyTitle,
  FormField,
  StyledBoxx,
  StyledFormControl,
  Link,
  ActionsContainer,
  FormContainer,
} from "./styles";

const TokenImport = ({ onClose, selectedChain }) => {
  const [importedTokens, setImportedTokens] = useState(
    JSON.parse(
      localStorage.getItem(getChainNameFromUrl(selectedChain) + "Tokens")
    ) || []
  );
  const closePopup = () => {
    onClose();
  };
  const handleTokenImport = useTokenImportHandler(
    importedTokens,
    setImportedTokens,
    selectedChain
  );

  useEffect(() => {
    const storedTokens = JSON.parse(
      localStorage.getItem(getChainNameFromUrl(selectedChain) + "Tokens")
    );

    if (storedTokens) {
      setImportedTokens(storedTokens);
    }
  }, [selectedChain]);

  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenDecimals, setTokenDecimals] = useState(18);
  const [tokenChainId, setTokenChainId] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValidAddress = EthereumAddress.isAddress(tokenAddress);
    if (!isValidAddress) {
      setError("Please enter a valid token address.");
      return;
    }

    if (tokenChainId === null) {
      setError("Please enter a valid chain ID.");
      return;
    }
    const chainId = parseInt(tokenChainId); // Convertim chainId în număr întreg

    handleTokenImport(tokenAddress, tokenSymbol, tokenDecimals, chainId);
    setTokenAddress("");
    setTokenSymbol("");
    setTokenDecimals("");
    setTokenChainId("");
    setError(""); // Resetează eroarea
  };

  return (
    <Dialog open={true} onClose={closePopup}>
      <DialogTitle>
        <TypographyTitle>Import Token</TypographyTitle>
      </DialogTitle>
      <DialogContent>
        <FormContainer onSubmit={handleSubmit}>
          <FormField
            type="text"
            label="Enter token address"
            value={tokenAddress}
            onChange={(event) => setTokenAddress(event.target.value)}
          />
          <FormField
            type="text"
            label="Enter token symbol"
            value={tokenSymbol}
            onChange={(event) => setTokenSymbol(event.target.value)}
          />
          <FormField
            type="number"
            label="Enter token decimals"
            value={tokenDecimals}
            onChange={(event) => setTokenDecimals(event.target.value)}
          />
          <FormField
            type="number"
            label="Enter chain ID"
            value={tokenChainId !== null ? tokenChainId : ""}
            onChange={(event) => setTokenChainId(event.target.value)}
          />
          {error && <p>{error}</p>}
          <ActionsContainer>
            <Button type="submit" color="primary" variant="contained">
              Import Token
            </Button>
          </ActionsContainer>
        </FormContainer>
      </DialogContent>
    </Dialog>
  );
};

export default TokenImport;
