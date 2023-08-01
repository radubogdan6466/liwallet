import React, { useEffect, useState } from "react";
import { useTransaction } from "./utils/useTransaction";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  FormControl,
} from "@mui/material";
import {
  StyledBoxx,
  StyledFormControl,
  TypographyTitleForm,
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
  } = useTransaction(selectedToken, selectedChain);
  //        0xEC76CFF0C4992629f7Aa533BECc2783B9d420E68
  const closePopup = () => {
    onClose();
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
        <Typography variant="body2" color="error">
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
          <TextField id="val" label="Amount" variant="outlined" required />
          <TextField
            id="toadrs"
            label="To Address"
            variant="outlined"
            required
          />
          <TextField
            id="gasprice"
            value={gasPrice}
            placeholder="Gas Price (Gwei)"
          />
          <Typography>Gas Price (Gwei): {gasPrice}</Typography>
        </StyledBoxx>
      </DialogContent>

      <DialogActions
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
        <Button variant="outlined" color="secondary" onClick={closePopup}>
          Close
        </Button>
      </DialogActions>
      {transferDetails && <TransferDetails details={transferDetails} />}
    </Dialog>
  );
};
export default Send;
