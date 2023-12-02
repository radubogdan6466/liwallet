import React from "react";
import { Typography } from "@mui/material";
import {
  ETHERSCAN_BASE_URL,
  BSCSCAN_BASE_URL,
  DOGECHAIN_BASE_URL,
  POLYCHAIN_BASE_URL,
  ARBITRUMCHAIN_BASE_URL,
  GOERLICHAIN_BASE_URL,
  SEPOLIACHAIN_BASE_URL,
} from "./links.js";
import {
  ethchain,
  bnbchain,
  dogechain,
  polychain,
  arbitrumchain,
  goerlichain,
  sepoliachain,
} from "./utils.js";
import {
  TransferDetailsBox,
  LinkTransferDetails,
  TypographyTrDetails,
  TypographyTxDetails,
  TypographyAmountDetails,
  TypographyToDetails,
} from "./styles.js";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const TransferDetails = ({ details }) => {
  const { toAddress, amount, gasPrice, txHash, token, chain } = details;
  const theme = useTheme();
  const { t } = useTranslation();
  const getBaseUrl = (chain) => {
    if (chain === ethchain) {
      return ETHERSCAN_BASE_URL;
    } else if (chain === bnbchain) {
      return BSCSCAN_BASE_URL;
    } else if (chain === dogechain) {
      return DOGECHAIN_BASE_URL;
    } else if (chain === polychain) {
      return POLYCHAIN_BASE_URL;
    } else if (chain === arbitrumchain) {
      return ARBITRUMCHAIN_BASE_URL;
    } else if (chain === goerlichain) {
      return GOERLICHAIN_BASE_URL;
    } else if (chain === sepoliachain) {
      return SEPOLIACHAIN_BASE_URL;
    }
  };

  const baseUrl = getBaseUrl(chain);

  return (
    <TransferDetailsBox>
      <TypographyTrDetails>{t("tDetailsTitles")}</TypographyTrDetails>
      <TypographyAmountDetails>
        {t("amountDetails")}: {amount} {t("tokenDetails")}: {token}
      </TypographyAmountDetails>
      <TypographyTxDetails>
        Txn Hash:
        <LinkTransferDetails
          href={`${baseUrl}/tx/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {`${txHash.substring(0, 4)}...${txHash.substring(txHash.length - 4)}`}
        </LinkTransferDetails>
      </TypographyTxDetails>
      <TypographyToDetails>
        {t("to")}:
        <LinkTransferDetails
          href={`${baseUrl}/address/${toAddress}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {`${toAddress.substring(0, 4)}...${toAddress.substring(
            toAddress.length - 4
          )}`}
        </LinkTransferDetails>
      </TypographyToDetails>
    </TransferDetailsBox>
  );
};

export default TransferDetails;
