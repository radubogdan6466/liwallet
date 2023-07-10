import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ethchainTokens, bnbchainTokens, dogechainTokens } from "./tokens";
import { ethchain, bnbchain, dogechain } from "./ChainSelector";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "30px",
  backgroundColor: "#d3d3d3", // Gri deschis pentru fundal
});

const StyledFormControl = styled(FormControl)({
  marginBottom: "15px", // Adaugă spațiu între input-uri
});

const TransferDetailsBox = styled(Box)({
  backgroundColor: "#666666", // Gri pentru fundal
  color: "#ffffff", // Text alb
  borderRadius: "10px",
  padding: "20px",
  marginTop: "20px",
  textAlign: "left",
});

const Link = styled(MuiLink)({
  textDecoration: "none", // Fără text decoration pentru link-uri
});
const Send = ({ onClose, selectedToken, selectedChain }) => {
  const [selectedTokenState, setSelectedTokenState] = useState(selectedToken);

  const [transferDetails, setTransferDetails] = useState(null);
  console.log("chainselectat:  " + selectedChain);

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

      // Daca utilizatorul nu a introdus un pret pentru gaz, folosim un pret automat
      if (!gasPrice) {
        const gasPriceEstimate = await provider.getGasPrice();
        gasPrice = ethers.utils.formatUnits(gasPriceEstimate, "gwei");
      }

      let tokenContract, tokenAddress, tokenABI, amountInSmallestUnit;

      if (
        selectedTokenState === "ETH" ||
        selectedTokenState === "BNB" ||
        selectedTokenState === "DOGE"
      ) {
        amountInSmallestUnit = ethers.utils.parseEther(amount);
      } else {
        const tokens = getTokens(selectedChain);

        const selectedTokenData = tokens.find(
          (token) => token.symbol === selectedTokenState
        );
        if (!selectedTokenData) {
          throw new Error(`Token ${selectedToken} not found in tokens list`);
        }
        if (!selectedTokenData.abi) {
          throw new Error(`Token ${selectedToken} has no ABI data`);
        }
        tokenAddress = selectedTokenData.address;
        tokenABI = selectedTokenData.abi;
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
  }, [selectedChain]);

  return (
    <Dialog open={true} onClose={closePopup}>
      <DialogTitle>Send {selectedTokenState}</DialogTitle>
      <DialogContent>
        <StyledBox>
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
        </StyledBox>
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
