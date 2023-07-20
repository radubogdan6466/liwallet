import React, { useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

export default function LoginWallet() {
  const [privateKey, setPrivateKey] = useState("");
  const navigate = useNavigate();

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

  const Login = () => {
    try {
      const userWallet = new ethers.Wallet(privateKey);
      localStorage.setItem("pkey", userWallet.privateKey);
      navigate("/");
    } catch (error) {
      // Handler de eroare
      console.error("Error, try again:", error);
      // Poți trata eroarea în modul dorit, de exemplu, afișând un mesaj de eroare sau redirectionând către o pagină de eroare
    }
  };

  const handlePrivateKeyChange = (event) => {
    setPrivateKey(event.target.value);
  };

  return (
    <div className="LoginPage-page-container">
      <div className="LoginPage-nav-container">
        <div className="LoginPage-dropdown">
          <button>Menu &#9662;</button>
          <div className="LoginPage-dropdown-content">
            <button onClick={gocreate}>Create</button>
            <button onClick={gologin}>Login</button>
            <button onClick={goSettings}>Settings</button>
          </div>
        </div>
        <button className="LoginPage-homeBtn" onClick={goHome}>
          Home
        </button>
      </div>
      <div className="LoginPage-content-container">
        <div className="LoginPage-InputBox">
          <input
            id="privateKey"
            value={privateKey}
            placeholder="Enter private key"
            type="password"
            onChange={handlePrivateKeyChange}
          />
        </div>
        <button onClick={Login} className="LoginPage-btn">
          Login
        </button>
      </div>
    </div>
  );
}
