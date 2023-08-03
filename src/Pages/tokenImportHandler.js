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
        console.log("Token already imported!");
      } else {
        const importedToken = {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          chainId,
          logo: "", // Poți adăuga logoul aici dacă este necesar
        };
        console.log(importedToken);

        const updatedTokens = [...importedTokens, importedToken];
        setImportedTokens(updatedTokens);
        localStorage.setItem(
          getChainNameFromUrl(chainName) + "Tokens",
          JSON.stringify(updatedTokens)
        );
        console.log(
          "Token imported successfully!" + JSON.stringify(importedToken)
        );
      }
    },
    [importedTokens, setImportedTokens, chainName]
  );
};
