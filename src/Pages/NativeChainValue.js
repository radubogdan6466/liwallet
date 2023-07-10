import React, { useState, useEffect } from "react";
import Web3 from "web3";

export default function NativeChainValue({
  userWallet,
  web3,
  selectedChain,
  ethchain,
  bnbchain,
  dogechain,
}) {
  const [ethBalance, setEthBalance] = useState(0);

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

  return (
    <p className="value" id="bal">
      {ethBalance}{" "}
      {selectedChain === ethchain
        ? "ETH"
        : selectedChain === bnbchain
        ? "BNB"
        : selectedChain === dogechain
        ? "DOGE"
        : ""}
    </p>
  );
}
