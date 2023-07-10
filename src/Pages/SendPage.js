import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ethchainTokens, bnbchainTokens, dogechainTokens } from "./tokens";
import { ethchain, bnbchain, dogechain } from "./ChainSelector";

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
    <div className="sendPage-send-content" id="send-content">
      <div className="sendPage-input-group">
        <input
          className="sendPage-val"
          id="val"
          type="number"
          placeholder="Enter amount"
        />
        <select
          className="sendPage-token-select"
          value={selectedTokenState}
          onChange={(e) => setSelectedTokenState(e.target.value)}
        >
          {getTokens(selectedChain).map((token) => (
            <option key={token.symbol} value={token.symbol}>
              {token.symbol}
            </option>
          ))}
        </select>
      </div>
      <div className="sendPage-to-container">
        <p>to</p>
        <input
          className="sendPage-toadrs"
          id="toadrs"
          placeholder="Recipient address"
        />
        <input
          className="sendPage-gas-price"
          id="gasprice"
          type="number"
          placeholder="Gas Price (Gwei)"
        />
      </div>
      <div className="sendPage-send-actions">
        <button onClick={transferToken} className="sendPage-send-btn">
          Send {selectedTokenState}
        </button>
        <button onClick={closePopup} className="sendPage-close-btn">
          Close
        </button>
      </div>
      {transferDetails && (
        <div className="sendPage-transfer-details">
          <p>Transfer Details:</p>
          <p>
            To:
            <a
              className="transferLink"
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
            </a>
          </p>
          <p>
            Value: {transferDetails.amount} Token: {transferDetails.token}
          </p>
          <p>Gas Price: {transferDetails.gasPrice} Gwei</p>

          <p>
            Txn Hash:
            <a
              className="transferLink"
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
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Send;
