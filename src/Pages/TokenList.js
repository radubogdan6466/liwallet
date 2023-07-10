import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { ethchainTokens, bnbchainTokens, dogechainTokens } from "./tokens";

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

        // add ETH to the token balances

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
  }, [userWallet, web3, ethBalance]);

  return (
    <div className="homePage-token-balances">
      {Object.keys(tokenBalances).map((symbol) => {
        if (
          (selectedChain === ethchain &&
            tokens.find((token) => token.symbol === symbol)) ||
          (selectedChain === bnbchain &&
            tokens.find((token) => token.symbol === symbol)) ||
          (selectedChain === dogechain &&
            tokens.find((token) => token.symbol === symbol))
        ) {
          return (
            <p
              className="value"
              key={symbol}
              onClick={() => handleTokenClick(symbol)}
            >
              {tokenBalances[symbol].balance} {tokenBalances[symbol].name}
            </p>
          );
        }
        return null;
      })}
    </div>
  );
}
