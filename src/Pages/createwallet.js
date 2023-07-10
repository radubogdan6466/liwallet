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

/**this was in return*/

/** 
    <div className='container'>
        <main className='container-inner'>
                <div className="word-container">
                    <div className="words">
                        <div className="word">
                            <input id="1" onCopy={copyKeys} value={k1}  disabled placeholder="1" type={"text"}/>
                        </div>
                        <div className="word">
                            <input id="2" onCopy={copyKeys} value={k2}  disabled placeholder="2" type={"text"}/>
                        </div>
                        <div className="word">
                            <input id="3" onCopy={copyKeys} value={k3}  disabled placeholder="3" type={"text"}/>
                        </div>
                        <div className="word">
                            <input id="4" onCopy={copyKeys} value={k4}  disabled placeholder="4" type={"text"}/>
                        </div>
                        <div className="word">
                            <input id="5" onCopy={copyKeys} value={k5}  disabled placeholder="5" type={"text"}/>
                        </div>
                        <div className="word">
                            <input id="6" onCopy={copyKeys} value={k6}  disabled placeholder="6" type={"text"}/>
                        </div>
                        <div className="word">
                            <input id="7" onCopy={copyKeys} value={k7}  disabled placeholder="7" type={"text"}/>
                        </div>
                        <div className="word">
                            <input id="8" onCopy={copyKeys} value={k8}  disabled placeholder="8" type={"text"}/>
                        </div>
                        <div className="word">
                            <input id="9" onCopy={copyKeys} value={k9}  disabled placeholder="9" type={"text"}/>
                        </div>
                        <div className="word">
                            <input id="10" onCopy={copyKeys} value={k10}  disabled placeholder="10" type={"text"}/>
                        </div>
                        <div className="word">
                            <input id="11" onCopy={copyKeys} value={k11}  disabled placeholder="11" type={"text"}/>
                        </div>
                        <div className="word">
                            <input id="12" onCopy={copyKeys} value={k12}  disabled placeholder="12" type={"text"}/>
                        </div>
                        
                    </div>
                    <button onClick={create} className="btn">
                        Create Wallet</button>
                </div>
        </main>
    </div>
  )
  */
