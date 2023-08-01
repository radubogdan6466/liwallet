// tokenImportHandler.js
import { useCallback } from "react";
import { getChainNameFromUrl } from "./utils";

export const useTokenImportHandler = (
  importedTokens,
  setImportedTokens,
  chainName
) => {
  return useCallback(
    (tokenAddress, tokenSymbol, tokenDecimals, chainId) => {
      const isTokenImported = importedTokens.some(
        (token) => token.address === tokenAddress && token.chainId === chainId
      );

      if (isTokenImported) {
        return { tokenAlreadyImported: true };
      } else {
        const importedToken = {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          chainId,
          logo: "",
        };

        const updatedTokens = [...importedTokens, importedToken];
        setImportedTokens(updatedTokens);
        localStorage.setItem(
          getChainNameFromUrl(chainName) + "Tokens",
          JSON.stringify(updatedTokens)
        );
        return { tokenAlreadyImported: false };
      }
    },
    [importedTokens, setImportedTokens, chainName]
  );
};
