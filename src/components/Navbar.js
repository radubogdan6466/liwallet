import React, { useState, useEffect } from "react";
import { Clipboard } from "@capacitor/clipboard";
import axios from "axios";
import "./nav.css";
// DISPLAY NATIVE CHAIN BALANCE
function Balance({
  ethBalance,
  selectedChain,
  ethchain,
  bnbchain,
  polychain,
  dogechain,
  arbitrumchain,
  goerlichain,
  sepoliachain,
}) {
  const [coinPrice, setCoinPrice] = useState(null);
  const chainToCoinID = {
    [ethchain]: "ethereum",
    [bnbchain]: "binancecoin",
    [polychain]: "matic-network",
    [dogechain]: "dogecoin",
    [arbitrumchain]: "arbitrum",
    [goerlichain]: "ethereum",
    [sepoliachain]: "ethereum",
  };

  useEffect(() => {
    if (selectedChain in chainToCoinID) {
      axios
        .get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${chainToCoinID[selectedChain]}&vs_currencies=usd`
        )
        .then((response) => {
          setCoinPrice(response.data[chainToCoinID[selectedChain]].usd);
        })
        .catch((error) => {
          //console.error(`Error fetching ${selectedChain} price: `, error);
          setCoinPrice(null);
        });
    } else {
      setCoinPrice(null);
    }
  }, [selectedChain, chainToCoinID]);
  return (
    <div className="balance-native-navbar">
      <h1 className="balance-native-navbar-title">
        {/**Display native balance */}
        {Number(ethBalance).toFixed(4)}
        {selectedChain === ethchain
          ? "   ETH"
          : selectedChain === bnbchain
          ? "   BNB"
          : selectedChain === polychain
          ? "   MATIC"
          : selectedChain === dogechain
          ? "   DOGECOIN"
          : selectedChain === arbitrumchain
          ? "   ETH"
          : selectedChain === goerlichain
          ? "   ETH Goerli"
          : selectedChain === sepoliachain
          ? "   ETH Sepolia"
          : "   Unknown Chain"}
      </h1>
      <div>
        <div className="balance-in-usd-container">
          <p className="balance-text">Balance:</p>
          <p className="value-price">
            $
            {coinPrice !== null
              ? (coinPrice * ethBalance).toFixed(2)
              : "Loading..."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function NavBar({
  selectedChain,
  userWallet,
  copyAddress,
  ethBalance,
  ethchain,
  bnbchain,
  dogechain,
  polychain,
  arbitrumchain,
  goerlichain,
  sepoliachain,
}) {
  function copyAddress(address) {
    Clipboard.write({
      string: address,
    })
      .then(() => {
        const copyMessage = document.getElementById("copyMessage");
        copyMessage.textContent = "Adress coppied!";
        setTimeout(() => {
          copyMessage.textContent = "";
        }, 1000);
      })
      .catch((error) => {
        console.error("Eroare la copierea adresei:", error);
      });
  }
  const shortenedAddress = `${userWallet.address.substring(
    0,
    6
  )}...${userWallet.address.substring(userWallet.address.length - 6)}`;

  return (
    <div className="nav-container">
      <div className="account-button-title">
        <p>Address:</p>
        <p
          className="account-button-nav"
          onClick={() => copyAddress(userWallet.address)}
        >
          {shortenedAddress}
        </p>
      </div>
      <span className="span-copy-address" id="copyMessage"></span>
      <div>
        <Balance
          className="balance-native-navbar-component"
          ethBalance={ethBalance}
          selectedChain={selectedChain}
          ethchain={ethchain}
          bnbchain={bnbchain}
          dogechain={dogechain}
          polychain={polychain}
          arbitrumchain={arbitrumchain}
          goerlichain={goerlichain}
          sepoliachain={sepoliachain}
        />
      </div>
    </div>
  );
}
