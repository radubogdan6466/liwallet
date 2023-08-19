import React, { useState, useEffect, useMemo } from "react";
import EthereumAddress from "ethereum-address";
import { ethers } from "ethers";
import { useTokenImportHandler } from "../hooks/tokenImportHandler.js";
import { chainIds, getChainNameFromUrl } from "../hooks/utils.js";
import { handleError } from "../hooks/errorHandler.js";
import { useTheme } from "@mui/material/styles";
import { Dialog, DialogTitle, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import useLoading from "../hooks/useLoading.js";

import {
  TypographyTitle,
  ActionsContainer,
  TypographyErrImport,
  DialogImportContent,
  FormImport,
  ImportBtn,
  ImportFormField,
} from "../hooks/styles.js";

const TokenImport = ({ onClose, selectedChain }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [isLoading, setIsLoading, LoadingIndicator] = useLoading(false, 500);
  const [loading, setLoading] = useState(false);
  const [importedTokens, setImportedTokens] = useState(
    JSON.parse(
      localStorage.getItem(getChainNameFromUrl(selectedChain) + "Tokens")
    ) || []
  );
  const closePopup = () => {
    onClose();
  };
  const handleTokenImport = useTokenImportHandler(
    importedTokens,
    setImportedTokens,
    selectedChain
  );

  useEffect(() => {
    const chainName = getChainNameFromUrl(selectedChain);
    const chainId = chainIds[chainName];
    setTokenChainId(chainId);
    const storedTokens = JSON.parse(
      localStorage.getItem(getChainNameFromUrl(selectedChain) + "Tokens")
    );

    if (storedTokens) {
      setImportedTokens(storedTokens);
    }
  }, [selectedChain]);

  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenDecimals, setTokenDecimals] = useState(18);
  const [tokenChainId, setTokenChainId] = useState(null);
  const [isValidAddress, setIsValidAddress] = useState(false);

  const [error, setError] = useState("");
  const [isTokenAdded, setIsTokenAdded] = useState(false);
  const provider = useMemo(
    () => new ethers.providers.JsonRpcProvider(selectedChain),
    [selectedChain]
  );

  useEffect(() => {
    setIsValidAddress(EthereumAddress.isAddress(tokenAddress));
  }, [tokenAddress]);
  useEffect(() => {
    if (EthereumAddress.isAddress(tokenAddress)) {
      setLoading(true); // Adauga aceasta linie
      const erc20Abi = [
        "function symbol() view returns (string)",
        "function decimals() view returns (uint8)",
      ];
      const tokenContract = new ethers.Contract(
        tokenAddress,
        erc20Abi,
        provider
      );
      async function fetchTokenSymbolAndDecimals() {
        try {
          const symbol = await tokenContract.symbol();
          setTokenSymbol(symbol);
          const decimals = await tokenContract.decimals();
          setTokenDecimals(decimals);
        } catch (err) {
          if (err.code === ethers.utils.Logger.errors.CALL_EXCEPTION) {
            setError(handleError({ message: "CALL_EXCEPTION" }, t));
          } else {
            console.error(err);
          }
        } finally {
          setLoading(false);
        }
      }
      fetchTokenSymbolAndDecimals();
    }
  }, [tokenAddress, provider, t]);
  const handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    const validAddress = EthereumAddress.isAddress(tokenAddress);
    setIsValidAddress(validAddress);

    if (!isValidAddress) {
      setError(t("InvalidAddress"));
      return;
    }

    const chainId = parseInt(tokenChainId);

    const importResult = handleTokenImport(
      tokenAddress,
      tokenSymbol,
      tokenDecimals,
      chainId
    );
    if (importResult.tokenAlreadyImported) {
      setError("Tokenul este deja importat!");
      return;
    }

    setTokenAddress("");
    setTokenSymbol("");
    setTokenDecimals("");
    setTokenChainId("");
    setError("");
    setIsTokenAdded(true);
    const event = new CustomEvent("tokenAdded", { detail: tokenAddress });
    window.dispatchEvent(event);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);
  return (
    <Dialog open={true} onClose={closePopup}>
      <DialogTitle sx={{ backgroundColor: theme.palette.background.light }}>
        <TypographyTitle>{t("ImportToken")}</TypographyTitle>
      </DialogTitle>

      <LoadingIndicator />
      {!isLoading && (
        <>
          {error && <TypographyErrImport>{error}</TypographyErrImport>}
          <DialogImportContent>
            <FormImport onSubmit={handleSubmit}>
              <ImportFormField
                type="text"
                label={t("EnterTokenAddress")}
                value={tokenAddress}
                onChange={(event) => setTokenAddress(event.target.value)}
                error={
                  error === t("error.callException") ||
                  error === t("InvalidEthereumAddress")
                }
                helperText={
                  error === t("IncorrectAddressCheckChain") ||
                  error === t("InvalidEthereumAddress")
                    ? error
                    : ""
                }
                InputLabelProps={{
                  style: { color: theme.palette.text.input },
                }}
                inputProps={{
                  style: { color: theme.palette.text.input },
                }}
              />

              <ImportFormField
                type="text"
                label="Symbol"
                value={tokenSymbol}
                disabled
                onChange={(event) => setTokenSymbol(event.target.value)}
              />
              <ImportFormField
                type="number"
                label="Decimals"
                disabled
                value={tokenDecimals}
                onChange={(event) => setTokenDecimals(event.target.value)}
              />
              <ImportFormField
                type="number"
                label="Network ID"
                value={tokenChainId !== null ? tokenChainId : ""}
                onChange={(event) => setTokenChainId(event.target.value)}
                disabled
                hidden
                style={{ display: "none" }}
              />
              <ActionsContainer>
                <ImportBtn
                  type="submit"
                  variant="contained"
                  disabled={
                    !isValidAddress ||
                    tokenSymbol === "" ||
                    tokenDecimals === "" ||
                    tokenChainId === ""
                  }
                >
                  {isTokenAdded ? t("successAddToken") : t("addToken")}
                </ImportBtn>
              </ActionsContainer>
            </FormImport>
          </DialogImportContent>
        </>
      )}
    </Dialog>
  );
};

export default TokenImport;
//ethereum sepolia testnet tokens
//  0xf8E3a8FC5673b928107c78B7Af4C0b89A4c3Aac8
//   0x900B61C0b67bB3aBFAA6331Ebd2f2d08AE79cdE9
//   0xF4A81571A52185d5cfe2344C36afddD49210fE13
//   0x250a270B50C287ce4b613Cb4E2d78E14D05EcD9C
//    0x39bAB97C19902348225588108Be36eD609Cd0b85
/////////////////////////////////////////////////////
// mtk bsc testnet    0x250a270B50C287ce4b613Cb4E2d78E14D05EcD9C
//doge coin erc20 tokens
//   0x8A08d9bF87578De8DAA4C54e423472603aaD813B
////////////////////////////////////////////////////////////

// binance bsc smart chain TOKENS
//zix
//    0x48077400FAF11183c043Feb5184a13ea628Bb0DB
//wista
//    0x3720E3C827daB665383b32bC49766D2d24C1Ed35
//doge
//    0xbA2aE424d960c26247Dd6c32edC70B295c744C43
// ETH
//    0x2170Ed0880ac9A755fd29B2688956BD959F933F8
//MATIC
//    0xCC42724C6683B7E57334c4E856f4c9965ED682bD
//////////////////////////////////////////////////////
// polygon matic chain tokens
// ENF
// 0xd096669B1C20B0fcEeDF0f4164eE918b9D709B7f
