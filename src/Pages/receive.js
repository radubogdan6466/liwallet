import React from "react";
import { Dialog, Typography } from "@mui/material";
import { StyledDialogContent } from "./styles";
import QRCode from "qrcode.react";

const Receive = ({ onClose, userWallet }) => {
  const closePopup = () => {
    onClose();
  };

  return (
    <Dialog open={true} onClose={closePopup}>
      <StyledDialogContent>
        <Typography>Trimite adresa sau scaneaza codul</Typography>
        <Typography>{userWallet.address}</Typography>
        <Typography>Scaneaza codul QR</Typography>
        <QRCode value={userWallet.address} />
      </StyledDialogContent>
    </Dialog>
  );
};

export default Receive;
