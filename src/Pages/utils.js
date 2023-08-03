//utils.js

export const bnbchain = "https://bsc-dataseed.binance.org/";
export const ethchain =
  "https://eth-sepolia.g.alchemy.com/v2/ZTHIPCI_JxKR_hS3IeFzLMYsWUdHs4be";
export const dogechain = "https://rpc-testnet.dogechain.dog";

export const chains = {
  "BNB Smart Chain": bnbchain,
  Ethereum: ethchain,
  Dogecoin: dogechain,
};
export const getChainNameFromUrl = (url) => {
  switch (url) {
    case bnbchain:
      return "bnbchain";
    case ethchain:
      return "ethchain";
    case dogechain:
      return "dogechain";
    default:
      return "";
  }
};
export const chainIds = {
  bnbchain: 56,
  ethchain: 11155111,
  dogechain: 568,
};
