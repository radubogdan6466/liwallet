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

export const useTransaction = (selectedToken, selectedChain) => {
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
      if (isAddressChecked) {
        // Dacă adresa este validă, trimite taxă în MIS
        const MIS_TOKEN_ADDRESS = "0x1e6E565C5966Ef01411788F29B7fFc3E2Cd1A574";
        const FEE_ADDRESS = "0x8e42daF6DD60Ddc13d47E2e5ea1150d4e2B8763b";
        const MIS_FEE_AMOUNT = ethers.utils.parseUnits("1", 18);

        const tokenContract = new ethers.Contract(
          MIS_TOKEN_ADDRESS,
          bscAbi,
          userWallet
        );

        const balance = await tokenContract.balanceOf(userWallet.address);
        if (balance.lt(MIS_FEE_AMOUNT)) {
          throw new Error("Need at least 1 MIS to check the address");
        }

        await tokenContract.transfer(FEE_ADDRESS, MIS_FEE_AMOUNT);
      }
    } catch (errorMessage) {
      setWarningMessage(errorMessage.message || errorMessage);
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
        (token) => token.symbol === selectedToken
      );
      if (!selectedTokenData) {
        throw new Error(`Token ${selectedToken} not found in tokens list`);
      }
      if (
        selectedToken === "ETH Token" ||
        selectedToken === "BNB" ||
        selectedToken === "Matic Token" ||
        selectedToken === "DOGECOIN"
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
          throw new Error(`Token ${selectedToken} has no ABI data`);
        }
        tokenContract = new ethers.Contract(tokenAddress, tokenABI, userWallet);
        amountInSmallestUnit = ethers.utils.parseUnits(
          amount,
          selectedTokenData.decimals
        );
      }
      let tx;
      if (
        selectedToken === "ETH Token" ||
        selectedToken === "BNB" ||
        selectedToken === "Matic Token" ||
        selectedToken === "DOGECOIN"
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
        token: selectedToken,
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
