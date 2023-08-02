import React from "react";
import { Typography } from "@mui/material";
import {
  ETHERSCAN_BASE_URL,
  BSCSCAN_BASE_URL,
  DOGECHAIN_BASE_URL,
} from "./links.js";
import { ethchain, bnbchain, dogechain } from "./utils.js";
import { TransferDetailsBox, Link } from "./styles.js";
import { useTheme } from "@mui/material/styles"; // Importă useTheme hook

const TransferDetails = ({ details }) => {
  const { toAddress, amount, gasPrice, txHash, token, chain } = details;
  const theme = useTheme();

  const getBaseUrl = (chain) => {
    if (chain === ethchain) {
      return ETHERSCAN_BASE_URL;
    } else if (chain === bnbchain) {
      return BSCSCAN_BASE_URL;
    } else if (chain === dogechain) {
      return DOGECHAIN_BASE_URL;
    }
    throw new Error("Unknown chain: " + chain);
  };

  const baseUrl = getBaseUrl(chain);

  return (
    <TransferDetailsBox
      sx={{
        backgroundColor: theme.palette.text.popup,
      }}
    >
      <Typography variant="body1">Transfer Details:</Typography>
      <Typography variant="body2">
        To:
        <Link
          href={`${baseUrl}/address/${toAddress}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {`${toAddress.substring(0, 4)}...${toAddress.substring(
            toAddress.length - 4
          )}`}
        </Link>
      </Typography>
      <Typography variant="body2">
        Value: {amount} Token: {token}
      </Typography>
      <Typography variant="body2">Gas Price: {gasPrice} Gwei</Typography>
      <Typography variant="body2">
        Txn Hash:
        <Link
          href={`${baseUrl}/tx/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {`${txHash.substring(0, 4)}...${txHash.substring(txHash.length - 4)}`}
        </Link>
      </Typography>
    </TransferDetailsBox>
  );
};

export default TransferDetails;
