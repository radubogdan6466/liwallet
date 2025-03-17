//utils.js
export const bnbchain = "https://bsc-rpc.publicnode.com";
export const ethchain = "https://eth.llamarpc.com	";
export const dogechain = "https://rpc-testnet.dogechain.dog";
export const polychain = "https://rpc-mumbai.maticvigil.com/";
export const arbitrumchain =
  "https://arb-sepolia.g.alchemy.com/v2/8ny68jY9aytMlkI4LdWekWovS5AZ-0Iv";
// test chains
export const goerlichain = "https://rpc.ankr.com/eth_goerli";
export const sepoliachain = "https://ethereum-sepolia.publicnode.com";

export const chains = {
  "BNB Smart Chain": bnbchain,
  "Ethereum Mainnet": ethchain,
  "Dogecoin chain": dogechain,
  "Polygon Mainnet": polychain,
  "Arbitrum One": arbitrumchain,
  "Goerli Chain": goerlichain,
  "Sepolia Chain": sepoliachain,
};

//eth mainnet https://mainnet.infura.io/v3/74bc4d4122e04aedba2a6d8bcc3164fd
// eth sepolia https://sepolia.infura.io/v3/74bc4d4122e04aedba2a6d8bcc3164fd

// bnb mainnet https://bsc-dataseed2.bnbchain.org

// bnb testnet https://bsc-testnet.publicnode.com
// bnb testnet https://data-seed-prebsc-1-s1.binance.org:8545/
// bnb testnet
// bnb testnet
// bnb testnet
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
      return "polychain";
    case goerlichain:
      return "goerlichain";
    case sepoliachain:
      return "sepoliachain";
    default:
      return "";
  }
};
export const chainIds = {
  bnbchain: 56,
  ethchain: 1,
  dogechain: 568,
  polychain: 137,
  arbitrumchain: 42161,
  goerlichain: 5,
  sepoliachain: 11155111,
};
export const eip1559Chains = {
  bnbchain: false,
  ethchain: true, // presupunem ca reteaua ta Ethereum suporta EIP-1559
  dogechain: false,
  polychain: false,
  arbitrumchain: false,
  goerlichain: true,
  sepoliachain: true,
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
  };

  return defaultTokens[chain];
}

// https://rpc-mumbai.maticvigil.com/
//https://polygon-rpc.com/
// Polygon Mainnet:   https://polygon-mainnet.infura.io
// https://polygon-rpc.com
//export const ethchain =
// "https://eth-mainnet.g.alchemy.com/v2/MGbZdSk9u0Vlsapa_HufvZievDS9ajR6";
// bsc testnet https://data-seed-prebsc-1-s1.binance.org:8545/
// bsc mainnet: https://bsc-dataseed.binance.org/
//test bsc 2   https://bsc-testnet.publicnode.com
// eth test sepolia infura   https://sepolia.infura.io/v3/74bc4d4122e04aedba2a6d8bcc3164fd

//ARBITRUB  https://arb-goerli.g.alchemy.com/v2/t2cQiVI5X6yk0mZDgu1IrM90NAVhhMxi
