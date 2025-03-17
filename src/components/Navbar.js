import React, { useState, useEffect } from "react";
import { Clipboard } from "@capacitor/clipboard";
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
  holeskychain,
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
  //new
  apechain,
  arbitrumnovachain,
  berachain,
  bttcchain,
  fraxchain,
  memecorechain,
  moonbeamchain,
  moonriverchain,
  opbnbchain,
  scrollchain,
  sonicchain,
  swellchain,
  taikoalethiachain,
  unichain,
  wemixchain,
  xaichain,
  xdcchain,
  zksyncerachain,
  zircuitchain,
}) {
  const [coinPrice, setCoinPrice] = useState(null);

  const chainToCoinID = {
    [ethchain]: "ethusdt",
    [bnbchain]: "bnbusdt",
    [polychain]: "polusdt",
    [dogechain]: "dogeusdt",
    [arbitrumchain]: "ethusdt",
    [goerlichain]: "ethusdt",
    [sepoliachain]: "ethusdt",
    [holeskychain]: "ethusdt",
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
    //new MODIFICA COIN NAME MODIFICA COIN NAME MODIFICA COIN NAME MODIFICA COIN NAME MODIFICA COIN NAME
    [apechain]: "apeusdt",
    [arbitrumnovachain]: "ethusdt",
    [berachain]: "berausdt",
    [bttcchain]: "bttcusdt",
    [fraxchain]: "fraxusdt",
    [memecorechain]: "memeusdt",
    [moonbeamchain]: "glmrusdt",
    [moonriverchain]: "movrusdt",
    [opbnbchain]: "opbnbusdt",
    [scrollchain]: "scrlusdt",
    [sonicchain]: "susdt",
    [swellchain]: "ethusdt",
    [taikoalethiachain]: "ethusdt",
    [unichain]: "ethusdt",
    [wemixchain]: "wemixusdt",
    [xaichain]: "xaiusdt",
    [xdcchain]: "xdcusdt",
    [zksyncerachain]: "zksusdt",
    [zircuitchain]: "zircuitusdt",
  };

  useEffect(() => {
    const ws = new WebSocket(
      `wss://data-stream.binance.com/ws/${chainToCoinID[selectedChain]}@trade`
    );
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCoinPrice(parseFloat(data.p).toFixed(5));
      ws.close();
    };
    // return () => {
    //   ws.close();
    // };
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
          : selectedChain === holeskychain
          ? "   ETH"
          : selectedChain === basechain
          ? "   ETH base"
          : selectedChain === avalanchechain
          ? "   AVAX"
          : selectedChain === opMainnetChain
          ? "   ETH op"
          : selectedChain === cronosMainnetChain
          ? "   CRO"
          : selectedChain === lineaMainnetChain
          ? "   ETH linea"
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
          ? "   ETH blast"
          : selectedChain === zetaChain
          ? "   ZETA"
          : //NEW
          selectedChain === apechain
          ? "   APE"
          : selectedChain === arbitrumnovachain
          ? "   ETH Arbitrum Nova"
          : selectedChain === berachain
          ? "   BERA"
          : selectedChain === bttcchain
          ? "   BTT"
          : selectedChain === fraxchain
          ? "   frxETH"
          : selectedChain === memecorechain
          ? "   M"
          : selectedChain === moonbeamchain
          ? "   GLMR"
          : selectedChain === moonriverchain
          ? "   MOVR"
          : selectedChain === opbnbchain
          ? "   BNB opbnb"
          : selectedChain === scrollchain
          ? "   ETH scroll"
          : selectedChain === sonicchain
          ? "   S"
          : selectedChain === swellchain
          ? "   ETH swell"
          : selectedChain === taikoalethiachain
          ? "   ETH taiko"
          : selectedChain === unichain
          ? "   ETH unichain"
          : selectedChain === wemixchain
          ? "   WEMIX"
          : selectedChain === xaichain
          ? "   XAI"
          : selectedChain === xdcchain
          ? "   XDC"
          : selectedChain === zksyncerachain
          ? "   ETH zksync"
          : selectedChain === zircuitchain
          ? "   ETH zircuit"
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
  holeskychain,
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
  //NEW
  apechain,
  arbitrumnovachain,
  berachain,
  bttcchain,
  fraxchain,
  memecorechain,
  moonbeamchain,
  moonriverchain,
  opbnbchain,
  scrollchain,
  sonicchain,
  swellchain,
  taikoalethiachain,
  unichain,
  wemixchain,
  xaichain,
  xdcchain,
  zksyncerachain,
  zircuitchain,
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
          holeskychain={holeskychain}
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
          //NEW
          apechain={apechain}
          arbitrumnovachain={arbitrumnovachain}
          berachain={berachain}
          bttcchain={bttcchain}
          fraxchain={fraxchain}
          memecorechain={memecorechain}
          moonbeamchain={moonbeamchain}
          moonriverchain={moonriverchain}
          opbnbchain={opbnbchain}
          scrollchain={scrollchain}
          sonicchain={sonicchain}
          swellchain={swellchain}
          taikoalethiachain={taikoalethiachain}
          unichain={unichain}
          wemixchain={wemixchain}
          xaichain={xaichain}
          xdcchain={xdcchain}
          zksyncerachain={zksyncerachain}
          zircuitchain={zircuitchain}
        />
      </div>
    </div>
  );
}
