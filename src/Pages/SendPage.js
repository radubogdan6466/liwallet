import { checkAddress } from "../api/api.js";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ethchain, bnbchain, dogechain } from "./utils.js";
import bscAbi from "./JsonFiles/testBnbAbi.json";
import ercAbi from "./JsonFiles/testErcAbi.json";
import dogeAbi from "./JsonFiles/testDogeAbi.json";
import TransferDetails from "./TransferDetails";

//import { dogechainTokens, ethchainTokens } from "./JsonFiles/tokens";
//import bnbchainTokens from "./JsonFiles/bscTokens.json";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { StyledBoxx, StyledFormControl } from "./styles";
const getLocalStorageItem = (key) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : [];
};
const bnbchainTokens = getLocalStorageItem("bnbchainTokens");
const ethchainTokens = getLocalStorageItem("ethchainTokens");
const dogechainTokens = getLocalStorageItem("dogechainTokens");

const Send = ({ onClose, selectedToken, selectedChain }) => {
  const [selectedTokenState, setSelectedTokenState] = useState(selectedToken);
  const [transferDetails, setTransferDetails] = useState(null);
  const [addressChecked, setAddressChecked] = useState(false);
  const [showCheckButton, setShowCheckButton] = useState(true);
  const [warningMessage, setWarningMessage] = useState("");

  const closePopup = () => {
    onClose();
  };
  const provider = new ethers.providers.JsonRpcProvider(selectedChain);
  const userWallet = new ethers.Wallet(localStorage.getItem("pkey"), provider);
  const checkAddressBeforeTransfer = async () => {
    try {
      const toAddress = document.getElementById("toadrs").value;
      const checkResult = await checkAddress(toAddress);
      let warningMessage = "";

      if (checkResult.isReported) {
        warningMessage += `Atenție! Această adresă a fost raportată.`;
        if (checkResult.details) {
          warningMessage += ` Detalii: ${checkResult.details}`;
        }
      } else {
        warningMessage = "Adresa nu este în baza de date.";
      }
      setWarningMessage(warningMessage);
      setAddressChecked(true);
      setShowCheckButton(false);
    } catch (err) {
      console.error(err);
    }
  };
  const getTokens = (chain) => {
    if (chain === ethchain) {
      return [
        { symbol: "ETH", address: "", abi: null, decimals: 18 },
        ...ethchainTokens,
      ];
    } else if (chain === bnbchain) {
      return [{ symbol: "BNB", address: "", abi: null }, ...bnbchainTokens];
    } else if (chain === dogechain) {
      return [{ symbol: "DOGE", address: "", abi: null }, ...dogechainTokens];
    }
    return [];
  };

  const transferToken = async () => {
    try {
      const toAddress = document.getElementById("toadrs").value;
      const amount = document.getElementById("val").value;
      let gasPrice = document.getElementById("gasprice").value;
      if (!gasPrice) {
        const gasPriceEstimate = await provider.getGasPrice();
        gasPrice = ethers.utils.formatUnits(gasPriceEstimate, "gwei");
      }

      let tokenContract, tokenAddress, tokenABI, amountInSmallestUnit;
      const tokens = getTokens(selectedChain);
      const selectedTokenData = tokens.find(
        (token) => token.symbol === selectedTokenState
      );
      if (!selectedTokenData) {
        throw new Error(`Token ${selectedToken} not found in tokens list`);
      }
      if (
        selectedTokenState === "ETH" ||
        selectedTokenState === "BNB" ||
        selectedTokenState === "DOGE"
      ) {
        console.log(`Decimals: ${selectedTokenData.decimals}`);
        console.log(`Amount: ${amount}`);
        amountInSmallestUnit = ethers.utils.parseUnits(
          amount,
          selectedTokenData.decimals
        );
        console.log(`Amount in smallest unit: ${amountInSmallestUnit}`);
      } else {
        tokenAddress = selectedTokenData.address;
        if (selectedTokenData.chainId === 11155111) {
          tokenABI = ercAbi;
        } else if (selectedTokenData.chainId === 56) {
          tokenABI = bscAbi;
        } else if (selectedTokenData.chainId === 568) {
          tokenABI = dogeAbi;
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
        selectedTokenState === "ETH" ||
        selectedTokenState === "BNB" ||
        selectedTokenState === "DOGE"
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
    }
  };

  useEffect(() => {
    const tokens = getTokens(selectedChain);
    if (!tokens.some((token) => token.symbol === selectedTokenState)) {
      setSelectedTokenState(tokens[0].symbol);
    }
  }, [selectedChain, selectedTokenState]);

  return (
    <Dialog open={true} onClose={closePopup}>
      <DialogTitle>Send {selectedTokenState}</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="error">
          {warningMessage}
        </Typography>
        <StyledBoxx>
          <StyledFormControl>
            <InputLabel id="token-select-label">Token</InputLabel>
            <Select
              labelId="token-select-label"
              id="token-select"
              variant="standard"
              value={selectedTokenState}
              onChange={(e) => setSelectedTokenState(e.target.value)}
            >
              {getTokens(selectedChain).map((token) => (
                <MenuItem key={token.symbol} value={token.symbol}>
                  {token.symbol}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
          <InputLabel id="send-amount-label"></InputLabel>
          <TextField id="val" label="Amount" variant="outlined" required />
          <TextField
            id="toadrs"
            label="To Address"
            variant="outlined"
            required
          />
          <TextField id="gasprice" placeholder="Gas Price (Gwei)" />
        </StyledBoxx>
      </DialogContent>
      <DialogActions>
        {showCheckButton && (
          <Button
            variant="contained"
            color="primary"
            onClick={checkAddressBeforeTransfer}
          >
            Check Address
          </Button>
        )}
        {addressChecked && (
          <Button variant="contained" color="primary" onClick={transferToken}>
            Send {selectedTokenState}
          </Button>
        )}
        <Button variant="outlined" color="secondary" onClick={closePopup}>
          Close
        </Button>
      </DialogActions>
      {transferDetails && <TransferDetails details={transferDetails} />}
    </Dialog>
  );
};
export default Send;
