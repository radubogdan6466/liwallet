import { useEffect } from "react";
import "../App.css";
import React, { useState } from "react";
import Web3 from "web3";
import Send from "./SendPage";
import mimabi from "../mimabi";
import binanceAbi from "../binance";
import ChainSelector from "./ChainSelector";
import { bnbchain, ethchain, dogechain } from "./ChainSelector";
import Meniu from "./Navigate";
import CheckUser from "./CheckUser";
import { ethchainTokens, bnbchainTokens, dogechainTokens } from "./tokens";
import TokenList from "./TokenList";
import NativeChainValue from "./NativeChainValue";
export default function Home() {
  const [selectedChain, setSelectedChain] = useState(ethchain);
  const [web3, setWeb3] = useState(
    new Web3(new Web3.providers.HttpProvider(ethchain))
  );
  const [userWallet, setUserWallet] = useState(null);
  const [tokenBalances, setTokenBalances] = useState({});
  const [ethBalance, setEthBalance] = useState(0);
  const privateKey = localStorage.getItem("pkey");
  const [showSendPopup, setShowSendPopup] = useState(false);
  const { address } = userWallet || {};
  const [selectedToken, setSelectedToken] = useState("ETH");

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
    setWeb3(new Web3(new Web3.providers.HttpProvider(selectedChain)));
  }, [selectedChain]);
  useEffect(() => {
    const fetchTokenBalances = async () => {
      if (userWallet) {
        const balances = { ...tokenBalances };

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
  }, [userWallet, web3]);
  useEffect(() => {
    const fetchBalance = async () => {
      if (userWallet) {
        const balance = await web3.eth.getBalance(userWallet.address);
        const balanceInEth = web3.utils.fromWei(balance, "ether");
        setEthBalance(balanceInEth);
      }
    };
    fetchBalance();
  }, [userWallet, web3, address]);
  useEffect(() => {
    if (privateKey) {
      const account = web3.eth.accounts.wallet.add(privateKey);
      setUserWallet(account);
    }
  }, [privateKey, web3]);

  function copyAddress(address) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(address)
        .then(() => {
          const copyMessage = document.getElementById("copyMessage");
          copyMessage.textContent = "Address copied!";
          setTimeout(() => {
            copyMessage.textContent = "";
          }, 1000);
        })
        .catch((error) => {
          console.error("Error copying address:", error);
        });
    }
  }
  function handleTokenClick(tokenSymbol) {
    setSelectedToken(tokenSymbol);
    setShowSendPopup(true);
  }
  const handleChainChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedChain(selectedValue);
  };
  if (!userWallet) {
    return <CheckUser />;
  }
  /**
   * 
   * 
   *  <NativeChainValue
        userWallet={userWallet}
        web3={web3}
        selectedChain={selectedChain}
        ethchain={ethchain}
        bnbchain={bnbchain}
        dogechain={dogechain}
      />
   */
  const shortenedAddress = `${userWallet.address.substring(
    0,
    5
  )}...${userWallet.address.substring(userWallet.address.length - 4)}`;
  return (
    <div className="homePage">
      <div className="homePage-nav-container">
        {/* Navigation */}
        <Meniu />
        {/* ChainSelector */}
        <ChainSelector
          selectedChain={selectedChain}
          handleChainChange={handleChainChange}
          bnbchain={bnbchain}
          ethchain={ethchain}
          dogechain={dogechain}
        />
      </div>

      {/* Main Content */}
      <div className="homePage-container">
        {/* Address Display */}
        <div className="homePage-address-display">
          <p className="connected-address">Account</p>
          <button
            className="homePage-selected-account"
            onClick={() => copyAddress(userWallet.address)}
          >
            {shortenedAddress}
          </button>
          <p id="copyMessage"></p>
        </div>

        {/* Value Display */}
        <div className="homePage-value-display">
          <p className="value" id="bal">
            {ethBalance}{" "}
            {selectedChain === ethchain
              ? "ETH"
              : selectedChain === bnbchain
              ? "BNB"
              : "DOGE"}
          </p>
          <div className="homePage-token-balances">
            {/* Token Balances */}
            <TokenList
              userWallet={userWallet}
              web3={web3}
              selectedChain={selectedChain}
              ethchain={ethchain}
              bnbchain={bnbchain}
              dogechain={dogechain}
              ethBalance={ethBalance}
              handleTokenClick={handleTokenClick}
            />
          </div>
        </div>

        {/* Button Box */}
        <div className="homePage-button-box">
          <button
            onClick={() => setShowSendPopup(true)}
            className="homePage-send-button"
          >
            Send
          </button>
        </div>

        {showSendPopup && (
          <div className="popup-overlay">
            <div className="sendeth-popup">
              <Send
                onClose={() => setShowSendPopup(false)}
                selectedToken={selectedToken}
                selectedChain={selectedChain}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
