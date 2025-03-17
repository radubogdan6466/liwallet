import {
  ethchain,
  bnbchain,
  dogechain,
  polychain,
  arbitrumchain,
  goerlichain,
  sepoliachain,
  holeskychain,
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
  //NEW
  apechain,
  arbitrumnovachain,
  berachain,
  bttcchain,
  fraxchain,
  memecorechain,
  moonbeamchain,
  moonriverchain,
  opbnbchain,
  scrollchain,
  sonicchain,
  swellchain,
  taikoalethiachain,
  unichain,
  wemixchain,
  xaichain,
  xdcchain,
  zksyncerachain,
  zircuitchain,
} from "../../hooks/utils";
import {
  bnbchainTokens,
  ethchainTokens,
  dogechainTokens,
  polychainTokens,
  arbitrumchainTokens,
  goerlichainTokens,
  sepoliachainTokens,
  holeskychainTokens,
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
  //NEW
  apechainTokens,
  arbitrumnovachainTokens,
  berachainTokens,
  bttcchainTokens,
  fraxchainTokens,
  memecorechainTokens,
  moonbeamchainTokens,
  moonriverchainTokens,
  opbnbchainTokens,
  scrollchainTokens,
  sonicchainTokens,
  swellchainTokens,
  taikoalethiachainTokens,
  unichainTokens,
  wemixchainTokens,
  xaichainTokens,
  xdcchainTokens,
  zksyncerachainTokens,
  zircuitchainTokens,
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
  } else if (chain === holeskychain) {
    return [
      { symbol: "ETH Holesky", address: "", abi: null },
      ...holeskychainTokens,
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
  //NEW
  else if (chain === apechain) {
    return [{ symbol: "APE", address: "", abi: null }, ...apechainTokens];
  } else if (chain === arbitrumnovachain) {
    return [
      { symbol: "ARB", address: "", abi: null },
      ...arbitrumnovachainTokens,
    ];
  } else if (chain === berachain) {
    return [{ symbol: "BERA", address: "", abi: null }, ...berachainTokens];
  } else if (chain === bttcchain) {
    return [{ symbol: "BTC", address: "", abi: null }, ...bttcchainTokens];
  } else if (chain === fraxchain) {
    return [{ symbol: "FRAX", address: "", abi: null }, ...fraxchainTokens];
  } else if (chain === memecorechain) {
    return [{ symbol: "MEME", address: "", abi: null }, ...memecorechainTokens];
  } else if (chain === moonbeamchain) {
    return [{ symbol: "GLMR", address: "", abi: null }, ...moonbeamchainTokens];
  } else if (chain === moonriverchain) {
    return [
      { symbol: "MOVR", address: "", abi: null },
      ...moonriverchainTokens,
    ];
  } else if (chain === opbnbchain) {
    return [{ symbol: "BNB", address: "", abi: null }, ...opbnbchainTokens];
  } else if (chain === scrollchain) {
    return [{ symbol: "SCR", address: "", abi: null }, ...scrollchainTokens];
  } else if (chain === sonicchain) {
    return [{ symbol: "SONIC", address: "", abi: null }, ...sonicchainTokens];
  } else if (chain === swellchain) {
    return [{ symbol: "SWELL", address: "", abi: null }, ...swellchainTokens];
  } else if (chain === taikoalethiachain) {
    return [
      { symbol: "TAIKO", address: "", abi: null },
      ...taikoalethiachainTokens,
    ];
  } else if (chain === unichain) {
    return [{ symbol: "UNI", address: "", abi: null }, ...unichainTokens];
  } else if (chain === wemixchain) {
    return [{ symbol: "WEMIX", address: "", abi: null }, ...wemixchainTokens];
  } else if (chain === xaichain) {
    return [{ symbol: "XAI", address: "", abi: null }, ...xaichainTokens];
  } else if (chain === xdcchain) {
    return [{ symbol: "XDC", address: "", abi: null }, ...xdcchainTokens];
  } else if (chain === zksyncerachain) {
    return [
      { symbol: "ZKSYNC", address: "", abi: null },
      ...zksyncerachainTokens,
    ];
  } else if (chain === zircuitchain) {
    return [
      { symbol: "ZIRCUIT", address: "", abi: null },
      ...zircuitchainTokens,
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
  } else if (chain === goerlichain) {
    return "ETH";
  } else if (chain === sepoliachain) {
    return "ETH";
  } else if (chain === holeskychain) {
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
  // NEW DE MODIFICAT!!!
  else if (chain === apechain) {
    return "APE";
  } else if (chain === arbitrumnovachain) {
    return "ARB";
  } else if (chain === berachain) {
    return "BERA";
  } else if (chain === bttcchain) {
    return "BTC";
  } else if (chain === fraxchain) {
    return "FRAX";
  } else if (chain === memecorechain) {
    return "MEME";
  } else if (chain === moonbeamchain) {
    return "GLMR";
  } else if (chain === moonriverchain) {
    return "MOVR";
  } else if (chain === opbnbchain) {
    return "BNB";
  } else if (chain === scrollchain) {
    return "SCR";
  } else if (chain === sonicchain) {
    return "SONIC";
  } else if (chain === swellchain) {
    return "SWELL";
  } else if (chain === taikoalethiachain) {
    return "TAIKO";
  } else if (chain === unichain) {
    return "UNI";
  } else if (chain === wemixchain) {
    return "WEMIX";
  } else if (chain === xaichain) {
    return "XAI";
  } else if (chain === xdcchain) {
    return "XDC";
  } else if (chain === zksyncerachain) {
    return "ZKSYNC";
  } else if (chain === zircuitchain) {
    return "ZIRCUIT";
  }

  return [];
};
