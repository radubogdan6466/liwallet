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
  Box,
} from "@mui/material";
import {
  StyledBoxx,
  StyledFormControl,
  TypographyTitleForm,
  StyledDialogContent,
  StyledGasTextfield,
  DialogActionsCustomGas,
  StyledDialogSendContent,
  DialogContentSend,
  StyledTextField,
  CheckboxCustomGas,
  TypographyCustomGas,
  DialogActionsCustomGasCheck,
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
      <DialogContent
        sx={{
          backgroundColor: theme.palette.background.light,
        }}
      >
        <InputLabel id="send-amount-label"></InputLabel>
        <DialogContentSend>
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
          <StyledTextField
            id="val"
            label="Amount"
            variant="filled"
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
          <DialogActionsCustomGas
            sx={{
              width: "222.4px",
              marginTop: "10px",
            }}
          >
            <DialogActionsCustomGasCheck>
              <TypographyCustomGas variant="caption">
                Use custom Gas
              </TypographyCustomGas>
              <Checkbox
                checked={useCustomGasPrice}
                onChange={handleCheckboxChange}
                sx={{
                  color: theme.palette.primary.icon,
                }}
              />
            </DialogActionsCustomGasCheck>
            <StyledGasTextfield
              id="gasprice"
              label="(Gwei)"
              value={useCustomGasPrice ? customGasPrice || "" : gasPrice || ""}
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
          </DialogActionsCustomGas>
          <Typography variant="caption">
            Gas Price (Gwei): {gasPrice}
          </Typography>
        </DialogContentSend>

        <Box
          sx={{
            color: theme.palette.primary.icon,
            textAlign: "center",
            fontSize: "12px",
            width: "100%",
            maxWidth: "222.4px",
            marginLeft: "20px",
          }}
        >
          {warningMessage}
          {transferDetails && <TransferDetails details={transferDetails} />}
        </Box>
        <StyledDialogSendContent
          sx={{
            backgroundColor: theme.palette.background.light,
          }}
        >
          {showCheckButton && (
            <Button
              variant="contained"
              size="small"
              onClick={handleAddressCheck}
              sx={{
                marginRight: "5px", // adaugă spațiu între butoane
                fontSize: "12px",
                width: "100px",

                backgroundColor: theme.palette.button.normal,
                color: theme.palette.button.textNormal,
                "&:hover": {
                  backgroundColor: theme.palette.button.hover,
                  color: theme.palette.button.textHover,
                },
              }}
            >
              Check Address
            </Button>
          )}
          {addressChecked && (
            <Button
              variant="contained"
              color="success"
              onClick={transferToken}
              size="small"
              sx={{
                marginRight: "5px", // adaugă spațiu între butoane
                fontSize: "12px",
                width: "100px",

                backgroundColor: theme.palette.button.normal,
                color: theme.palette.button.textNormal,
                "&:hover": {
                  backgroundColor: theme.palette.button.hover,
                  color: theme.palette.button.textHover,
                },
              }}
            >
              Send {selectedTokenState}
            </Button>
          )}
          <Button
            variant="contained"
            color="error"
            onClick={transferToken}
            size="small"
            sx={{
              marginRight: "5px", // adaugă spațiu între butoane
              fontSize: "12px",
              width: "100px",

              backgroundColor: theme.palette.button.normal,
              color: theme.palette.button.textNormal,
              "&:hover": {
                backgroundColor: theme.palette.button.hover,
                color: theme.palette.button.textHover,
              },
            }}
          >
            Send {selectedTokenState}
          </Button>
        </StyledDialogSendContent>
      </DialogContent>
    </Dialog>
  );
};
export default Send;
