// ImportToken.js
import React, { useState, useEffect } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

function ImportToken() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenDecimals, setTokenDecimals] = useState(18);
  const [errorMessage, setErrorMessage] = useState("");
  const [tokenList, setTokenList] = useState([]);

  useEffect(() => {
    const tokens = JSON.parse(localStorage.getItem("tokens")) || [];
    setTokenList(tokens);
  }, []);

  const handleImport = () => {
    if (tokenSymbol === "") {
      setErrorMessage("Please enter a token symbol.");
      return;
    }

    const existingTokens = JSON.parse(localStorage.getItem("tokens")) || [];

    if (existingTokens.find((t) => t.address === tokenAddress)) {
      setErrorMessage("This token has already been imported.");
      return;
    }

    const token = {
      address: tokenAddress,
      symbol: tokenSymbol,
    };

    existingTokens.push(token);
    localStorage.setItem("tokens", JSON.stringify(existingTokens));

    setTokenAddress("");
    setTokenSymbol("");
    setTokenDecimals(18);
    setErrorMessage("");
    setTokenList(existingTokens);
  };

  return (
    <form>
      <TextField
        label="Token Address"
        variant="outlined"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
      />
      <TextField
        label="Token Symbol"
        variant="outlined"
        value={tokenSymbol}
        onChange={(e) => setTokenSymbol(e.target.value)}
      />

      <Button variant="contained" color="primary" onClick={handleImport}>
        Import
      </Button>
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      <Typography variant="h6">Imported Tokens:</Typography>
      {tokenList.map((token) => (
        <Typography key={token.address}>
          {token.symbol}: {token.address}
        </Typography>
      ))}
    </form>
  );
}

export default ImportToken;
/**
 * 
 * {
    symbol: "MTA",
    address: "0xf8E3a8FC5673b928107c78B7Af4C0b89A4c3Aac8",
    abi: mimabi,
    logo: "https://www.svgviewer.dev/static-svgs/424441/ethereum-crypto-cryptocurrency-2.svg",
  },
 */
