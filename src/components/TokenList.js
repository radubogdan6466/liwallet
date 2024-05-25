import React, { useState, useEffect } from "react";
import bscAbi from "../JsonFiles/testBnbAbi.json";
import ercAbi from "../JsonFiles/testErcAbi.json";
import dogeAbi from "../JsonFiles/testDogeAbi.json";
import polyAbi from "../JsonFiles/testPolyAbi.json";
import pulseAbi from "../JsonFiles/pulseAbi.json";
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
import "./tokenList.css";

export default function TokenList({
  userWallet,
  web3,
  selectedChain,
  ethchain,
  bnbchain,
  dogechain,
  polychain,
  basechain,
  avalanchechain,
  opMainnetChain,
  cronosMainnetChain,
  lineaMainnetChain,
  mantleMainnetChain,
  pulseMainnetChain,
  ethBalance,
  arbitrumchain,
  goerlichain,
  sepoliachain,
  fantomChain,
  gnosisChain,
  celoChain,
  harmonyChain,
  blastChain,
  zetaChain,
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
  } else if (selectedChain === basechain) {
    tokens = JSON.parse(localStorage.getItem("basechainTokens")) || [];
  } else if (selectedChain === avalanchechain) {
    tokens = JSON.parse(localStorage.getItem("avalanchechainTokens")) || [];
  } else if (selectedChain === opMainnetChain) {
    tokens = JSON.parse(localStorage.getItem("opMainnetChainTokens")) || [];
  } else if (selectedChain === cronosMainnetChain) {
    tokens = JSON.parse(localStorage.getItem("cronosMainnetChainTokens")) || [];
  } else if (selectedChain === lineaMainnetChain) {
    tokens = JSON.parse(localStorage.getItem("lineaMainnetChainTokens")) || [];
  } else if (selectedChain === mantleMainnetChain) {
    tokens = JSON.parse(localStorage.getItem("mantleMainnetChainTokens")) || [];
  } else if (selectedChain === pulseMainnetChain) {
    tokens = JSON.parse(localStorage.getItem("pulseMainnetChainTokens")) || [];
  } else if (selectedChain === fantomChain) {
    tokens = JSON.parse(localStorage.getItem("fantomChainTokens")) || [];
  } else if (selectedChain === gnosisChain) {
    tokens = JSON.parse(localStorage.getItem("gnosisChainTokens")) || [];
  } else if (selectedChain === celoChain) {
    tokens = JSON.parse(localStorage.getItem("celoChainTokens")) || [];
  } else if (selectedChain === harmonyChain) {
    tokens = JSON.parse(localStorage.getItem("harmonyChainTokens")) || [];
  } else if (selectedChain === blastChain) {
    tokens = JSON.parse(localStorage.getItem("blastChainTokens")) || [];
  } else if (selectedChain === zetaChain) {
    tokens = JSON.parse(localStorage.getItem("zetaChainTokens")) || [];
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
    2000: dogeAbi,
    137: polyAbi,
    42161: ercAbi,
    5: ercAbi,
    8453: ercAbi,
    43114: ercAbi,
    10: ercAbi,
    25: ercAbi,
    59144: ercAbi,
    5000: ercAbi,
    369: pulseAbi,
    250: ercAbi,
    100: ercAbi,
    42220: ercAbi,
    1666600000: ercAbi,
    81457: ercAbi,
    7000: ercAbi,
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
    } else if (selectedChain === basechain) {
      tokenListKey = "basechainTokens";
    } else if (selectedChain === avalanchechain) {
      tokenListKey = "avalanchechainTokens";
    } else if (selectedChain === opMainnetChain) {
      tokenListKey = "opMainnetChainTokens";
    } else if (selectedChain === cronosMainnetChain) {
      tokenListKey = "cronosMainnetChainTokens";
    } else if (selectedChain === lineaMainnetChain) {
      tokenListKey = "lineaMainnetChainTokens";
    } else if (selectedChain === mantleMainnetChain) {
      tokenListKey = "mantleMainnetChainTokens";
    } else if (selectedChain === pulseMainnetChain) {
      tokenListKey = "pulseMainnetChainTokens";
    } else if (selectedChain === fantomChain) {
      tokenListKey = "fantomChainTokens";
    } else if (selectedChain === gnosisChain) {
      tokenListKey = "gnosisChainTokens";
    } else if (selectedChain === celoChain) {
      tokenListKey = "celoChainTokens";
    } else if (selectedChain === harmonyChain) {
      tokenListKey = "harmonyChainTokens";
    } else if (selectedChain === blastChain) {
      tokenListKey = "blastChainTokens";
    } else if (selectedChain === zetaChain) {
      tokenListKey = "zetaChainTokens";
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
      return "ETH Token";
    } else if (selectedChain === goerlichain) {
      return "ETH Token";
    } else if (selectedChain === sepoliachain) {
      return "ETH Token";
    } else if (selectedChain === basechain) {
      return "ETH Token";
    } else if (selectedChain === avalanchechain) {
      return "AVAX";
    } else if (selectedChain === opMainnetChain) {
      return "ETH Token";
    } else if (selectedChain === cronosMainnetChain) {
      return "CRO";
    } else if (selectedChain === lineaMainnetChain) {
      return "ETH Token";
    } else if (selectedChain === mantleMainnetChain) {
      return "MNT";
    } else if (selectedChain === pulseMainnetChain) {
      return "PLS";
    } else if (selectedChain === fantomChain) {
      return "FTM";
    } else if (selectedChain === gnosisChain) {
      return "XDAI";
    } else if (selectedChain === celoChain) {
      return "CELO";
    } else if (selectedChain === harmonyChain) {
      return "ONE";
    } else if (selectedChain === blastChain) {
      return "ETH";
    } else if (selectedChain === zetaChain) {
      return "ZETA";
    }
    return "";
  };

  return (
    <div className="tokenList">
      <div>
        <List
          style={{
            height: "250px",
            width: "300px",
            overflowY: "auto",
          }}
        >
          <ListItem
            className="token"
            button
            key={getNativeCurrency(selectedChain)}
            onClick={() => handleTokenClick(getNativeCurrency(selectedChain))}
            sx={{ padding: "5px", margin: "0" }}
          >
            <ListItemAvatar sx={{ width: "30px", height: "30px" }}>
              <Avatar
                className="logoimg"
                alt={getNativeCurrency(selectedChain)}
                src={findLogoUrl(getNativeCurrency(selectedChain))}
                sx={{ width: "30px", height: "30px" }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={ethBalance}
              secondary={getNativeCurrency(selectedChain)}
              primaryTypographyProps={{
                style: {
                  color: "#f4f3f2",
                  fontWeight: "bold",
                  fontSize: "14px",
                },
              }}
              secondaryTypographyProps={{
                style: { color: "#f4f3f2", fontSize: "14px" },
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
                  divider
                  button
                  key={symbol}
                  onClick={() => {
                    handleTokenClick(symbol);
                    // Adaugă apelul către onTokenBalanceClick pentru a transmite datele către Send
                    onTokenBalanceClick(tokenBalances[symbol]);
                  }}
                  sx={{ padding: "5px", margin: "0" }}
                >
                  <ListItemAvatar sx={{ width: "30px", height: "30px" }}>
                    <Avatar
                      className="logoimg"
                      alt={tokenBalances[symbol].name}
                      src={logoUrl}
                      sx={{ width: "30px", height: "30px" }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    className="itemText"
                    primary={tokenBalances[symbol].balance}
                    secondary={tokenBalances[symbol].name}
                    primaryTypographyProps={{
                      style: {
                        color: "#f4f3f2",
                        fontWeight: "bold",
                        fontSize: "14px",
                      },
                    }}
                    secondaryTypographyProps={{
                      style: {
                        color: "#f4f3f2",
                        fontSize: "14px",
                      },
                    }}
                  />
                  <Button
                    onClick={(event) => {
                      event.stopPropagation();
                      handleTokenRemove(symbol);
                    }}
                    sx={{ color: "#f4f3f2", fontSize: "13px" }}
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
      </div>
    </div>
  );
}
