import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { ethchainTokens, bnbchainTokens, dogechainTokens } from "./tokens";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Box,
  Button,
} from "@mui/material";

export default function TokenList({
  userWallet,
  web3,
  selectedChain,
  ethchain,
  bnbchain,
  dogechain,
  ethBalance,
  handleTokenClick,
}) {
  const [tokenBalances, setTokenBalances] = useState({});
  const [showZeroBalanceTokens, setShowZeroBalanceTokens] = useState(false);

  let tokens;
  if (selectedChain === ethchain) {
    tokens = ethchainTokens;
  } else if (selectedChain === bnbchain) {
    tokens = bnbchainTokens;
  } else if (selectedChain === dogechain) {
    tokens = dogechainTokens;
  } else {
    tokens = [];
  }

  useEffect(() => {
    const fetchTokenBalances = async () => {
      if (userWallet) {
        const balances = { ...tokenBalances };

        balances["ETH"] = { name: "ETH", balance: ethBalance };

        for (const token of tokens) {
          const { symbol, address, abi } = token;
          const tokenContract = new web3.eth.Contract(abi, address);
          const balance = await tokenContract.methods
            .balanceOf(userWallet.address)
            .call();
          const balanceInToken = web3.utils.fromWei(balance, "ether");
          const updatedTokenBalance = { address, balance: balanceInToken };
          updatedTokenBalance.name = symbol;
          balances[symbol] = updatedTokenBalance;
        }

        setTokenBalances(balances);
      }
    };
    fetchTokenBalances();
  }, [userWallet, web3, ethBalance, showZeroBalanceTokens]);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Button onClick={() => setShowZeroBalanceTokens(!showZeroBalanceTokens)}>
        {showZeroBalanceTokens
          ? "Ascunde monedele cu balanța 0"
          : "Arată monedele cu balanța 0"}
      </Button>
      <List>
        {Object.keys(tokenBalances).map((symbol) => {
          if (
            (showZeroBalanceTokens || tokenBalances[symbol].balance !== "0") &&
            ((selectedChain === ethchain &&
              tokens.find((token) => token.symbol === symbol)) ||
              (selectedChain === bnbchain &&
                tokens.find((token) => token.symbol === symbol)) ||
              (selectedChain === dogechain &&
                tokens.find((token) => token.symbol === symbol)))
          ) {
            const token = tokens.find((token) => token.symbol === symbol);

            return (
              <ListItem
                button
                key={symbol}
                onClick={() => handleTokenClick(symbol)}
              >
                <ListItemAvatar>
                  <Avatar alt={tokenBalances[symbol].name} src={token.logo} />
                </ListItemAvatar>
                <ListItemText
                  primary={tokenBalances[symbol].balance}
                  secondary={tokenBalances[symbol].name}
                  secondaryTypographyProps={{ style: { color: "gray" } }} // schimbare aici
                />
              </ListItem>
            );
          }
          return null;
        })}
      </List>
    </Box>
  );
}
