import { useState, useEffect } from "react";
import Web3 from "web3";
import { bnbchain } from "./utils.js"; // import default chain
import CryptoJS from "crypto-js";

export default function useWeb3() {
  const encryptedPrivateKey = localStorage.getItem("pkey");
  const secretKey = process.env.REACT_APP_SECRET_KEY;
  const [privateKey, setPrivateKey] = useState(null);

  useEffect(() => {
    if (encryptedPrivateKey) {
      const bytes = CryptoJS.AES.decrypt(encryptedPrivateKey, secretKey);
      const decryptedPrivateKey = bytes.toString(CryptoJS.enc.Utf8);
      setPrivateKey(decryptedPrivateKey);
    }
  }, [encryptedPrivateKey, secretKey]);
  // Initializare selectedChain cu valoarea din localStorage sau bnbchain în cazul în care nu există
  const initialChain = localStorage.getItem("selectedChain") || bnbchain;
  const [web3, setWeb3] = useState(
    new Web3(new Web3.providers.HttpProvider(initialChain))
  );
  // console.log("chain initial useWeb3js", initialChain);
  const [selectedChain, setSelectedChain] = useState(initialChain);
  const [userWallet, setUserWallet] = useState(null);
  const [ethBalance, setEthBalance] = useState(0);

  useEffect(() => {
    setWeb3(new Web3(new Web3.providers.HttpProvider(selectedChain)));
  }, [selectedChain, setWeb3]);

  useEffect(() => {
    const fetchBalance = async () => {
      if (userWallet) {
        const balance = await web3.eth.getBalance(userWallet.address);
        const balanceInEth = web3.utils.fromWei(balance, "ether");
        setEthBalance(balanceInEth);
      }
    };
    fetchBalance();
  }, [userWallet, web3]);

  useEffect(() => {
    if (privateKey) {
      const account = web3.eth.accounts.wallet.add(privateKey);
      setUserWallet(account);
    }
  }, [privateKey, web3]);
  const getDecryptedData = (encryptedData, key) => {
    const secretKey = key || process.env.REACT_APP_SECRET_KEY;
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const getDecryptedPrivateKey = () => {
    const encryptedPrivateKey = localStorage.getItem("pkey");
    const bytes = CryptoJS.AES.decrypt(encryptedPrivateKey, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    return originalText;
  };
  return {
    web3,
    selectedChain,
    setSelectedChain,
    userWallet,
    ethBalance,
    setWeb3,
    setUserWallet,
    setEthBalance,
    privateKey,
    getDecryptedData,
    getDecryptedPrivateKey,
  };
}
