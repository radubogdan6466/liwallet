import {
  dogechainTokens,
  bnbchainTokens,
  ethchainTokens,
} from "./JsonFiles/tokens";

export function getTokensByChain(selectedChain, ethchain, bnbchain, dogechain) {
  let tokens;

  if (selectedChain === ethchain) {
    tokens = ethchainTokens;
  } else if (selectedChain === bnbchain) {
    tokens = bnbchainTokens;
  } else if (selectedChain === dogechain) {
    tokens = dogechainTokens;
  } else {
    tokens = [];
  }

  return tokens;
}
