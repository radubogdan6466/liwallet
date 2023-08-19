import React, { useEffect, useState } from "react";
import { useTransaction } from "./utils/useTransaction";
import { ethers } from "ethers";
import {
  Dialog,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useTranslation } from "react-i18next";
import {
  StyledFormControl,
  StyledDialogSendContent,
  DialogContentSend,
  DialogMain,
  InputLabelSend,
  AmountSendTextField,
  inputLabelPropsStyles,
  inputPropsStyles,
  ToAdrsSendTextField,
  TransferDetailsBoxSendPage,
  CheckButton,
  CheckedAddressButton,
  UncheckedAddressButton,
  TypographyWarning,
} from "../hooks/styles.js";
import { getTokens, NativToken } from "./utils/chain.js";
import TransferDetails from "../hooks/TransferDetails.js";
import { useTheme } from "@mui/material/styles";
import calculateTransactionFee from "./utils/calculateTransactionFee";
const Send = ({ onClose, selectedToken, selectedChain }) => {
  const theme = useTheme();
  const [selectedTokenState, setSelectedTokenState] = useState(selectedToken);
  const gasLimit = ethers.BigNumber.from(21000); // Exemplu de limită de gaz
  const [transactionFee, setTransactionFee] = useState("0");
  const [nativeCurrencySymbol, setNativeCurrencySymbol] = useState("ETH");
  const { t } = useTranslation();
  const [isValidAddress, setIsValidAddress] = useState(false);

  const [openTooltips, setOpenTooltips] = useState({
    gasPrice: false,
    transactionFee: false,
  });
  const handleTooltipClick = (name) => {
    setOpenTooltips({
      ...openTooltips,
      [name]: !openTooltips[name],
    });
    setTimeout(() => {
      setOpenTooltips({
        ...openTooltips,
        [name]: false,
      });
    }, 2000);
  };
  const {
    transferDetails,
    addressChecked,
    showCheckButton,
    warningMessage,
    handleAddressCheck,
    transferToken,
    gasPrice,
  } = useTransaction(selectedTokenState, selectedChain, t);
  //andr        0xEC76CFF0C4992629f7Aa533BECc2783B9d420E68
  const closePopup = () => {
    onClose();
  };

  useEffect(() => {
    const tokens = getTokens(selectedChain);
    if (!tokens.some((token) => token.symbol === selectedTokenState)) {
      setSelectedTokenState(tokens[0].symbol);
    }
  }, [selectedChain, selectedTokenState]);
  useEffect(() => {
    const fee = calculateTransactionFee(gasPrice, gasLimit);
    setTransactionFee(fee);
  }, [gasPrice]);
  useEffect(() => {
    const newNativeCurrencySymbol = NativToken(selectedChain);
    setNativeCurrencySymbol(newNativeCurrencySymbol);

    const tokens = getTokens(selectedChain);
    if (!tokens.some((token) => token.symbol === selectedTokenState)) {
      setSelectedTokenState(tokens[0].symbol);
    }
  }, [selectedChain, selectedTokenState]);
  return (
    <Dialog open={true} onClose={closePopup}>
      <DialogMain>
        <InputLabel id="send-amount-label"></InputLabel>
        <DialogContentSend>
          <Typography variant="h4">{selectedTokenState}</Typography>
          <StyledFormControl>
            <InputLabelSend id="token-select-label" />
            <Select
              labelId="token-select-label"
              id="token-select"
              variant="standard"
              value={selectedTokenState}
              onChange={(e) => setSelectedTokenState(e.target.value)}
            >
              {getTokens(selectedChain).map((token) => (
                <MenuItem key={token.symbol} value={token.symbol}>
                  {token.symbol}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
          <AmountSendTextField
            id="val"
            placeholder={t("amountPlaceholder")}
            required
            size="small"
            InputLabelProps={{ style: inputLabelPropsStyles(theme) }}
            inputProps={{ style: inputPropsStyles(theme) }}
          />
          <ToAdrsSendTextField
            id="toadrs"
            required
            size="small"
            placeholder={t("sendToPlaceholder")}
            InputLabelProps={{ style: inputLabelPropsStyles(theme) }}
            inputProps={{ style: inputPropsStyles(theme) }}
            onChange={(e) => {
              const address = e.target.value;
              setIsValidAddress(ethers.utils.isAddress(address));
            }}
          />

          <Typography variant="caption">
            <Tooltip title={t("gasPriceTooltip")} open={openTooltips.gasPrice}>
              <IconButton
                size="small"
                style={{ marginLeft: 4 }}
                onClick={() => handleTooltipClick("gasPrice")}
              >
                <InfoOutlinedIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            {t("gasPrice")} {gasPrice}
          </Typography>
          <Typography variant="caption">
            <Tooltip
              title={t("transactionFeeTooltip")}
              open={openTooltips.transactionFee}
            >
              <IconButton
                size="small"
                style={{ marginLeft: 4 }}
                onClick={() => handleTooltipClick("transactionFee")}
              >
                <InfoOutlinedIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            {t("transactionFee")} {nativeCurrencySymbol}:
            {Number(transactionFee).toFixed(8)}
          </Typography>

          <TransferDetailsBoxSendPage>
            <TypographyWarning> {warningMessage}</TypographyWarning>
            {transferDetails && <TransferDetails details={transferDetails} />}
          </TransferDetailsBoxSendPage>
        </DialogContentSend>
        <StyledDialogSendContent>
          {showCheckButton && (
            <CheckButton
              variant="contained"
              size="small"
              onClick={handleAddressCheck}
              disabled={!isValidAddress}
            >
              {t("checkAddress")}
            </CheckButton>
          )}
          {addressChecked && (
            <CheckedAddressButton
              variant="contained"
              onClick={transferToken}
              size="small"
              disabled={!isValidAddress}
            >
              {t("sendToken")} {selectedTokenState}
            </CheckedAddressButton>
          )}
          <UncheckedAddressButton
            variant="contained"
            color="error"
            onClick={transferToken}
            size="small"
            disabled={!isValidAddress}
          >
            {t("sendToken")} {selectedTokenState}
          </UncheckedAddressButton>
        </StyledDialogSendContent>
      </DialogMain>
    </Dialog>
  );
};
export default Send;
