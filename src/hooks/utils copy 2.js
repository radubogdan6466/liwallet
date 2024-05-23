// //utils.js
// export const bnbchain = "https://bsc-rpc.publicnode.com";
// export const ethchain = "https://eth.llamarpc.com	";
// export const dogechain = "https://rpc-testnet.dogechain.dog";
// export const polychain = "https://rpc-mumbai.maticvigil.com/";
// export const arbitrumchain =
//   "https://arb-sepolia.g.alchemy.com/v2/8ny68jY9aytMlkI4LdWekWovS5AZ-0Iv";
// // test chains
// export const goerlichain = "https://rpc.ankr.com/eth_goerli";
// export const sepoliachain = "https://ethereum-sepolia.publicnode.com";
import { getNetworks } from "../components/CustomNetwork/DatbaBase";

// Function to fetch the URL for a specific chain from IndexedDB
const getChainUrl = async (chainName) => {
  const networks = await getNetworks();
  console.log("Networks from database:", networks); // Afișează rețelele din baza de date

  // Afișează detalii despre fiecare rețea
  networks.forEach((network) => {
    console.log("Network Name:", network.networkName);
    console.log("RPC URL:", network.rpcUrl);
    console.log("Chain ID:", network.chainId);
    console.log("Block Explorer URL:", network.blockExplorerUrl); // Dacă există alte detalii despre rețea
  });

  const network = networks.find((network) => network.networkName === chainName);
  console.log("Found network:", network); // Afișează rețeaua găsită
  return network ? network.rpcUrl : "";
};

const bnbUrl = await getChainUrl("BNB Smart Chain Mainnet");
const ethUrl = await getChainUrl("Ethereum Mainnet");
const dogeUrl = await getChainUrl("Dogechain Mainnet");
const polyUrl = await getChainUrl("Polygon Mainnet");
const arbitrumUrl = await getChainUrl("Arbitrum One");
const goerliUrl = await getChainUrl("Goerli Chain");
const sepUrl = await getChainUrl("Sepolia Chain");
const baseUrl = await getChainUrl("base Chain");
const avalancheUrl = await getChainUrl("avalanche Chain");
const opMainnetUrl = await getChainUrl("OPMainnet Chain");
const cronosMainnetUrl = await getChainUrl("Cronos Mainnet");
const lineaUrl = await getChainUrl("Linea Mainnet");
const mantleUrl = await getChainUrl("Mantle Mainnet");
const pulseChainUrl = await getChainUrl("Pulse Mainnet");

export const bnbchain = bnbUrl;
export const ethchain = ethUrl;
export const dogechain = dogeUrl;
export const polychain = polyUrl;
export const arbitrumchain = arbitrumUrl;
export const goerlichain = goerliUrl;
export const sepoliachain = sepUrl;
export const basechain = baseUrl;
export const avalanchechain = avalancheUrl;
export const opMainnetChain = opMainnetUrl;
export const cronosMainnetChain = cronosMainnetUrl;
export const lineaMainnetChain = lineaUrl;
export const mantleMainnetChain = mantleUrl;
export const pulseMainnetChain = pulseChainUrl;

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
};

export const getChainNameFromUrl = async (url) => {
  const networks = await getNetworks();
  const network = networks.find((network) => network.rpcUrl === url);
  return network ? network.networkName : "";
};

export const chainIds = {
  bnbchain: 56,
  ethchain: 1,
  dogechain: 568,
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
};
export const chainNames = {
  56: "BNB Smart Chain Mainnet",
  1: "Ethereum Mainnet",
  568: "Dogechain Mainnet",
  137: "Polygon Mainnet",
  42161: "Arbitrum One",
  5: "Goerli Chain",
  11155111: "Sepolia Chain",
  8453: "Base Chain",
  43114: "Avalanche Chain",
  10: "OPMainnet Chain",
  25: "Cronos Mainnet",
  59144: "Linea Mainnet",
  5000: "Mantle Mainnet",
  369: "Pulse Mainnet",
};
export const getChainNameById = (id) => {
  return chainNames[id] || "";
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
  avalanchechain: false,
  opMainnetChain: true,
  cronosMainnetChain: false,
  lineaMainnetChain: true,
  mantleMainnetChain: false,
  pulseMainnetChain: true,
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
  };

  return defaultTokens[chain] || "";
}
