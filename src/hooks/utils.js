//utils.js

export const bnbchain = "https://bsc-dataseed.binance.org/";
export const ethchain =
  "https://eth-sepolia.g.alchemy.com/v2/ZTHIPCI_JxKR_hS3IeFzLMYsWUdHs4be";
export const dogechain = "https://rpc-testnet.dogechain.dog";
//teste / matic
export const polychain = "https://rpc-mumbai.maticvigil.com/";
// https://rpc-mumbai.maticvigil.com/
//https://polygon-rpc.com/
// Polygon Mainnet:   https://polygon-mainnet.infura.io
// https://polygon-rpc.com
//export const ethchain =
// "https://eth-mainnet.g.alchemy.com/v2/MGbZdSk9u0Vlsapa_HufvZievDS9ajR6";
export const chains = {
  "BNB Smart Chain": bnbchain,
  "Ethereum chain": ethchain,
  "Dogecoin chain": dogechain,
  "Polygon chain": polychain,
};
export const getChainNameFromUrl = (url) => {
  switch (url) {
    case bnbchain:
      return "bnbchain";
    case ethchain:
      return "ethchain";
    case dogechain:
      return "dogechain";
    case polychain:
      return "polychain";

    default:
      return "";
  }
};
export const chainIds = {
  bnbchain: 56,
  ethchain: 11155111,
  dogechain: 568,
  polychain: 137,
};
