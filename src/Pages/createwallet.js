import React from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

export default function CreateWallet() {
  const userWalletKeys = ethers.Wallet.createRandom();
  const mnemonic = userWalletKeys.mnemonic;
  const words = mnemonic.phrase.split(" ");
  let navigate = useNavigate();
  localStorage.setItem("mnem", mnemonic.phrase);
  const keys = words.map((word, index) => `${index + 1}: ${word}`);

  const create = () => {
    localStorage.setItem("pkey", userWalletKeys.privateKey);
    navigate("/");
  };
  const gocreate = () => {
    navigate("/create");
  };
  const gologin = () => {
    navigate("/login");
  };
  const goSettings = () => {
    navigate("/settings");
  };
  const goHome = () => {
    navigate("/");
  };
  return (
    <div className="createPage">
      <div className="createPage-nav-container">
        <div className="createPage-dropdown">
          <button>Menu &#9662;</button>
          <div className="createPage-dropdown-content">
            <button onClick={gocreate}>Create</button>
            <button onClick={gologin}>Login</button>
            <button onClick={goSettings}>Settings</button>
          </div>
        </div>
        <button className="createPage-homeBtn" onClick={goHome}>
          Home
        </button>
      </div>
      <div className="createPage-container">
        <p className="createPage-alert">
          Save the phrase on an offline device or write it on paper. Once you
          create the wallet, you will never have access to it.
        </p>
        <main className="createPage-container-inner">
          <div className="createPage-word-container">
            <div className="createPage-words">
              {keys.map((key, index) => (
                <div className="createPage-word" key={index}>
                  <input
                    id={index + 1}
                    value={key}
                    disabled
                    placeholder={index + 1}
                    type="text"
                  />
                </div>
              ))}
            </div>
            <button onClick={create} className="createPage-btn">
              Create Wallet
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
