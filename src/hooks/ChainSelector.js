import React, { useState } from "react";
import {
  bnbchain,
  ethchain,
  dogechain,
  polychain,
  arbitrumchain,
  goerlichain,
  sepoliachain,
} from "./utils.js";
import { IonActionSheet, IonButton } from "@ionic/react";

import binanceLogo from "../logos/bnbChain.png";
import ethereumLogo from "../logos/ethLogo.png";
import arbitrumLogo from "../logos/arbitrum.png";
import polygonLogo from "../logos/polygon.png";
import dogeLogo from "../logos/dogecoin.png";

function ChainSelector({ selectedChain, handleChainChange }) {
  const [logo, setLogo] = useState(binanceLogo);
  const [showTestChains, setShowTestChains] = useState(false);

  // const logResult = (result) => {
  //   console.log(JSON.stringify(result, null, 2));
  // };

  const handleLogoChange = (chain) => {
    switch (chain) {
      case bnbchain:
        setLogo(binanceLogo);
        break;
      case ethchain:
        setLogo(ethereumLogo);
        break;
      case polychain:
        setLogo(polygonLogo);
        break;
      case arbitrumchain:
        setLogo(arbitrumLogo);
        break;
      case dogechain:
        setLogo(dogeLogo);
        break;
      case goerlichain:
        setLogo(ethereumLogo);
        break;
      case sepoliachain:
        setLogo(ethereumLogo);
        break;
      default:
        setLogo(binanceLogo);
    }
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
      text: "Cancel",
      role: "cancel",
    },
  ];
  // test chain
  const testButtons = [
    {
      text: "Goerli Testnet",
      handler: () => {
        handleChainChange(goerlichain);
        handleLogoChange(goerlichain);
      },
    },
    {
      text: "Sepolia Testnet",
      handler: () => {
        handleChainChange(sepoliachain);
        handleLogoChange(sepoliachain);
      },
    },
    {
      text: "Cancel",
      role: "cancel",
    },
  ];
  const combinedButtons = [
    ...buttons,
    { text: "Test Chains", handler: () => {} },
    ...testButtons,
  ];

  return (
    <div className="container">
      <IonButton
        size="large"
        fill="clear"
        onClick={() => {
          const actionSheet = document.querySelector("#chain-selector-sheet");
          actionSheet.present();
          //console.log("Button clicked!");
        }}
      >
        <img src={logo} alt="Chain Logo" style={{ height: "40px" }} />
      </IonButton>
      <IonActionSheet
        id="chain-selector-sheet"
        header="Select Chain"
        buttons={combinedButtons}
        // onDidDismiss={(event) => logResult(event.detail)}
      ></IonActionSheet>
    </div>
  );
}

export default ChainSelector;
