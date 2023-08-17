import {
  ethchain,
  bnbchain,
  dogechain,
  polychain,
  arbitrumchain,
} from "../../hooks/utils";
import {
  bnbchainTokens,
  ethchainTokens,
  dogechainTokens,
  polychainTokens,
  arbitrumchainTokens,
} from "../constants/tokens";

export const getTokens = (chain) => {
  if (chain === ethchain) {
    return [
      { symbol: "ETH Token", address: "", abi: null, decimals: 18 },
      ...ethchainTokens,
    ];
  } else if (chain === bnbchain) {
    return [{ symbol: "BNB", address: "", abi: null }, ...bnbchainTokens];
  } else if (chain === dogechain) {
    return [{ symbol: "DOGECOIN", address: "", abi: null }, ...dogechainTokens];
  } else if (chain === polychain) {
    return [
      { symbol: "Matic Token", address: "", abi: null },
      ...polychainTokens,
    ];
  } else if (chain === arbitrumchain) {
    return [
      { symbol: "ETH Arbitrum", address: "", abi: null },
      ...arbitrumchainTokens,
    ];
  }
  return [];
};

export const NativToken = (chain) => {
  if (chain === ethchain) {
    return "ETH";
  } else if (chain === bnbchain) {
    return "BNB";
  } else if (chain === dogechain) {
    return "DOGECOIN";
  } else if (chain === polychain) {
    return "MATIC";
  } else if (chain === arbitrumchain) {
    return "ETH";
  }
  return [];
};
