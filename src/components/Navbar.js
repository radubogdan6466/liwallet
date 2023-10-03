// NavBar.js
import React from "react";
import { ContentCopy } from "@mui/icons-material";
import ChainSelector from "../hooks/ChainSelector";
import Meniu from "./Navigate";
import { Clipboard } from "@capacitor/clipboard";
import "./nav.css";

export default function NavBar({
  selectedChain,
  handleChainChange,
  userWallet,
  copyAddress,
}) {
  function copyAddress(address) {
    Clipboard.write({
      string: address,
    })
      .then(() => {
        const copyMessage = document.getElementById("copyMessage");
        copyMessage.textContent = "Adresa copiată!";
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
    5
  )}...${userWallet.address.substring(userWallet.address.length - 4)}`;

  return (
    <div className="nav-container">
      <div className="nav-chain">
        <ChainSelector
          selectedChain={selectedChain}
          handleChainChange={handleChainChange}
        />
      </div>
      <div className="nav-address">
        <button
          className="account-button"
          onClick={() => copyAddress(userWallet.address)}
          endIcon={<ContentCopy />}
        >
          {shortenedAddress}
        </button>
        <p id="copyMessage"></p>
      </div>
      <div className="nav-menu">
        <Meniu />
      </div>
    </div>
  );
}
