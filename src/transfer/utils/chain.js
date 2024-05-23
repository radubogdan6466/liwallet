import {
  ethchain,
  bnbchain,
  dogechain,
  polychain,
  arbitrumchain,
  goerlichain,
  sepoliachain,
  basechain,
  avalanchechain,
  opMainnetChain,
  cronosMainnetChain,
  lineaMainnetChain,
  mantleMainnetChain,
  pulseMainnetChain,
  fantomChain,
  gnosisChain,
  celoChain,
  harmonyChain,
  blastChain,
  zetaChain,
} from "../../hooks/utils";
import {
  bnbchainTokens,
  ethchainTokens,
  dogechainTokens,
  polychainTokens,
  arbitrumchainTokens,
  goerlichainTokens,
  sepoliachainTokens,
  basechainTokens,
  avalanchechainTokens,
  opMainnetChainTokens,
  cronosMainnetChainTokens,
  lineaMainnetChainTokens,
  mantleMainnetChainTokens,
  pulseMainnetChainTokens,
  fantomChainTokens,
  gnosisChainTokens,
  celoChainTokens,
  harmonyChainTokens,
  blastChainTokens,
  zetaChainTokens,
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
  } else if (chain === goerlichain) {
    return [
      { symbol: "ETH Goerli", address: "", abi: null },
      ...goerlichainTokens,
    ];
  } else if (chain === sepoliachain) {
    return [
      { symbol: "ETH Sepolia", address: "", abi: null },
      ...sepoliachainTokens,
    ];
  } else if (chain === basechain) {
    return [{ symbol: "ETH Base", address: "", abi: null }, ...basechainTokens];
  } else if (chain === avalanchechain) {
    return [
      { symbol: "AVAX", address: "", abi: null },
      ...avalanchechainTokens,
    ];
  } else if (chain === opMainnetChain) {
    return [
      { symbol: "ETH op", address: "", abi: null },
      ...opMainnetChainTokens,
    ];
  } else if (chain === cronosMainnetChain) {
    return [
      { symbol: "CRO", address: "", abi: null },
      ...cronosMainnetChainTokens,
    ];
  } else if (chain === lineaMainnetChain) {
    return [
      { symbol: "ETH Linea", address: "", abi: null },
      ...lineaMainnetChainTokens,
    ];
  } else if (chain === mantleMainnetChain) {
    return [
      { symbol: "MNT", address: "", abi: null },
      ...mantleMainnetChainTokens,
    ];
  } else if (chain === pulseMainnetChain) {
    return [
      { symbol: "PLS", address: "", abi: null },
      ...pulseMainnetChainTokens,
    ];
  } else if (chain === fantomChain) {
    return [{ symbol: "FTM", address: "", abi: null }, ...fantomChainTokens];
  } else if (chain === gnosisChain) {
    return [{ symbol: "XDAI", address: "", abi: null }, ...gnosisChainTokens];
  } else if (chain === celoChain) {
    return [{ symbol: "CELO", address: "", abi: null }, ...celoChainTokens];
  } else if (chain === harmonyChain) {
    return [{ symbol: "ONE", address: "", abi: null }, ...harmonyChainTokens];
  } else if (chain === blastChain) {
    return [{ symbol: "ETH", address: "", abi: null }, ...blastChainTokens];
  } else if (chain === zetaChain) {
    return [{ symbol: "ZETA", address: "", abi: null }, ...zetaChainTokens];
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
  } else if (chain === goerlichain) {
    return "ETH";
  } else if (chain === sepoliachain) {
    return "ETH";
  } else if (chain === basechain) {
    return "ETH";
  } else if (chain === avalanchechain) {
    return "AVAX";
  } else if (chain === opMainnetChain) {
    return "ETH";
  } else if (chain === cronosMainnetChain) {
    return "CRO";
  } else if (chain === lineaMainnetChain) {
    return "ETH";
  } else if (chain === mantleMainnetChain) {
    return "MNT";
  } else if (chain === pulseMainnetChain) {
    return "PLS";
  } else if (chain === fantomChain) {
    return "FTM";
  } else if (chain === gnosisChain) {
    return "XDAI";
  } else if (chain === celoChain) {
    return "CELO";
  } else if (chain === harmonyChain) {
    return "ONE";
  } else if (chain === blastChain) {
    return "ETH";
  } else if (chain === zetaChain) {
    return "ZETA";
  }
  return [];
};
