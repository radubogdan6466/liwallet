import React, { useState, useEffect, useMemo } from "react";
import EthereumAddress from "ethereum-address";
import { ethers } from "ethers";
import { useTokenImportHandler } from "../hooks/tokenImportHandler.js";
import { chainIds, getChainNameFromUrl } from "../hooks/utils.js";
import { handleError } from "../hooks/errorHandler.js";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";
import {
  TypographyTitle,
  FormField,
  ActionsContainer,
  FormContainer,
} from "../hooks/styles.js";

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
    const chainName = getChainNameFromUrl(selectedChain);
    const chainId = chainIds[chainName];
    setTokenChainId(chainId);
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
  const [isTokenAdded, setIsTokenAdded] = useState(false);
  const provider = useMemo(
    () => new ethers.providers.JsonRpcProvider(selectedChain),
    [selectedChain]
  );
  const specialSymbols = {
    "0xba2ae424d960c26247dd6c32edc70b295c744c43": "BDOGE",
    "0xcc42724c6683b7e57334c4e856f4c9965ed682bd": "BMATIC",
  };
  useEffect(() => {
    if (EthereumAddress.isAddress(tokenAddress)) {
      const erc20Abi = [
        "function symbol() view returns (string)",
        "function decimals() view returns (uint8)",
      ];
      const tokenContract = new ethers.Contract(
        tokenAddress,
        erc20Abi,
        provider
      );

      async function fetchTokenSymbolAndDecimals() {
        try {
          const symbol = await tokenContract.symbol();

          // Verifică dacă adresa este în obiectul specialSymbols
          const specialSymbol = specialSymbols[tokenAddress.toLowerCase()];
          if (specialSymbol) {
            setTokenSymbol(specialSymbol); // Setează simbolul special
          } else {
            setTokenSymbol(symbol);
          }

          const decimals = await tokenContract.decimals();
          setTokenDecimals(decimals);
        } catch (err) {
          if (err.code === ethers.utils.Logger.errors.CALL_EXCEPTION) {
            setError(handleError({ message: "CALL_EXCEPTION" }));
          } else {
            console.error(err);
          }
        }
      }

      fetchTokenSymbolAndDecimals();
    }
  }, [tokenAddress, provider]);

  const handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();

    const isValidAddress = EthereumAddress.isAddress(tokenAddress);
    if (!isValidAddress) {
      setError(handleError({ message: "invalid_address" }));
    }

    if (tokenChainId === null) {
      setError("Introduceti un chainId valid.");
      return;
    }
    const chainId = parseInt(tokenChainId);

    const importResult = handleTokenImport(
      tokenAddress,
      tokenSymbol,
      tokenDecimals,
      chainId
    );
    if (importResult.tokenAlreadyImported) {
      setError("Tokenul este deja importat!");
      return;
    }

    setTokenAddress("");
    setTokenSymbol("");
    setTokenDecimals("");
    setTokenChainId("");
    setError("");
    setIsTokenAdded(true);
    const event = new CustomEvent("tokenAdded", { detail: tokenAddress });
    window.dispatchEvent(event);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <Dialog open={true} onClose={closePopup}>
      <DialogTitle>
        <TypographyTitle>Import Token</TypographyTitle>
      </DialogTitle>
      {error && <Typography>{error}</Typography>}

      <DialogContent>
        <FormContainer onSubmit={handleSubmit}>
          <FormField
            type="text"
            label="Enter token address"
            value={tokenAddress}
            onChange={(event) => {
              const newAddress = event.target.value;
              if (EthereumAddress.isAddress(newAddress)) {
                setTokenAddress(newAddress);
                if (error === "Adresa incorecta, verifica chain-ul") {
                  setError("");
                }
              } else {
                setError("Adresa introdusă nu este o adresă Ethereum validă.");
              }
            }}
            error={
              error === "Adresa incorecta, verifica chain-ul" ||
              error === "Adresa introdusă nu este o adresă Ethereum validă."
            }
            helperText={
              error === "Adresa incorecta, verifica chain-ul" ||
              error === "Adresa introdusă nu este o adresă Ethereum validă."
                ? error
                : ""
            }
          />

          <FormField
            type="text"
            label="Symbol"
            value={tokenSymbol}
            onChange={(event) => setTokenSymbol(event.target.value)}
          />
          <FormField
            type="number"
            label="Decimals"
            value={tokenDecimals}
            onChange={(event) => setTokenDecimals(event.target.value)}
          />
          <FormField
            type="number"
            label="Network ID"
            value={tokenChainId !== null ? tokenChainId : ""}
            onChange={(event) => setTokenChainId(event.target.value)}
            disabled
          />
          <ActionsContainer>
            <Button type="submit" color="primary" variant="contained">
              {isTokenAdded ? "Token adăugat cu succes" : "Import Token"}
            </Button>
          </ActionsContainer>
        </FormContainer>
      </DialogContent>
    </Dialog>
  );
};

export default TokenImport;
//eth
//  0xf8E3a8FC5673b928107c78B7Af4C0b89A4c3Aac8
//   0x900B61C0b67bB3aBFAA6331Ebd2f2d08AE79cdE9
//   0xF4A81571A52185d5cfe2344C36afddD49210fE13
//   0x250a270B50C287ce4b613Cb4E2d78E14D05EcD9C
//    0x39bAB97C19902348225588108Be36eD609Cd0b85

// bnb
//zix
//    0x48077400FAF11183c043Feb5184a13ea628Bb0DB
//wista
//    0x3720E3C827daB665383b32bC49766D2d24C1Ed35
//doge
//    0xbA2aE424d960c26247Dd6c32edC70B295c744C43

//doge
//   0x8A08d9bF87578De8DAA4C54e423472603aaD813B
