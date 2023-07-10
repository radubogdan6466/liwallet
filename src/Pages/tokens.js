import mimabi from "../mimabi";
import binanceAbi from "../binance";

export const ethchainTokens = [
  {
    symbol: "BLL",
    address: "0x39e12053803898211F21047D56017986E0f070c1",
    abi: mimabi,
  },
  {
    symbol: "DINCOIN",
    address: "0x900B61C0b67bB3aBFAA6331Ebd2f2d08AE79cdE9",
    abi: mimabi,
  },
  {
    symbol: "MIM",
    address: "0xfFC0c19ac655494e8BA9AA2D2d17e1F9114C2c92",
    abi: mimabi,
  },

  {
    symbol: "MANEA",
    address: "0x39bAB97C19902348225588108Be36eD609Cd0b85",
    abi: mimabi,
  },

  {
    symbol: "MTA",
    address: "0xf8E3a8FC5673b928107c78B7Af4C0b89A4c3Aac8",
    abi: mimabi,
  },
];

export const bnbchainTokens = [
  {
    symbol: "MTK",
    address: "0x250a270B50C287ce4b613Cb4E2d78E14D05EcD9C",
    abi: mimabi,
  },
];

export const dogechainTokens = [
  {
    symbol: "DTK",
    address: "0x8A08d9bF87578De8DAA4C54e423472603aaD813B",
    abi: binanceAbi,
  },
];
