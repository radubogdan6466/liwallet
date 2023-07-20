import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ethchain, bnbchain, dogechain } from "./utils.js";
import bscAbi from "./JsonFiles/testBnbAbi.json";
import ercAbi from "./JsonFiles/testErcAbi.json";
import dogeAbi from "./JsonFiles/testDogeAbi.json";

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
import {
  StyledBoxx,
  StyledFormControl,
  TransferDetailsBox,
  Link,
} from "./styles";
const bnbchainTokens = JSON.parse(localStorage.getItem("bnbchainTokens"));
const ethchainTokens = JSON.parse(localStorage.getItem("ethchainTokens"));
const dogechainTokens = JSON.parse(localStorage.getItem("dogechainTokens"));

const Send = ({ onClose, selectedToken, selectedChain }) => {
  const [selectedTokenState, setSelectedTokenState] = useState(selectedToken);

  const [transferDetails, setTransferDetails] = useState(null);

  const closePopup = () => {
    onClose();
  };
  const provider = new ethers.providers.JsonRpcProvider(selectedChain);
  const userWallet = new ethers.Wallet(localStorage.getItem("pkey"), provider);

  const getTokens = (chain) => {
    if (chain === ethchain) {
      return [{ symbol: "ETH", address: "", abi: null }, ...ethchainTokens];
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

      // gasPrice se calculeaza automat
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
        <StyledBoxx>
          <StyledFormControl>
            <InputLabel id="send-amount-label"></InputLabel>
            <TextField id="val" type="number" placeholder="Enter amount" />
          </StyledFormControl>
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
          <TextField id="toadrs" placeholder="Recipient address" />
          <TextField
            id="gasprice"
            type="number"
            placeholder="Gas Price (Gwei)"
          />
        </StyledBoxx>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={transferToken}>
          Send {selectedTokenState}
        </Button>
        <Button variant="outlined" color="secondary" onClick={closePopup}>
          Close
        </Button>
      </DialogActions>
      {transferDetails && (
        <TransferDetailsBox>
          <Typography variant="body1">Transfer Details:</Typography>
          <Typography variant="body2">
            To:
            <Link
              href={`https://sepolia.etherscan.io/address/${transferDetails.toAddress}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {`${transferDetails.toAddress.substring(
                0,
                4
              )}...${transferDetails.toAddress.substring(
                transferDetails.toAddress.length - 4
              )}`}
            </Link>
          </Typography>
          <Typography variant="body2">
            Value: {transferDetails.amount} Token: {transferDetails.token}
          </Typography>
          <Typography variant="body2">
            Gas Price: {transferDetails.gasPrice} Gwei
          </Typography>
          <Typography variant="body2">
            Txn Hash:
            <Link
              href={`https://sepolia.etherscan.io/tx/${transferDetails.txHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {`${transferDetails.txHash.substring(
                0,
                4
              )}...${transferDetails.txHash.substring(
                transferDetails.txHash.length - 4
              )}`}
            </Link>
          </Typography>
        </TransferDetailsBox>
      )}
    </Dialog>
  );
};

export default Send;
