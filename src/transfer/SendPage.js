import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getGasPrice } from "../hooks/gasPrice";

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
import { StyledBoxx, StyledFormControl } from "../hooks/styles.js";
import { getDecryptedPrivateKey } from "./utils/crypto.js";
import { getTokens } from "./utils/chain.js";

import TransferDetails from "../hooks/TransferDetails.js";
import bscAbi from "../Pages/JsonFiles/testBnbAbi.json";
import ercAbi from "../Pages/JsonFiles/testErcAbi.json";
import dogeAbi from "../Pages/JsonFiles/testDogeAbi.json";
import { useGasPrice } from "./utils/useGasPrice";

import { handleError } from "../hooks/errorHandler.js";
import { checkAddressBeforeTransfer } from "./utils/adressCheck.js";

const Send = ({ onClose, selectedToken, selectedChain }) => {
  const secretKey = process.env.REACT_APP_SECRET_KEY;
  const [selectedTokenState, setSelectedTokenState] = useState(selectedToken);
  const [transferDetails, setTransferDetails] = useState(null);
  const [addressChecked, setAddressChecked] = useState(false);
  const [showCheckButton, setShowCheckButton] = useState(true);
  const [warningMessage, setWarningMessage] = useState("");

  const closePopup = () => {
    onClose();
  };

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
      const errorMessage = handleError(err);
      setWarningMessage(errorMessage);
    }
  };

  useEffect(() => {
    const tokens = getTokens(selectedChain);
    if (!tokens.some((token) => token.symbol === selectedTokenState)) {
      setSelectedTokenState(tokens[0].symbol);
    }
  }, [selectedChain, selectedTokenState]);
  //    0xEC76CFF0C4992629f7Aa533BECc2783B9d420E68
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
          <TextField
            id="gasprice"
            placeholder="Gas Price (Gwei)"
            value={gasPrice}
          />
        </StyledBoxx>
      </DialogContent>
      <DialogActions>
        {showCheckButton && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddressCheck}
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
