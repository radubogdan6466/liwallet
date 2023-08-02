import React, { useEffect, useState } from "react";
import { useTransaction } from "./utils/useTransaction";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Checkbox,
} from "@mui/material";
import {
  StyledBoxx,
  StyledFormControl,
  TypographyTitleForm,
  StyledDialogContent,
  DialogContentSend,
  StyledTextField,
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
      <TypographyTitleForm
        sx={{
          backgroundColor: theme.palette.text.popup,
        }}
      >
        Send {selectedTokenState}
      </TypographyTitleForm>
      <DialogContent
        sx={{
          backgroundColor: theme.palette.text.popup,
        }}
      >
        <Typography
          sx={{
            color: theme.palette.primary.icon,
            width: "70%",
          }}
        >
          {warningMessage}
        </Typography>
        <StyledBoxx
          sx={{
            backgroundColor: theme.palette.text.popup,
          }}
        >
          <StyledFormControl>
            <InputLabel
              id="token-select-label"
              sx={{
                color: theme.palette.text.secondary,
              }}
            />
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
          <InputLabel id="send-amount-label"></InputLabel>
          <DialogContentSend>
            <StyledTextField
              id="val"
              label="Amount"
              variant="outlined"
              required
              InputLabelProps={{
                style: { color: theme.palette.text.input },
              }}
              inputProps={{
                style: { color: theme.palette.text.input },
              }}
            />
            <StyledTextField
              id="toadrs"
              label="To Address"
              variant="outlined"
              required
              InputLabelProps={{
                style: { color: theme.palette.text.input },
              }}
              inputProps={{
                style: { color: theme.palette.text.input },
              }}
            />
            <StyledTextField
              id="gasprice"
              label="Gas Price (Gwei)"
              value={useCustomGasPrice ? customGasPrice : gasPrice}
              onChange={handleGasPriceChange}
              placeholder="Gas Price (Gwei)"
              disabled={!useCustomGasPrice}
              InputLabelProps={{
                style: { color: theme.palette.text.input },
              }}
              inputProps={{
                style: { color: theme.palette.text.input },
              }}
            />
          </DialogContentSend>
          <DialogActions>
            <Typography>Use custom Gas</Typography>
            <Checkbox
              checked={useCustomGasPrice}
              onChange={handleCheckboxChange}
              sx={{
                color: theme.palette.primary.icon,
              }}
            />
          </DialogActions>

          <Typography>Gas Price (Gwei): {gasPrice}</Typography>
        </StyledBoxx>
      </DialogContent>

      <StyledDialogContent
        sx={{
          backgroundColor: theme.palette.text.popup,
        }}
      >
        {showCheckButton && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddressCheck}
          >
            Check Address
          </Button>
        )}
        {addressChecked && (
          <Button variant="contained" color="primary" onClick={transferToken}>
            Send {selectedTokenState}
          </Button>
        )}
        <Button variant="contained" color="primary" onClick={transferToken}>
          Send without check {selectedTokenState}
        </Button>
      </StyledDialogContent>
      {transferDetails && <TransferDetails details={transferDetails} />}
    </Dialog>
  );
};
export default Send;
