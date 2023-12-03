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
import tokenLogos from "../JsonFiles/tokenLogo.json";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { Clipboard } from "@capacitor/clipboard";

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
  goerlichain,
  sepoliachain,
  handleTokenClick,
  onTokenBalanceClick,
}) {
  const theme = useTheme();
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
  } else if (selectedChain === goerlichain) {
    tokens = JSON.parse(localStorage.getItem("goerlichainTokens")) || [];
  } else if (selectedChain === sepoliachain) {
    tokens = JSON.parse(localStorage.getItem("sepoliachainTokens")) || [];
  } else {
    tokens = [];
  }

  const findLogoUrl = (symbol) => {
    const tokenLogoObject = tokenLogos.find((token) => token.symbol === symbol);
    return tokenLogoObject ? tokenLogoObject.logo : null;
  };

  const abis = {
    1: ercAbi,
    11155111: ercAbi,
    56: bscAbi,
    568: dogeAbi,
    137: polyAbi,
    42161: ercAbi,
    5: ercAbi,
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
    } else if (selectedChain === goerlichain) {
      tokenListKey = "goerlichainTokens";
    } else if (selectedChain === sepoliachain) {
      tokenListKey = "sepoliachainTokens";
    }

    const storedTokens = JSON.parse(localStorage.getItem(tokenListKey)) || [];
    const updatedTokens = storedTokens.filter(
      (token) => token.symbol !== symbol
    );
    // Amână ștergerea după 5 secunde
    setTimeout(() => {
      localStorage.setItem(tokenListKey, JSON.stringify(updatedTokens));
      fetchTokenBalances();
    }, 500);
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
    } else if (selectedChain === goerlichain) {
      return "ETH Goerli";
    } else if (selectedChain === sepoliachain) {
      return "ETH Sepolia";
    }
    return "";
  };

  return (
    <div className="tokenList">
      <Box>
        <List style={{ maxHeight: "300px", overflowY: "auto" }}>
          <ListItem
            className="token"
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
              primaryTypographyProps={{
                style: { color: "#f4f3f2", fontWeight: "bold" },
              }}
              secondaryTypographyProps={{
                style: { color: "#f4f3f2" },
              }}
            />
          </ListItem>
          {Object.keys(tokenBalances).map((symbol) => {
            const token = tokens.find((token) => token.symbol === symbol);
            const logoUrl = findLogoUrl(symbol);

            if (token && symbol) {
              return (
                <ListItem
                  className="token"
                  button
                  key={symbol}
                  onClick={() => {
                    handleTokenClick(symbol);
                    // Adaugă apelul către onTokenBalanceClick pentru a transmite datele către Send
                    onTokenBalanceClick(tokenBalances[symbol]);
                  }}
                >
                  <ListItemAvatar>
                    <Avatar alt={tokenBalances[symbol].name} src={logoUrl} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={tokenBalances[symbol].balance}
                    secondary={tokenBalances[symbol].name}
                    primaryTypographyProps={{
                      style: { color: "#f4f3f2", fontWeight: "bold" },
                    }}
                    secondaryTypographyProps={{
                      style: { color: "#f4f3f2" },
                    }}
                  />
                  <Button
                    onClick={(event) => {
                      event.stopPropagation();
                      handleTokenRemove(symbol);
                    }}
                    sx={{ color: "#f4f3f2" }}
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
    </div>
  );
}
