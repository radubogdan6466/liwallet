import React from "react";
import { Dialog, Typography, Box } from "@mui/material";
import QRCode from "qrcode.react";

const Receive = ({ onClose, userWallet }) => {
  const closePopup = () => {
    onClose();
  };

  return (
    <Dialog open={true} onClose={closePopup}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: "10px",
        }}
      >
        <Typography>Trimite adresa sau scaneaza codul</Typography>
        <Typography
          sx={{
            maxWidth: "90%", // Se asigură că textul nu depășește 90% din lățimea containerului său
            overflowWrap: "break-word", // Rupe adresa dacă aceasta nu se încadrează complet în spațiu
          }}
        >
          {userWallet.address}
        </Typography>
        <Typography>Scaneaza codul QR</Typography>
        <QRCode value={userWallet.address} />
      </Box>
    </Dialog>
  );
};

export default Receive;
