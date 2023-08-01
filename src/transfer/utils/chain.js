import { ethchain, bnbchain, dogechain } from "../../hooks/utils";
import {
  bnbchainTokens,
  ethchainTokens,
  dogechainTokens,
} from "../constants/tokens";

export const getTokens = (chain) => {
  if (chain === ethchain) {
    return [
      { symbol: "ETH", address: "", abi: null, decimals: 18 },
      ...ethchainTokens,
    ];
  } else if (chain === bnbchain) {
    return [
      { symbol: "BNB", address: "", decimals: 8, abi: null },
      ...bnbchainTokens,
    ];
  } else if (chain === dogechain) {
    return [{ symbol: "DOGE", address: "", abi: null }, ...dogechainTokens];
  }
  return [];
};
