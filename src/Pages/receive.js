import React from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import {
  TypographyTitle,
  StyledBoxx,
  StyledFormControl,
  Link,
  ActionsContainer,
  FormContainer,
} from "./styles";
import QRCode from "qrcode.react";

const Receive = ({ onClose, userWallet }) => {
  const closePopup = () => {
    onClose();
  };
  const walletAddressStyle = {
    wordWrap: "break-word",
    overflowWrap: "break-word",
  };

  return (
    <StyledBoxx>
      <Dialog open={true} onClose={closePopup}>
        <DialogTitle>
          <TypographyTitle>Receive</TypographyTitle>
        </DialogTitle>
        <DialogContent>
          <Typography>Your Wallet Address:</Typography>
          <Typography style={walletAddressStyle}>
            {userWallet.address}
          </Typography>
          <Typography>Your QR Code:</Typography>
          <QRCode value={userWallet.address} />
        </DialogContent>
      </Dialog>
    </StyledBoxx>
  );
};

export default Receive;
