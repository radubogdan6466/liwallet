//utils.js
export const bnbchain = "https://bsc-rpc.publicnode.com";
export const ethchain = "https://eth.llamarpc.com";
export const dogechain = "https://rpc.dogechain.dog";
export const polychain = "https://polygon.llamarpc.com";
export const arbitrumchain = "https://arbitrum.llamarpc.com";
export const goerlichain = "https://rpc.ankr.com/eth_goerli";
export const sepoliachain = "https://1rpc.io/sepolia";
export const holeskychain = "https://ethereum-holesky-rpc.publicnode.com";
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
//new
export const apechain = "https://apechain.drpc.org";
export const arbitrumnovachain = "https://arbitrum-nova.public.blastapi.io";
export const berachain = "https://rpc.berachain-apis.com";
export const bttcchain = "https://rpc.bt.io";
export const fraxchain = "https://fraxtal.drpc.org";
export const memecorechain = "https://rpc.memecore.net";
export const moonbeamchain = "https://moonbeam.unitedbloc.com";
export const moonriverchain = "https://moonriver.api.onfinality.io/public";
export const opbnbchain = "https://opbnb-rpc.publicnode.com";
export const scrollchain = "https://rpc.ankr.com/scroll";
export const sonicchain = "https://sonic.drpc.org";
export const swellchain = "https://rpc.ankr.com/swell";
export const taikoalethiachain = "https://rpc.ankr.com/taiko";
export const unichain = "https://0xrpc.io/uni";
export const wemixchain = "https://api.wemix.com";
export const xaichain = "https://xai-chain.net/rpc";
export const xdcchain = "https://rpc.ankr.com/xdc";
export const zksyncerachain = "https://1rpc.io/zksync2-era";
export const zircuitchain = "https://mainnet.zircuit.com";

export const chains = {
  "BNB Smart Chain": bnbchain,
  "Ethereum Mainnet": ethchain,
  "Dogecoin chain": dogechain,
  "Polygon Mainnet": polychain,
  "Arbitrum One": arbitrumchain,
  "Goerli Chain": goerlichain,
  "Sepolia Chain": sepoliachain,
  "Holesky Chain": holeskychain,
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
  //new
  "Ape Chain": apechain,
  "Arbitrum Nova": arbitrumnovachain,
  "Bera Chain": berachain,
  "BitTorrent Chain Mainnet": bttcchain,
  "Fraxtal Chain": fraxchain,
  "MemeCore Chain": memecorechain,
  "Moonbeam Chain": moonbeamchain,
  "Moonriver Chain": moonriverchain,
  "opBNB Mainnet": opbnbchain,
  "Scroll Chain": scrollchain,
  "Sonic Mainnet": sonicchain,
  "Swellchain Chain": swellchain,
  "Taiko Alethia": taikoalethiachain,
  "Unichain Chain": unichain,
  "WEMIX3.0 Mainnet": wemixchain,
  "Xai Mainnet": xaichain,
  "XDC Network": xdcchain,
  "zkSync Mainnet": zksyncerachain,
  "Zircuit Mainnet": zircuitchain,
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
    case holeskychain:
      return "holeskychain";
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
    //new
    case apechain:
      return "apechain";
    case arbitrumnovachain:
      return "arbitrumnovachain";
    case berachain:
      return "berachain";
    case bttcchain:
      return "bttcchain";
    case fraxchain:
      return "fraxchain";
    case memecorechain:
      return "memecorechain";
    case moonbeamchain:
      return "moonbeamchain";
    case moonriverchain:
      return "moonriverchain";
    case opbnbchain:
      return "opbnbchain";
    case scrollchain:
      return "scrollchain";
    case sonicchain:
      return "sonicchain";
    case swellchain:
      return "swellchain";
    case taikoalethiachain:
      return "taikoalethiachain";
    case unichain:
      return "unichain";
    case wemixchain:
      return "wemixchain";
    case xaichain:
      return "xaichain";
    case xdcchain:
      return "xdcchain";
    case zksyncerachain:
      return "zksyncerachain";
    case zircuitchain:
      return "zircuitchain";
    default:
      return "";
  }
};
// apechain;
// arbitrumnovachain;
// berachain;
// bttcchain;
// fraxchain;
// memecorechain;
// moonbeamchain;
// moonriverchain;
// opbnbchain;
// scrollchain;
// sonicchain;
// swellchain;
// taikoalethiachain;
// unichain;
// wemixchain;
// xaichain;
// xdcchain;
// zksyncerachain;
// zircuitchain;
//2000
export const chainIds = {
  bnbchain: 56,
  ethchain: 1,
  dogechain: 2000,
  polychain: 137,
  arbitrumchain: 42161,
  goerlichain: 5,
  sepoliachain: 11155111,
  holeskychain: 17000,
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
  //new
  apechain: 33139,
  arbitrumnovachain: 42170,
  berachain: 80094,
  bttcchain: 199,
  fraxchain: 252,
  memecorechain: 4352,
  moonbeamchain: 1284,
  moonriverchain: 1285,
  opbnbchain: 204,
  scrollchain: 534352,
  sonicchain: 146,
  swellchain: 1923,
  taikoalethiachain: 167000,
  unichain: 130,
  wemixchain: 1111,
  xaichain: 660279,
  xdcchain: 50,
  zksyncerachain: 324,
  zircuitchain: 48900,
};
export const eip1559Chains = {
  bnbchain: false,
  ethchain: true,
  dogechain: false,
  polychain: false,
  arbitrumchain: false,
  goerlichain: true,
  sepoliachain: true,
  holeskychain: true,
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
  //new
  apechain: false,
  arbitrumnovachain: false,
  berachain: false,
  bttcchain: false,
  fraxchain: false,
  memecorechain: false,
  moonbeamchain: false,
  moonriverchain: false,
  opbnbchain: false,
  scrollchain: false,
  sonicchain: false,
  swellchain: false,
  taikoalethiachain: false,
  unichain: false,
  wemixchain: false,
  xaichain: false,
  xdcchain: false,
  zksyncerachain: false,
  zircuitchain: false,
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
    holeskychain: "ETH Holesky",
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
    //new
    apechain: "APE",
    arbitrumnovachain: "ETH",
    berachain: "BERA",
    bttcchain: "BTT",
    fraxchain: "frxETH",
    memecorechain: "M",
    moonbeamchain: "GLMR",
    moonriverchain: "MOVR",
    opbnbchain: "BNB",
    scrollchain: "ETH",
    sonicchain: "S",
    swellchain: "ETH",
    taikoalethiachain: "ETH",
    unichain: "ETH",
    wemixchain: "WEMIX",
    xaichain: "XAI",
    xdcchain: "XDC",
    zksyncerachain: "ETH",
    zircuitchain: "ETH",
  };

  return defaultTokens[chain];
}
