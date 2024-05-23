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
  basechain,
  avalanchechain,
  opMainnetChain,
  cronosMainnetChain,
  lineaMainnetChain,
  mantleMainnetChain,
  pulseMainnetChain,
  fantomChain,
  gnosisChain,
  celoChain,
  harmonyChain,
  blastChain,
  zetaChain,
}) {
  const [coinPrice, setCoinPrice] = useState(null);

  const chainToCoinID = {
    [ethchain]: "ethusdt",
    [bnbchain]: "bnbusdt",
    [polychain]: "maticusdt",
    [dogechain]: "dogeusdt",
    [arbitrumchain]: "ethusdt",
    [goerlichain]: "ethusdt",
    [sepoliachain]: "ethusdt",
    [basechain]: "ethusdt",
    [avalanchechain]: "avaxusdt",
    [opMainnetChain]: "ethusdt",
    [cronosMainnetChain]: "crousdt",
    [lineaMainnetChain]: "ethusdt",
    [mantleMainnetChain]: "mntusdt",
    [pulseMainnetChain]: "plsusdt",
    [fantomChain]: "ftmusdt",
    [gnosisChain]: "xdaiusdt",
    [celoChain]: "celousdt",
    [harmonyChain]: "oneusdt",
    [blastChain]: "ethusdt",
    [zetaChain]: "zetausdt",
  };

  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${chainToCoinID[selectedChain]}@trade`
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCoinPrice(parseFloat(data.p).toFixed(5));
    };

    return () => {
      ws.close();
    };
  }, [selectedChain]);
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
          ? "   ETH"
          : selectedChain === sepoliachain
          ? "   ETH"
          : selectedChain === basechain
          ? "   ETH"
          : selectedChain === avalanchechain
          ? "   AVAX"
          : selectedChain === opMainnetChain
          ? "   ETH"
          : selectedChain === cronosMainnetChain
          ? "   CRO"
          : selectedChain === lineaMainnetChain
          ? "   ETH"
          : selectedChain === mantleMainnetChain
          ? "   MNT"
          : selectedChain === pulseMainnetChain
          ? "   PLS"
          : selectedChain === fantomChain
          ? "   FTM"
          : selectedChain === gnosisChain
          ? "   XDAI"
          : selectedChain === celoChain
          ? "   CELO"
          : selectedChain === harmonyChain
          ? "   ONE"
          : selectedChain === blastChain
          ? "   ETH"
          : selectedChain === zetaChain
          ? "   ZETA"
          : "   Unknown Chain"}
      </h1>
      <div>
        <div className="balance-in-usd-container">
          <p className="balance-text">Balance:</p>
          <p className="value-price">
            $
            {coinPrice !== null
              ? (coinPrice * ethBalance).toFixed(5)
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
  basechain,
  avalanchechain,
  opMainnetChain,
  cronosMainnetChain,
  lineaMainnetChain,
  mantleMainnetChain,
  pulseMainnetChain,
  fantomChain,
  gnosisChain,
  celoChain,
  harmonyChain,
  blastChain,
  zetaChain,
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
    10
  )}...${userWallet.address.substring(userWallet.address.length - 10)}`;

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
          basechain={basechain}
          avalanchechain={avalanchechain}
          opMainnetChain={opMainnetChain}
          cronosMainnetChain={cronosMainnetChain}
          lineaMainnetChain={lineaMainnetChain}
          mantleMainnetChain={mantleMainnetChain}
          pulseMainnetChain={pulseMainnetChain}
          fantomChain={fantomChain}
          gnosisChain={gnosisChain}
          celoChain={celoChain}
          harmonyChain={harmonyChain}
          blastChain={blastChain}
          zetaChain={zetaChain}
        />
      </div>
    </div>
  );
}
