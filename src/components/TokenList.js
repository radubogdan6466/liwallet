import React, { useState, useEffect } from "react";
import bscAbi from "../JsonFiles/testBnbAbi.json";
import ercAbi from "../JsonFiles/testErcAbi.json";
import dogeAbi from "../JsonFiles/testDogeAbi.json";
import polyAbi from "../JsonFiles/testPolyAbi.json";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import tokenLogos from "../JsonFiles/tokenLogo.json"; // import the JSON file
import { useTheme } from "@mui/material/styles"; // Importă useTheme hook
import { useTranslation } from "react-i18next";

export default function TokenList({
  userWallet,
  web3,
  selectedChain,
  ethchain,
  bnbchain,
  dogechain,
  polychain,
  ethBalance,
  arbitrumchain,
  handleTokenClick,
}) {
  const theme = useTheme(); // Folosește useTheme hook pentru a obține tema
  const { t } = useTranslation();
  const [tokenBalances, setTokenBalances] = useState({});
  const [tokenAdded, setTokenAdded] = useState(false);

  let tokens;
  if (selectedChain === ethchain) {
    tokens = JSON.parse(localStorage.getItem("ethchainTokens")) || [];
  } else if (selectedChain === bnbchain) {
    tokens = JSON.parse(localStorage.getItem("bnbchainTokens")) || [];
  } else if (selectedChain === dogechain) {
    tokens = JSON.parse(localStorage.getItem("dogechainTokens")) || [];
  } else if (selectedChain === polychain) {
    tokens = JSON.parse(localStorage.getItem("polychainTokens")) || [];
  } else if (selectedChain === arbitrumchain) {
    tokens = JSON.parse(localStorage.getItem("arbitrumchainTokens")) || [];
  } else {
    tokens = [];
  }

  // Function to find a token's logo URL from the imported JSON file
  const findLogoUrl = (symbol) => {
    const tokenLogoObject = tokenLogos.find((token) => token.symbol === symbol);
    return tokenLogoObject ? tokenLogoObject.logo : null;
  };

  const abis = {
    11155111: ercAbi,
    56: bscAbi,
    568: dogeAbi,
    137: polyAbi,
    42161: ercAbi,
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

        const balanceInToken = parseFloat(
          (balance / Math.pow(10, decimals)).toFixed(8)
        );

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
    } else if (selectedChain === polychain) {
      tokenListKey = "polychainTokens";
    } else if (selectedChain === arbitrumchain) {
      tokenListKey = "arbitrumchainTokens";
    }

    const storedTokens = JSON.parse(localStorage.getItem(tokenListKey)) || [];
    const updatedTokens = storedTokens.filter(
      (token) => token.symbol !== symbol
    );
    localStorage.setItem(tokenListKey, JSON.stringify(updatedTokens));
    fetchTokenBalances();
  };
  const handleRefresh = () => {
    window.location.reload();
  };
  const getNativeCurrency = (selectedChain) => {
    if (selectedChain === ethchain) {
      return "ETH Token";
    } else if (selectedChain === bnbchain) {
      return "BNB";
    } else if (selectedChain === dogechain) {
      return "DOGECOIN";
    } else if (selectedChain === polychain) {
      return "Matic Token";
    } else if (selectedChain === arbitrumchain) {
      return "ETH Arbitrum";
    }
    return "";
  };
  return (
    <Box>
      <List>
        <ListItem
          button
          key={getNativeCurrency(selectedChain)}
          onClick={() => handleTokenClick(getNativeCurrency(selectedChain))}
        >
          <ListItemAvatar>
            <Avatar
              alt={getNativeCurrency(selectedChain)}
              src={findLogoUrl(getNativeCurrency(selectedChain))}
            />
          </ListItemAvatar>
          <ListItemText
            primary={ethBalance}
            secondary={getNativeCurrency(selectedChain)}
            secondaryTypographyProps={{
              style: { color: theme.palette.text.symbol },
            }}
          />
        </ListItem>
        {Object.keys(tokenBalances).map((symbol) => {
          const token = tokens.find((token) => token.symbol === symbol);
          const logoUrl = findLogoUrl(symbol);

          if (token && symbol) {
            return (
              <ListItem
                button
                key={symbol}
                onClick={() => handleTokenClick(symbol)}
              >
                <ListItemAvatar>
                  <Avatar alt={tokenBalances[symbol].name} src={logoUrl} />
                </ListItemAvatar>
                <ListItemText
                  primary={tokenBalances[symbol].balance}
                  secondary={tokenBalances[symbol].name}
                  secondaryTypographyProps={{
                    style: { color: theme.palette.text.symbol },
                  }}
                />

                <Button
                  onClick={(event) => {
                    event.stopPropagation();
                    handleTokenRemove(symbol);
                  }}
                  color="secondary"
                >
                  {t("hide")}
                </Button>
              </ListItem>
            );
          }
          return null;
        })}
      </List>

      <Button
        onClick={handleRefresh}
        color="primary"
        aria-label="refresh balance"
      >
        <RefreshIcon />
        {t("refresh")}
      </Button>
    </Box>
  );
}
