import React, { useState, useEffect } from "react";
import bscAbi from "./JsonFiles/testBnbAbi.json";
import ercAbi from "./JsonFiles/testErcAbi.json";
import dogeAbi from "./JsonFiles/testDogeAbi.json";
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
  const [tokenAdded, setTokenAdded] = useState(false);

  let tokens;
  if (selectedChain === ethchain) {
    tokens = JSON.parse(localStorage.getItem("ethchainTokens")) || [];
  } else if (selectedChain === bnbchain) {
    tokens = JSON.parse(localStorage.getItem("bnbchainTokens")) || [];
  } else if (selectedChain === dogechain) {
    tokens = JSON.parse(localStorage.getItem("dogechainTokens")) || [];
  } else {
    tokens = [];
  }

  const abis = {
    11155111: ercAbi,
    56: bscAbi,
    568: dogeAbi,
  };

  const fetchTokenBalances = async () => {
    if (userWallet) {
      const balances = { ...tokenBalances };

      balances["ETH"] = { name: "ETH", balance: ethBalance };

      for (const token of tokens) {
        const { symbol, address, chainId } = token;
        const tokenContract = new web3.eth.Contract(abis[chainId], address);
        const balance = await tokenContract.methods
          .balanceOf(userWallet.address)
          .call();
        const decimals = await tokenContract.methods.decimals().call();
        const balanceInToken = balance / Math.pow(10, decimals);

        const updatedTokenBalance = { address, balance: balanceInToken };
        updatedTokenBalance.name = symbol;
        balances[symbol] = updatedTokenBalance;
      }

      setTokenBalances(balances);
    }
  };

  useEffect(() => {
    fetchTokenBalances();
    const handleTokenAdded = (event) => {
      setTokenAdded(!tokenAdded);
    };
    window.addEventListener("tokenAdded", handleTokenAdded);

    return () => {
      window.removeEventListener("tokenAdded", handleTokenAdded);
    };
  }, [userWallet, web3, ethBalance, tokenAdded]);

  const handleTokenRemove = (symbol) => {
    let tokenListKey = "";
    if (selectedChain === ethchain) {
      tokenListKey = "ethchainTokens";
    } else if (selectedChain === bnbchain) {
      tokenListKey = "bnbchainTokens";
    } else if (selectedChain === dogechain) {
      tokenListKey = "dogechainTokens";
    }

    const storedTokens = JSON.parse(localStorage.getItem(tokenListKey)) || [];
    const updatedTokens = storedTokens.filter(
      (token) => token.symbol !== symbol
    );
    localStorage.setItem(tokenListKey, JSON.stringify(updatedTokens));

    // re-fetch token balances after removing a token
    fetchTokenBalances();
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <List>
        {Object.keys(tokenBalances).map((symbol) => {
          const token = tokens.find((token) => token.symbol === symbol);
          if (token) {
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
                  secondaryTypographyProps={{ style: { color: "gray" } }}
                />
                <Button
                  onClick={(event) => {
                    event.stopPropagation();
                    handleTokenRemove(symbol);
                  }}
                  color="secondary"
                >
                  Șterge
                </Button>
              </ListItem>
            );
          }
          return null;
        })}
      </List>
    </Box>
  );
}
