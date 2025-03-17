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
  HOLESKYCHAIN_BASE_URL,
  BASECHAIN_BASE_URL,
  AVALANCHECHAIN_BASE_URL,
  OPMAINNETCHAIN_BASE_URL,
  CRONOSMAINNETCHAIN_BASE_URL,
  LINEAMAINNETCHAIN_BASE_URL,
  MANTLEMAINNETCHAIN_BASE_URL,
  PULSEMAINNETCHAIN_BASE_URL,
  FANTOMCHAIN_BASE_URL,
  GNOSISCHAIN_BASE_URL,
  CELOCHAIN_BASE_URL,
  HARMONYCHAIN_BASE_URL,
  BLASTCHAIN_BASE_URL,
  ZETACHAIN_BASE_URL,
  //new
  APECHAIN_BASE_URL,
  ARBITRUMNOVACHAIN_BASE_URL,
  BERACHAIN_BASE_URL,
  BTTCCHAIN_BASE_URL,
  FRAXCHAIN_BASE_URL,
  MEMECORECHAIN_BASE_URL,
  MOONBEAMCHAIN_BASE_URL,
  MOONRIVERCHAIN_BASE_URL,
  OPBNBCHAIN_BASE_URL,
  SCROLLCHAIN_BASE_URL,
  SONICCHAIN_BASE_URL,
  SWELLCHAIN_BASE_URL,
  TAIKOALETHIACHAIN_BASE_URL,
  UNICHAIN_BASE_URL,
  WEMIXCHAIN_BASE_URL,
  XAICHAIN_BASE_URL,
  XDCCHAIN_BASE_URL,
  ZKSYNCERACHAIN_BASE_URL,
  ZIRCUITCHAIN_BASE_URL,
} from "./links.js";
import {
  ethchain,
  bnbchain,
  dogechain,
  polychain,
  arbitrumchain,
  goerlichain,
  sepoliachain,
  holeskychain,
  basechain,
  avalanchechain,
  opMainnetChain,
  cronosMainnetChain,
  lineaMainnetChain,
  mantleMainnetChain,
  pulseMainnetChain,
  fantomChain,
  gnosisChain,
  celoChain,
  harmonyChain,
  blastChain,
  zetaChain,
  //new
  apechain,
  arbitrumnovachain,
  berachain,
  bttcchain,
  fraxchain,
  memecorechain,
  moonbeamchain,
  moonriverchain,
  opbnbchain,
  scrollchain,
  sonicchain,
  swellchain,
  taikoalethiachain,
  unichain,
  wemixchain,
  xaichain,
  xdcchain,
  zksyncerachain,
  zircuitchain,
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
    } else if (chain === holeskychain) {
      return HOLESKYCHAIN_BASE_URL;
    } else if (chain === basechain) {
      return BASECHAIN_BASE_URL;
    } else if (chain === avalanchechain) {
      return AVALANCHECHAIN_BASE_URL;
    } else if (chain === opMainnetChain) {
      return OPMAINNETCHAIN_BASE_URL;
    } else if (chain === cronosMainnetChain) {
      return CRONOSMAINNETCHAIN_BASE_URL;
    } else if (chain === lineaMainnetChain) {
      return LINEAMAINNETCHAIN_BASE_URL;
    } else if (chain === mantleMainnetChain) {
      return MANTLEMAINNETCHAIN_BASE_URL;
    } else if (chain === pulseMainnetChain) {
      return PULSEMAINNETCHAIN_BASE_URL;
    } else if (chain === fantomChain) {
      return FANTOMCHAIN_BASE_URL;
    } else if (chain === gnosisChain) {
      return GNOSISCHAIN_BASE_URL;
    } else if (chain === celoChain) {
      return CELOCHAIN_BASE_URL;
    } else if (chain === harmonyChain) {
      return HARMONYCHAIN_BASE_URL;
    } else if (chain === blastChain) {
      return BLASTCHAIN_BASE_URL;
    } else if (chain === zetaChain) {
      return ZETACHAIN_BASE_URL;
    } else if (chain === apechain) {
      //new
      return APECHAIN_BASE_URL;
    } else if (chain === arbitrumnovachain) {
      return ARBITRUMNOVACHAIN_BASE_URL;
    } else if (chain === berachain) {
      return BERACHAIN_BASE_URL;
    } else if (chain === bttcchain) {
      return BTTCCHAIN_BASE_URL;
    } else if (chain === fraxchain) {
      return FRAXCHAIN_BASE_URL;
    } else if (chain === memecorechain) {
      return MEMECORECHAIN_BASE_URL;
    } else if (chain === moonbeamchain) {
      return MOONBEAMCHAIN_BASE_URL;
    } else if (chain === moonriverchain) {
      return MOONRIVERCHAIN_BASE_URL;
    } else if (chain === opbnbchain) {
      return OPBNBCHAIN_BASE_URL;
    } else if (chain === scrollchain) {
      return SCROLLCHAIN_BASE_URL;
    } else if (chain === sonicchain) {
      return SONICCHAIN_BASE_URL;
    } else if (chain === swellchain) {
      return SWELLCHAIN_BASE_URL;
    } else if (chain === taikoalethiachain) {
      return TAIKOALETHIACHAIN_BASE_URL;
    } else if (chain === unichain) {
      return UNICHAIN_BASE_URL;
    } else if (chain === wemixchain) {
      return WEMIXCHAIN_BASE_URL;
    } else if (chain === xaichain) {
      return XAICHAIN_BASE_URL;
    } else if (chain === xdcchain) {
      return XDCCHAIN_BASE_URL;
    } else if (chain === zksyncerachain) {
      return ZKSYNCERACHAIN_BASE_URL;
    } else if (chain === zircuitchain) {
      return ZIRCUITCHAIN_BASE_URL;
    }
  };

  const baseUrl = getBaseUrl(chain);

  return (
    <TransferDetailsBox>
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
