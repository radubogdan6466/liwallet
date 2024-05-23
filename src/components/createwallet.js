import React, { useState, useRef } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTranslation } from "react-i18next";

import CryptoJS from "crypto-js";
import { useTheme } from "@mui/material/styles";

export const CreateWallet = ({ mode } = {}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isPopup = mode === "popup";
  const { t } = useTranslation();
  const [showMnemonicPopup, setShowMnemonicPopup] = useState(false);
  const [mnemonic, setMnemonic] = useState("");
  const [verificationIndices, setVerificationIndices] = useState([]);
  const [userInputWords, setUserInputWords] = useState({});
  const mnemonicKeysRef = useRef([]);
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);
  const [tempMnemonic, setTempMnemonic] = useState(""); // Stare temporară pentru mnemonic
  const [userWalletKeys, setUserWalletKeys] = useState(null);

  const selectVerificationWords = (mnemonicPhrase) => {
    const words = mnemonicPhrase.split(" ");
    const indices = [];
    while (indices.length < 3) {
      const rndIndex = Math.floor(Math.random() * words.length);
      if (indices.indexOf(rndIndex) === -1) indices.push(rndIndex);
    }
    setVerificationIndices(indices);
  };

  const handleInputChange = (index, value) => {
    setUserInputWords((prevState) => ({
      ...prevState,
      [index]: value,
    }));
  };

  const verifyWords = () => {
    const words = tempMnemonic.split(" ");
    for (let i of verificationIndices) {
      if (words[i] !== userInputWords[i]) {
        return false;
      }
    }
    return true;
  };
  const clearOldMnemonicData = () => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("data_")) {
        localStorage.removeItem(key);
        i--; // Ajustează indexul pentru a ține cont de elementul șters
      }
    }
  };
  const clearData = () => {
    localStorage.removeItem("pkey");
    mnemonicKeysRef.current.forEach((key) => {
      localStorage.removeItem(key);
    });
  };
  const saveToLocalStorage = (privateKey, mnemonicPhrase) => {
    // 1. Elimină cheia privată existentă
    localStorage.removeItem("pkey");
    clearOldMnemonicData();

    // 2. Șterge toate datele mnemonice vechi din localStorage
    mnemonicKeysRef.current.forEach((key) => {
      localStorage.removeItem(key);
    });

    // 3. Resetare mnemonicKeysRef
    mnemonicKeysRef.current = [];

    // 4. Verifică dacă ai o cheie secretă setată
    const secretKey = process.env.REACT_APP_SECRET_KEY;
    if (!secretKey) {
      console.error("Secret key is not defined!");
      return;
    }

    // 5. Criptează și stochează cheia privată
    const encryptedPrivateKey = CryptoJS.AES.encrypt(
      privateKey,
      secretKey
    ).toString();
    localStorage.setItem("pkey", encryptedPrivateKey);

    // 6. Separă fraza mnemonică în cuvinte
    const mnemonicWords = mnemonicPhrase.split(" ");

    // 7. Definește cheile cu care vor fi criptate cuvintele
    const keys = [
      process.env.REACT_APP_KEYA,
      process.env.REACT_APP_KEYB,
      process.env.REACT_APP_KEYC,
      process.env.REACT_APP_KEYD,
      process.env.REACT_APP_KEYE,
      process.env.REACT_APP_KEYF,
      process.env.REACT_APP_KEYG,
      process.env.REACT_APP_KEYH,
      process.env.REACT_APP_KEYI,
      process.env.REACT_APP_KEYJ,
      process.env.REACT_APP_KEYK,
      process.env.REACT_APP_KEYL,
    ];

    // 8. Criptează fiecare cuvânt mnemonic și stochează în localStorage
    mnemonicWords.forEach((word, index) => {
      const encryptedWord = CryptoJS.AES.encrypt(word, keys[index]).toString();
      const randomKey = `data_${Math.random()
        .toString(36)
        .substr(2, 5)}_${index}`;
      localStorage.setItem(randomKey, encryptedWord);
      // Actualizează referința pentru cheile mnemonice
      mnemonicKeysRef.current.push(randomKey);
    });
  };
  const create = ({ mode }) => {
    const isPopup = mode === "popup";
    const keys = ethers.Wallet.createRandom();
    if (keys && keys.mnemonic && keys.mnemonic.phrase) {
      setTempMnemonic(keys.mnemonic.phrase);
      selectVerificationWords(keys.mnemonic.phrase);
      setUserWalletKeys(keys);
      setShowMnemonicPopup(true);
    } else {
      console.error("Failed to generate wallet keys.");
    }
  };

  const closePopup = () => {
    if (verifyWords()) {
      saveToLocalStorage(userWalletKeys.privateKey, tempMnemonic);
      setMnemonic(tempMnemonic);
      setIsBackdropOpen(true);
      setShowMnemonicPopup(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      navigate("/Home");
    } else {
      alert("Cuvintele introduse nu sunt corecte. Te rog să încerci din nou.");
      //clearData();
    }
  };

  const handleCloseDialog = () => {
    setTempMnemonic("");
    setShowMnemonicPopup(false);
  };

  return {
    showMnemonicPopup,
    setShowMnemonicPopup,
    mnemonic,
    setMnemonic,
    verificationIndices,
    userInputWords,
    setUserInputWords,
    isBackdropOpen,
    setIsBackdropOpen,
    tempMnemonic,
    userWalletKeys,
    selectVerificationWords,
    handleInputChange,
    verifyWords,
    clearData,
    saveToLocalStorage,
    create,
    closePopup,
    handleCloseDialog,
  };
};
