import React, { useEffect, useState } from "react";
import { useTransaction } from "./utils/useTransaction";
import {
  Dialog,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import {
  StyledFormControl,
  StyledGasTextfield,
  DialogActionsCustomGas,
  StyledDialogSendContent,
  DialogContentSend,
  TypographyCustomGas,
  DialogActionsCustomGasCheck,
  DialogMain,
  InputLabelSend,
  AmountSendTextField,
  inputLabelPropsStyles,
  inputPropsStyles,
  ToAdrsSendTextField,
  GasCheckBox,
  TransferDetailsBoxSendPage,
  CheckButton,
  CheckedAddressButton,
  UncheckedAddressButton,
  TypographyWarning,
} from "../hooks/styles.js";
import { getTokens } from "./utils/chain.js";
import TransferDetails from "../hooks/TransferDetails.js";
import { useTheme } from "@mui/material/styles"; // Importă useTheme hook
const Send = ({ onClose, selectedToken, selectedChain }) => {
  const theme = useTheme();
  const [selectedTokenState, setSelectedTokenState] = useState(selectedToken);
  const {
    transferDetails,
    addressChecked,
    showCheckButton,
    warningMessage,
    handleAddressCheck,
    transferToken,
    gasPrice,
    customGasPrice,
    setCustomGasPrice,
    useCustomGasPrice,
    setUseCustomGasPrice,
  } = useTransaction(selectedToken, selectedChain);

  //andr        0xEC76CFF0C4992629f7Aa533BECc2783B9d420E68
  const closePopup = () => {
    onClose();
  };
  const handleGasPriceChange = (e) => {
    setCustomGasPrice(e.target.value);
  };
  const handleCheckboxChange = (e) => {
    setUseCustomGasPrice(e.target.checked);
  };
  useEffect(() => {
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
            placeholder="Amount"
            required
            size="small"
            InputLabelProps={{ style: inputLabelPropsStyles(theme) }}
            inputProps={{ style: inputPropsStyles(theme) }}
          />
          <ToAdrsSendTextField
            id="toadrs"
            required
            size="small"
            placeholder="Sending to"
            InputLabelProps={{ style: inputLabelPropsStyles(theme) }}
            inputProps={{ style: inputPropsStyles(theme) }}
          />
          <DialogActionsCustomGas>
            <DialogActionsCustomGasCheck>
              <TypographyCustomGas>Custom Gas</TypographyCustomGas>
              <GasCheckBox
                checked={useCustomGasPrice}
                onChange={handleCheckboxChange}
              />
            </DialogActionsCustomGasCheck>
            <StyledGasTextfield
              id="gasprice"
              label="Gwei"
              size="small"
              value={useCustomGasPrice ? customGasPrice || "" : gasPrice || ""}
              onChange={handleGasPriceChange}
              placeholder="Gas Price (Gwei)"
              disabled={!useCustomGasPrice}
              InputLabelProps={{ style: inputLabelPropsStyles(theme) }}
              inputProps={{ style: inputPropsStyles(theme) }}
            />
          </DialogActionsCustomGas>
          <Typography variant="caption">
            Gas Price (Gwei): {gasPrice}
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
            >
              Check Address
            </CheckButton>
          )}
          {addressChecked && (
            <CheckedAddressButton
              variant="contained"
              onClick={transferToken}
              size="small"
            >
              Send {selectedTokenState}
            </CheckedAddressButton>
          )}
          <UncheckedAddressButton
            variant="contained"
            color="error"
            onClick={transferToken}
            size="small"
          >
            Send {selectedTokenState}
          </UncheckedAddressButton>
        </StyledDialogSendContent>
      </DialogMain>
    </Dialog>
  );
};
export default Send;
