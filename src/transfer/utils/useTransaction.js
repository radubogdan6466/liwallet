import { useState } from "react";
import { ethers } from "ethers";
import { getDecryptedPrivateKey } from "./crypto";
import { getTokens } from "./chain";
import { checkAddressBeforeTransfer } from "./adressCheck.js";
import { useGasPrice } from "./useGasPrice";
import { handleError } from "../../hooks/errorHandler";
import bscAbi from "../../JsonFiles/testBnbAbi.json";
import ercAbi from "../../JsonFiles/testErcAbi.json";
import dogeAbi from "../../JsonFiles/testDogeAbi.json";
import polyAbi from "../../JsonFiles/testPolyAbi.json";

export const useTransaction = (selectedTokenState, selectedChain) => {
  const secretKey = process.env.REACT_APP_SECRET_KEY;
  const [transferDetails, setTransferDetails] = useState(null);
  const [addressChecked, setAddressChecked] = useState(false);
  const [showCheckButton, setShowCheckButton] = useState(true);
  const [warningMessage, setWarningMessage] = useState("");
  const [customGasPrice, setCustomGasPrice] = useState(null);
  const [useCustomGasPrice, setUseCustomGasPrice] = useState(false);
  const provider = new ethers.providers.JsonRpcProvider(selectedChain);
  const userWallet = new ethers.Wallet(
    getDecryptedPrivateKey(secretKey),
    provider
  );
  const gasPrice = useGasPrice(provider);

  const handleAddressCheck = async () => {
    const toAddress = document.getElementById("toadrs").value;
    try {
      const { warningMessage, isAddressChecked } =
        await checkAddressBeforeTransfer(toAddress);
      setWarningMessage(warningMessage);
      setAddressChecked(isAddressChecked);
      setShowCheckButton(!isAddressChecked);
    } catch (errorMessage) {
      setWarningMessage(errorMessage);
    }
  };

  const transferToken = async () => {
    try {
      const toAddress = document.getElementById("toadrs").value;
      const amount = document.getElementById("val").value;
      let gasPrice = document.getElementById("gasprice").value;
      const actualGasPrice = useCustomGasPrice ? customGasPrice : gasPrice;

      // Verificăm dacă prețul gazului este mai mic decât cel estimat
      if (
        gasPrice &&
        parseFloat(gasPrice) <
          parseFloat(
            ethers.utils.formatUnits(await provider.getGasPrice(), "gwei")
          )
      ) {
        throw new Error("gas_price_too_low");
      }
      if (!gasPrice) {
        gasPrice = ethers.utils.formatUnits(
          await provider.getGasPrice(),
          "gwei"
        );
      }

      let tokenContract, tokenAddress, tokenABI, amountInSmallestUnit;
      const tokens = getTokens(selectedChain);
      const selectedTokenData = tokens.find(
        (token) => token.symbol === selectedTokenState
      );
      if (!selectedTokenData) {
        throw new Error(`Token ${selectedTokenState} not found in tokens list`);
      }
      if (
        selectedTokenState === "ETH Token" ||
        selectedTokenState === "BNB" ||
        selectedTokenState === "Matic Token" ||
        selectedTokenState === "DOGECOIN"
      ) {
        amountInSmallestUnit = ethers.utils.parseUnits(
          amount,
          selectedTokenData.decimals
        );
      } else {
        tokenAddress = selectedTokenData.address;
        if (selectedTokenData.chainId === 11155111) {
          tokenABI = ercAbi;
        } else if (selectedTokenData.chainId === 56) {
          tokenABI = bscAbi;
        } else if (selectedTokenData.chainId === 568) {
          tokenABI = dogeAbi;
        } else if (selectedTokenData.chainId === 137) {
          tokenABI = polyAbi;
        } else {
          throw new Error(`Token ${selectedTokenState} has no ABI data`);
        }
        tokenContract = new ethers.Contract(tokenAddress, tokenABI, userWallet);
        amountInSmallestUnit = ethers.utils.parseUnits(
          amount,
          selectedTokenData.decimals
        );
      }
      let tx;
      if (
        selectedTokenState === "ETH Token" ||
        selectedTokenState === "BNB" ||
        selectedTokenState === "Matic Token" ||
        selectedTokenState === "DOGECOIN"
      ) {
        const transaction = {
          to: toAddress,
          value: amountInSmallestUnit,
          gasPrice: ethers.utils.parseUnits(gasPrice, "gwei"),
        };

        tx = await userWallet.sendTransaction(transaction);
      } else {
        const gasLimit = await tokenContract.estimateGas.transfer(
          toAddress,
          amountInSmallestUnit
        );
        tx = await tokenContract.transfer(toAddress, amountInSmallestUnit, {
          gasLimit: gasLimit,
          gasPrice: ethers.utils.parseUnits(gasPrice, "gwei"),
        });
      }
      /**
       *  setTimeout(() => {
        window.location.reload();
      }, 5000);
       *
       */

      setTransferDetails({
        toAddress,
        amount,
        gasPrice,
        txHash: tx.hash,
        token: selectedTokenState,
        chain: selectedChain,
      });
    } catch (err) {
      console.error(err);
      const errorMessage = handleError(err);
      setWarningMessage(errorMessage);
    }
  };

  return {
    transferDetails,
    addressChecked,
    showCheckButton,
    warningMessage,
    handleAddressCheck,
    transferToken,
    gasPrice,
    customGasPrice,
    setCustomGasPrice,
    useCustomGasPrice,
    setUseCustomGasPrice,
  };
};
