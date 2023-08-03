import { useState, useEffect } from "react";
import Web3 from "web3";
import { bnbchain } from "./utils.js"; // import default chain

export default function useWeb3(initialChain = bnbchain) {
  const [web3, setWeb3] = useState(
    new Web3(new Web3.providers.HttpProvider(initialChain))
  );
  const [selectedChain, setSelectedChain] = useState(initialChain);
  const [userWallet, setUserWallet] = useState(null);
  const [ethBalance, setEthBalance] = useState(0);
  const [importedTokens, setImportedTokens] = useState(
    JSON.parse(localStorage.getItem("importedTokens")) || []
  );
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

  const privateKey = localStorage.getItem("pkey");

  useEffect(() => {
    if (privateKey) {
      const account = web3.eth.accounts.wallet.add(privateKey);
      setUserWallet(account);
    }
  }, [privateKey, web3]);

  return {
    web3,
    selectedChain,
    setSelectedChain,
    userWallet,
    ethBalance,
    importedTokens,
    setImportedTokens,
    setWeb3,
    setUserWallet,
    setEthBalance,
  };
}
