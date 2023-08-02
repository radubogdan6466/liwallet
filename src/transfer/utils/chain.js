import { ethchain, bnbchain, dogechain, polychain } from "../../hooks/utils";
import {
  bnbchainTokens,
  ethchainTokens,
  dogechainTokens,
  polychainTokens,
} from "../constants/tokens";

export const getTokens = (chain) => {
  if (chain === ethchain) {
    return [
      { symbol: "ETH", address: "", abi: null, decimals: 18 },
      ...ethchainTokens,
    ];
  } else if (chain === bnbchain) {
    return [{ symbol: "BNB", address: "", abi: null }, ...bnbchainTokens];
  } else if (chain === dogechain) {
    return [{ symbol: "DOGE", address: "", abi: null }, ...dogechainTokens];
  } else if (chain === polychain) {
    return [{ symbol: "MATIC", address: "", abi: null }, ...polychainTokens];
  }
  return [];
};
