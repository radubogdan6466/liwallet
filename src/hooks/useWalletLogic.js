import { useState, useEffect } from "react";
import { handleAsyncError } from "../hooks/errorHandler";

export function useWalletLogic(web3, privateKey) {
  const [userWallet, setUserWallet] = useState(null);
  const [ethBalance, setEthBalance] = useState(null);

  useEffect(() => {
    if (privateKey) {
      const account = web3.eth.accounts.wallet.add(privateKey);
      setUserWallet(account);
    }
  }, [privateKey, web3]);

  useEffect(() => {
    const fetchBalance = async () => {
      if (userWallet) {
        const [error, balance] = await handleAsyncError(web3.eth.getBalance)(
          userWallet.address
        );
        if (!error) {
          const balanceInEth = web3.utils.fromWei(balance, "ether");
          setEthBalance(balanceInEth);
        }
      }
    };
    fetchBalance();
  }, [userWallet]);
  return { userWallet, ethBalance };
}
