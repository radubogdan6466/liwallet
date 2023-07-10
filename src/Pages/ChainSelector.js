import React from "react";

export const bnbchain = "https://data-seed-prebsc-2-s2.bnbchain.org:8545";
export const ethchain =
  "https://sepolia.infura.io/v3/74bc4d4122e04aedba2a6d8bcc3164fd";
export const dogechain = "https://rpc-testnet.dogechain.dog";
const ChainSelector = ({ selectedChain, handleChainChange }) => {
  return (
    <div className="homePage-chain-switch">
      <select value={selectedChain} onChange={handleChainChange}>
        <option value={ethchain}>Ethereum</option>
        <option value={bnbchain}>Smart Chain</option>
        <option value={dogechain}>Dogechain</option>
      </select>
    </div>
  );
};
export default ChainSelector;
/**
 * 
 * export const bnbchain = { url: "https://data-seed-prebsc-2-s2.bnbchain.org:8545", baseCurrency: "BNB" };
export const ethchain = { url: "https://sepolia.infura.io/v3/74bc4d4122e04aedba2a6d8bcc3164fd", baseCurrency: "ETH" };
export const dogechain = { url: "https://rpc-testnet.dogechain.dog", baseCurrency: "DOGE" };


 */
