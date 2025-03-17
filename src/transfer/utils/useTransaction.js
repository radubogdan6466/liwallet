import { useState } from "react";
import { ethers } from "ethers";
import useWeb3 from "../../hooks/useWeb3.js";
import { getTokens } from "./chain";
import { CheckAddressBeforeTransfer } from "./adressCheck.js";
import { useGasPrice } from "./useGasPrice";
import { handleError } from "../../hooks/errorHandler";
import bscAbi from "../../JsonFiles/testBnbAbi.json";
import ercAbi from "../../JsonFiles/testErcAbi.json";
import dogeAbi from "../../JsonFiles/testDogeAbi.json";
import polyAbi from "../../JsonFiles/testPolyAbi.json";
import pulseAbi from "../../JsonFiles/pulseAbi.json";
import { eip1559Chains, getChainNameFromUrl } from "../../hooks/utils.js";
import { useTranslation } from "react-i18next";
import EthereumAddress from "ethereum-address";
import { addTransaction } from "./localStorageService.js"; // Importă funcția

export const useTransaction = (selectedToken, selectedChain) => {
  const [transferDetails, setTransferDetails] = useState(null);
  const [addressChecked, setAddressChecked] = useState(false);
  const [showCheckButton, setShowCheckButton] = useState(true);
  const [warningMessage, setWarningMessage] = useState("");
  const { t } = useTranslation();
  const provider = new ethers.providers.JsonRpcProvider(selectedChain);
  const { getDecryptedPrivateKey } = useWeb3();
  const userWallet = new ethers.Wallet(getDecryptedPrivateKey(), provider);
  const gasPrice = useGasPrice(provider);
  const chainName = getChainNameFromUrl(selectedChain);
  const isEIP1559Supported = eip1559Chains[chainName];
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [buttonText, setButtonText] = useState("Send"); // Adaugă acest state

  const checkEthereumAddress = () => {
    const toAddress = document.getElementById("toadrs").value;
    if (EthereumAddress.isAddress(toAddress)) {
      setIsValidAddress(true);
    } else {
      setIsValidAddress(false);
    }
  };
  const handleAddressCheck = async () => {
    checkEthereumAddress();
    const toAddress = document.getElementById("toadrs").value;
    try {
      const { warningMessage, isAddressChecked } =
        await CheckAddressBeforeTransfer(toAddress, t);

      setWarningMessage(warningMessage);
      setAddressChecked(isAddressChecked);
      setShowCheckButton(!isAddressChecked);
    } catch (errorMessage) {
      setWarningMessage(errorMessage.message || errorMessage);
    }
  };

  const transferToken = async () => {
    if (!isValidAddress) {
      setWarningMessage(t("invalidEthereumAddress"));
      return;
    }
    try {
      setButtonText("Pending...");
      const toAddress = document.getElementById("toadrs").value;
      const amount = document.getElementById("val").value;
      if (!amount || isNaN(amount)) {
        throw new Error("invalid_value");
      }
      const selectedTokenData = getTokens(selectedChain).find(
        (token) => token.symbol === selectedToken
      );

      if (!selectedTokenData) {
        throw new Error(`Token ${selectedToken} not found in tokens list`);
      }

      const amountInSmallestUnit = ethers.utils.parseUnits(
        amount,
        selectedTokenData.decimals
      );

      const transactionParameters = isEIP1559Supported
        ? await getEIP1559TransactionParameters()
        : {
            gasPrice: ethers.utils.parseUnits(
              gasPrice || (await provider.getGasPrice()),
              "gwei"
            ),
          };

      let tx;

      if (
        [
          "ETH Token",
          "BNB",
          "Matic Token",
          "ETH Arbitrum",
          "DOGECOIN",
          "ETH Goerli",
          "ETH Sepolia",
          "ETH Holesky",
          "ETH Base",
          "AVAX",
          "ETH OP",
          "CRO",
          "ETH Linea",
          "MNT",
          "PLS",

          "FTM",
          "XDAI",
          "CELO",
          "ONE",
          "ETH Blast",
          "ZETA",
          //NEW DE MODIFICAT!!!!!
          "APE",
          "ARB",
          "BERA",
          "BTTC",
          "FRAX",
          "MEME",
          "GLMR",
          "MOVR",
          "OPBNB",
          "SCRL",
          "SONIC",
          "SWELL",
          "TAIKO",
          "UNI",
          "WEMIX",
          "XAI",
          "XDC",
          "ZKS",
          "ZIRCUIT",
        ].includes(selectedToken)
      ) {
        tx = await userWallet.sendTransaction({
          to: toAddress,
          value: amountInSmallestUnit,
          ...transactionParameters,
        });
      } else {
        const tokenContract = getTokenContract(selectedTokenData);
        const gasLimit = await tokenContract.estimateGas.transfer(
          toAddress,
          amountInSmallestUnit
        );

        tx = await tokenContract.transfer(toAddress, amountInSmallestUnit, {
          gasLimit,
          ...transactionParameters,
        });
      }

      setTransferDetails({
        toAddress,
        amount,
        gasPrice,
        txHash: tx.hash,
        token: selectedToken,
        chain: selectedChain,
      });
      // Adaugă tranzacția în IndexedDB
      await addTransaction({
        toAddress,
        amount,
        gasPrice,
        txHash: tx.hash,
        token: selectedToken,
        chain: selectedChain,
      });
      // Setează textul butonului pe "Completed" când tranzacția s-a terminat cu succes
      setButtonText("Completed");
    } catch (err) {
      // Setează textul butonului înapoi pe "Send" în caz de eroare
      setButtonText("Send");
      const errorMessage = handleError(err, t); // presupunem că `t` este funcția ta de traducere
      setWarningMessage(errorMessage);
    }
  };

  const getTokenContract = (selectedTokenData) => {
    const tokenAddress = selectedTokenData.address;
    const tokenABI = getTokenABI(selectedTokenData.chainId);
    return new ethers.Contract(tokenAddress, tokenABI, userWallet);
  };

  const getTokenABI = (chainId) => {
    switch (chainId) {
      case 1:
        return ercAbi;
      case 11155111:
        return ercAbi;
      case 56:
        return bscAbi;
      case 2000:
        return dogeAbi;
      case 137:
        return polyAbi;
      case 42161:
        return ercAbi;
      case 5:
        return ercAbi;
      case 8453:
        return ercAbi;
      case 43114:
        return ercAbi;
      case 10:
        return ercAbi;
      case 25:
        return ercAbi;
      case 59144:
        return ercAbi;
      case 5000:
        return ercAbi;
      case 369:
        return pulseAbi;

      case 250:
        return ercAbi;
      case 100:
        return ercAbi;
      case 42220:
        return ercAbi;
      case 1666600000:
        return ercAbi;
      case 81457:
        return ercAbi;
      case 7000:
        return ercAbi;
      //NEW
      case 33139:
        return ercAbi;
      case 42170:
        return ercAbi;
      case 80094:
        return ercAbi;
      case 199:
        return ercAbi;
      case 252:
        return ercAbi;
      case 4352:
        return ercAbi;
      case 1284:
        return ercAbi;
      case 1285:
        return ercAbi;
      case 204:
        return ercAbi;
      case 534352:
        return ercAbi;
      case 146:
        return ercAbi;
      case 1923:
        return ercAbi;
      case 167000:
        return ercAbi;
      case 130:
        return ercAbi;
      case 1111:
        return ercAbi;
      case 660279:
        return ercAbi;
      case 50:
        return ercAbi;
      case 324:
        return ercAbi;
      case 48900:
        return ercAbi;

      default:
        throw new Error("Token has no ABI data");
    }
  };

  const getEIP1559TransactionParameters = async () => {
    const latestBlock = await provider.getBlock("latest");
    const baseFee = latestBlock.baseFeePerGas;
    const maxPriorityFeePerGas = ethers.utils.parseUnits("2", "gwei");
    const maxFeePerGas = baseFee
      .add(maxPriorityFeePerGas)
      .add(ethers.utils.parseUnits("10", "gwei"));
    return { maxPriorityFeePerGas, maxFeePerGas };
  };

  return {
    transferDetails,
    addressChecked,
    showCheckButton,
    warningMessage,
    handleAddressCheck,
    transferToken,
    gasPrice,
    isValidAddress,
    buttonText, // Returnează variabila buttonText
  };
};
