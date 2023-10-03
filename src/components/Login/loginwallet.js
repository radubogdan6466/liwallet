import React, { useState } from "react";
import "./loginwallet.css";
import { ethers } from "ethers";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

export default function LoginWallet({ onClose }) {
  const secretKey = process.env.REACT_APP_SECRET_KEY;
  const [privateKey, setPrivateKey] = useState("");
  const [displayPrivateKey, setDisplayPrivateKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const theme = useTheme();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  const isValidPrivateKey = (privateKey) => {
    try {
      new ethers.Wallet(privateKey);
      return true;
    } catch (error) {
      return false;
    }
  };

  const gologin = () => {
    navigate("/Home");
  };

  const handlePrivateKeyChange = (event) => {
    setPrivateKey(event.target.value);
    setDisplayPrivateKey("*".repeat(event.target.value.length));
    setErrorMessage("");
  };

  const Login = (event) => {
    event.preventDefault();

    if (!isValidPrivateKey(privateKey)) {
      setErrorMessage("Invalid");
      return;
    }

    try {
      const encryptedPrivateKey = CryptoJS.AES.encrypt(
        privateKey,
        secretKey
      ).toString();
      localStorage.setItem("pkey", encryptedPrivateKey);

      setPrivateKey("");
      setDisplayPrivateKey("");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      gologin();
    } catch (error) {
      console.error("Error, try again:", error);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title"> Enter your private key</h1>

      <form className="form__group field" onSubmit={Login}>
        <input
          className="form__field"
          type="password"
          id="privateKey"
          value={displayPrivateKey}
          placeholder="Name"
          autoComplete="off"
          onChange={handlePrivateKeyChange}
        />

        <label htmlFor="name" className="form__label">
          Password
        </label>
        <div className="login-button-p">
          <button className="login-button" type="submit">
            Login
          </button>
        </div>
      </form>
      <div className="login-button-p">
        <button className="login-button-return" onClick={goBack}>
          Return
        </button>
      </div>
      <div> {errorMessage && <p>{errorMessage}</p>}</div>
    </div>
  );
}
