//utils.js
export const bnbchain = "https://bsc-rpc.publicnode.com";
export const ethchain = "https://eth.llamarpc.com";
export const dogechain = "https://rpc.dogechain.dog";
export const polychain = "https://1rpc.io/matic";
export const arbitrumchain = "https://arbitrum.llamarpc.com";
export const goerlichain = "https://rpc.ankr.com/eth_goerli";
export const sepoliachain = "https://ethereum-sepolia.publicnode.com";
export const basechain = "https://base.llamarpc.com";
export const avalanchechain = "https://1rpc.io/avax/c";
export const opMainnetChain = "https://optimism.llamarpc.com";
export const cronosMainnetChain = "https://cronos.drpc.org";
export const lineaMainnetChain = "https://linea.decubate.com";
export const mantleMainnetChain = "https://mantle-mainnet.public.blastapi.io";
export const pulseMainnetChain = "https://rpc-pulsechain.g4mm4.io";

export const fantomChain = "https://rpc3.fantom.network";
export const gnosisChain = "https://gnosis-mainnet.public.blastapi.io";
export const celoChain = "https://forno.celo.org";
export const harmonyChain = "https://api.harmony.one";
export const blastChain = "https://rpc.blast.io";
export const zetaChain = "https://zetachain-evm.blockpi.network/v1/rpc/public";

export const chains = {
  "BNB Smart Chain": bnbchain,
  "Ethereum Mainnet": ethchain,
  "Dogecoin chain": dogechain,
  "Polygon Mainnet": polychain,
  "Arbitrum One": arbitrumchain,
  "Goerli Chain": goerlichain,
  "Sepolia Chain": sepoliachain,
  "Base Chain": basechain,
  "Avalanche Chain": avalanchechain,
  "OPMainnet Chain": opMainnetChain,
  "Cronos Mainnet": cronosMainnetChain,
  "Linea Mainnet": lineaMainnetChain,
  "Mantle Mainnet": mantleMainnetChain,
  "Pulse Mainnet": pulseMainnetChain,
  "Fantom Chain": fantomChain,
  "Gnosis Chain": gnosisChain,
  "Celo Chain": celoChain,
  "Harmony Chain": harmonyChain,
  "Blast Chain": blastChain,
  "Zeta Chain": zetaChain,
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
    case arbitrumchain:
      return "arbitrumchain";
    case goerlichain:
      return "goerlichain";
    case sepoliachain:
      return "sepoliachain";
    case basechain:
      return "basechain";
    case avalanchechain:
      return "avalanchechain";
    case opMainnetChain:
      return "opMainnetChain";
    case cronosMainnetChain:
      return "cronosMainnetChain";
    case lineaMainnetChain:
      return "lineaMainnetChain";
    case mantleMainnetChain:
      return "mantleMainnetChain";
    case pulseMainnetChain:
      return "pulseMainnetChain";
    case fantomChain:
      return "fantomChain";
    case gnosisChain:
      return "gnosisChain";
    case celoChain:
      return "celoChain";
    case harmonyChain:
      return "harmonyChain";
    case blastChain:
      return "blastChain";
    case zetaChain:
      return "zetaChain";
    default:
      return "";
  }
};
//2000
export const chainIds = {
  bnbchain: 56,
  ethchain: 1,
  dogechain: 2000,
  polychain: 137,
  arbitrumchain: 42161,
  goerlichain: 5,
  sepoliachain: 11155111,
  basechain: 8453,
  avalanchechain: 43114,
  opMainnetChain: 10,
  cronosMainnetChain: 25,
  lineaMainnetChain: 59144,
  mantleMainnetChain: 5000,
  pulseMainnetChain: 369,
  fantomChain: 250,
  gnosisChain: 100,
  celoChain: 42220,
  harmonyChain: 1666600000,
  blastChain: 81457,
  zetaChain: 7000,
};
export const eip1559Chains = {
  bnbchain: false,
  ethchain: true,
  dogechain: false,
  polychain: false,
  arbitrumchain: false,
  goerlichain: true,
  sepoliachain: true,
  basechain: true,
  avalanchechain: true,
  opMainnetChain: true,
  cronosMainnetChain: true,
  lineaMainnetChain: true,
  mantleMainnetChain: true,
  pulseMainnetChain: true,
  fantomChain: false,
  gnosisChain: false,
  celoChain: false,
  harmonyChain: false,
  blastChain: false,
  zetaChain: false,
};

export function getDefaultTokenForChain(chain) {
  const defaultTokens = {
    bnbchain: "BNB",
    ethchain: "ETH Token",
    polychain: "Matic Token",
    dogechain: "DOGECOIN",
    arbitrumchain: "ETH Arbitrum",
    goerlichain: "ETH Goerli",
    sepoliachain: "ETH Sepolia",
    basechain: "ETH",
    avalanchechain: "AVAX",
    opMainnetChain: "ETH",
    cronosMainnetChain: "CRO",
    lineaMainnetChain: "ETH",
    mantleMainnetChain: "MNT",
    pulseMainnetChain: "PLS",
    fantomChain: "FTM",
    gnosisChain: "XDAI",
    celoChain: "CELO",
    harmonyChain: "ONE",
    blastChain: "ETH",
    zetaChain: "ZETA",
  };

  return defaultTokens[chain];
}
