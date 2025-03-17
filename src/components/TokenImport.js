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
  inputLabelPropsStylesSend,
  inputPropsStylesSend,
  TypographyTitleImport,
} from "../hooks/styles.js";

const TokenImport = ({ onClose, selectedChain }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [isLoading, setIsLoading, LoadingIndicator] = useLoading(false, 50);
  const [loading, setLoading] = useState(false);
  const [closeDialog, setCloseDialog] = useState(false);

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
      setError("Toke already imported!");
      return;
    }

    setTokenAddress("");
    setTokenSymbol("");
    setTokenDecimals("");
    setTokenChainId("");
    setError("");
    setIsTokenAdded(true);
    setCloseDialog(true); // dialog close after import

    const event = new CustomEvent("tokenAdded", { detail: tokenAddress });
    window.dispatchEvent(event);
    //screen reload after token import, won't auto refresh if commented

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  useEffect(() => {
    if (closeDialog) {
      const timeoutId = setTimeout(() => {
        closePopup();
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [closeDialog]);
  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);
  return (
    <Dialog open={true} onClose={closePopup}>
      <DialogTitle
        sx={{ backgroundColor: "rgba(29, 35, 41)", color: "#ffffff" }}
      >
        <TypographyTitleImport>{t("ImportToken")}</TypographyTitleImport>
      </DialogTitle>

      <LoadingIndicator />
      {!isLoading && (
        <>
          {error && (
            <TypographyErrImport
              sx={{
                backgroundColor: "rgba(29, 35, 41)",
                color: "red",
                "& input:focus": {
                  borderColor: "#38ef7d",
                },
                "& fieldset": {
                  borderColor: "#38ef7d",
                },
              }}
            >
              {error}
            </TypographyErrImport>
          )}
          <DialogImportContent sx={{ backgroundColor: "rgba(29, 35, 41)" }}>
            <FormImport onSubmit={handleSubmit}>
              <ImportFormField
                type="text"
                // label={t("EnterTokenAddress")}
                placeholder={t("Contract")}
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
                color="success"
                InputLabelProps={{ style: inputLabelPropsStylesSend(theme) }}
                inputProps={{
                  style: {
                    fontSize: "10px",

                    color: "#f2f2f2", // Culoarea textului
                    backgroundColor: "rgba(29, 35, 41)",
                    "&:focus": {
                      borderColor: "#38ef7d",
                    },
                  },
                }}
                sx={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  width: "222.4px",
                  "& input:focus": {
                    borderColor: "#38ef7d",
                  },
                  "& fieldset": {
                    borderColor: "#38ef7d",
                  },
                }}
              />

              <ImportFormField
                type="text"
                // label="Symbol"
                value={tokenSymbol}
                // disabled
                onChange={(event) => setTokenSymbol(event.target.value)}
                color="success"
                InputLabelProps={{ style: inputLabelPropsStylesSend(theme) }}
                inputProps={{
                  style: {
                    fontSize: "10px",

                    color: "#f2f2f2", // Culoarea textului
                    backgroundColor: "rgba(29, 35, 41)",
                    "&:focus": {
                      borderColor: "#38ef7d",
                    },
                  },
                }}
                sx={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  width: "222.4px",
                  "& input:focus": {
                    borderColor: "#38ef7d",
                  },
                  "& fieldset": {
                    borderColor: "#38ef7d",
                  },
                }}
              />
              <ImportFormField
                type="number"
                // label="Decimals"
                // disabled
                value={tokenDecimals}
                onChange={(event) => setTokenDecimals(event.target.value)}
                color="success"
                // InputLabelProps={{ style: inputLabelPropsStylesSend(theme) }}
                inputProps={{
                  style: {
                    fontSize: "10px",

                    color: "#f2f2f2", // Culoarea textului
                    backgroundColor: "rgba(29, 35, 41)",
                    "&:focus": {
                      borderColor: "#38ef7d",
                    },
                  },
                }}
                sx={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  width: "222.4px",
                  "& input:focus": {
                    borderColor: "#38ef7d",
                  },
                  "& fieldset": {
                    borderColor: "#38ef7d",
                  },
                }}
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
