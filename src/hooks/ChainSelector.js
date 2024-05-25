import React, { useState } from "react";
import {
  bnbchain,
  ethchain,
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
} from "./utils.js";
import { IonActionSheet, IonButton } from "@ionic/react";
import "./ChainSelector.css";
import binanceLogo from "../logos/bnbChain.png";
import ethereumLogo from "../logos/ethLogo.png";
import arbitrumLogo from "../logos/arbitrum.png";
import polygonLogo from "../logos/polygon.png";
import dogeLogo from "../logos/dogechain.png";
import baseChainLogo from "../logos/basechain.png";
import avalancheChainLogo from "../logos/avalanche.png";
import opMainnetLogo from "../logos/opMainnet.png";
import cronosMainnetLogo from "../logos/cronosMainnet.png";
import lineaMainnetLogo from "../logos/lineaMainnet.png";
import mantleMainnetLogo from "../logos/mantleMainnet.png";
import pulseMainnetLogo from "../logos/pulseMainnet.png";

import fantomChainLogo from "../logos/fantom.png";
import gnosisChainLogo from "../logos/gnosis.svg";
import celoChainLogo from "../logos/celo.svg";
import harmonyChainLogo from "../logos/harmony.png";
import blastChainLogo from "../logos/blast.png";
import zetaChainLogo from "../logos/zeta.png";

function ChainSelector({ selectedChain, handleChainChange }) {
  const getLogo = (chain) => {
    switch (chain) {
      case bnbchain:
        return binanceLogo;
      case ethchain:
        return ethereumLogo;
      case polychain:
        return polygonLogo;
      case arbitrumchain:
        return arbitrumLogo;
      case dogechain:
        return dogeLogo;
      case goerlichain:
        return ethereumLogo;
      case sepoliachain:
        return ethereumLogo;
      case basechain:
        return baseChainLogo;
      case avalanchechain:
        return avalancheChainLogo;
      case opMainnetChain:
        return opMainnetLogo;
      case cronosMainnetChain:
        return cronosMainnetLogo;
      case lineaMainnetChain:
        return lineaMainnetLogo;
      case mantleMainnetChain:
        return mantleMainnetLogo;
      case pulseMainnetChain:
        return pulseMainnetLogo;

      case fantomChain:
        return fantomChainLogo;
      case gnosisChain:
        return gnosisChainLogo;
      case celoChain:
        return celoChainLogo;
      case harmonyChain:
        return harmonyChainLogo;
      case blastChain:
        return blastChainLogo;
      case zetaChain:
        return zetaChainLogo;

      default:
        return binanceLogo;
    }
  };

  const [logo, setLogo] = useState(getLogo(selectedChain));
  const [showTestChains, setShowTestChains] = useState(false);

  const handleLogoChange = (chain) => {
    setLogo(getLogo(chain));
  };

  const buttons = [
    {
      text: "BNB Smart Chain",
      handler: () => {
        handleChainChange(bnbchain);
        handleLogoChange(bnbchain);
      },
    },
    {
      text: "Ethereum Mainnet",
      handler: () => {
        handleChainChange(ethchain);
        handleLogoChange(ethchain);
      },
    },
    {
      text: "Polygon Mainnet",
      handler: () => {
        handleChainChange(polychain);
        handleLogoChange(polychain);
      },
    },
    {
      text: "Arbitrum One",
      handler: () => {
        handleChainChange(arbitrumchain);
        handleLogoChange(arbitrumchain);
      },
    },
    {
      text: "Dogecoin ERC20",
      handler: () => {
        handleChainChange(dogechain);
        handleLogoChange(dogechain);
      },
    },
    {
      text: "Base Chain",
      handler: () => {
        handleChainChange(basechain);
        handleLogoChange(basechain);
      },
    },
    {
      text: "Avalanche Chain",
      handler: () => {
        handleChainChange(avalanchechain);
        handleLogoChange(avalanchechain);
      },
    },
    {
      text: "OPMainnet Chain",
      handler: () => {
        handleChainChange(opMainnetChain);
        handleLogoChange(opMainnetChain);
      },
    },
    {
      text: "Cronos Mainnet",
      handler: () => {
        handleChainChange(cronosMainnetChain);
        handleLogoChange(cronosMainnetChain);
      },
    },
    {
      text: "Linea Mainnet",
      handler: () => {
        handleChainChange(lineaMainnetChain);
        handleLogoChange(lineaMainnetChain);
      },
    },
    {
      text: "Mantle Mainnet",
      handler: () => {
        handleChainChange(mantleMainnetChain);
        handleLogoChange(mantleMainnetChain);
      },
    },
    {
      text: "Pulse Mainnet",
      handler: () => {
        handleChainChange(pulseMainnetChain);
        handleLogoChange(pulseMainnetChain);
      },
    },

    {
      text: "Fantom Mainnet",
      handler: () => {
        handleChainChange(fantomChain);
        handleLogoChange(fantomChain);
      },
    },
    {
      text: "Gnosis Mainnet",
      handler: () => {
        handleChainChange(gnosisChain);
        handleLogoChange(gnosisChain);
      },
    },
    {
      text: "Celo Mainnet",
      handler: () => {
        handleChainChange(celoChain);
        handleLogoChange(celoChain);
      },
    },
    {
      text: "Harmony Mainnet",
      handler: () => {
        handleChainChange(harmonyChain);
        handleLogoChange(harmonyChain);
      },
    },
    {
      text: "Blast Mainnet",
      handler: () => {
        handleChainChange(blastChain);
        handleLogoChange(blastChain);
      },
    },
    {
      text: "Zeta Mainnet",
      handler: () => {
        handleChainChange(zetaChain);
        handleLogoChange(zetaChain);
      },
    },
    {
      text: "TEST NETWORKS",
      data: {
        action: "delete",
      },
    },
    {
      text: "Sepolia testnet",
      handler: () => {
        handleChainChange(sepoliachain);
        handleLogoChange(sepoliachain);
      },
    },
    {
      text: "Goerli testnet",
      handler: () => {
        handleChainChange(goerlichain);
        handleLogoChange(goerlichain);
      },
    },

    {
      text: "Cancel",
      role: "cancel",
    },
  ];

  return (
    <div className="container">
      <IonButton
        size="large"
        fill="clear"
        onClick={() => {
          const actionSheet = document.querySelector("#chain-selector-sheet");
          actionSheet.present();
        }}
      >
        <img src={logo} alt="Chain Logo" style={{ height: "40px" }} />
      </IonButton>
      <IonActionSheet
        className="my-custom-class"
        id="chain-selector-sheet"
        header="Select Chain"
        buttons={buttons}
      ></IonActionSheet>
    </div>
  );
}

export default ChainSelector;
