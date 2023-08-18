import React from "react";
import { Dialog, Typography, Box } from "@mui/material";
import QRCode from "qrcode.react";
import { useTranslation } from "react-i18next";

const Receive = ({ onClose, userWallet }) => {
  const { t } = useTranslation();

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
        <Typography>{t("sendAddress")}</Typography>
        <Typography
          sx={{
            maxWidth: "90%",
            overflowWrap: "break-word",
          }}
        >
          {userWallet.address}
        </Typography>
        <Typography>{t("scanQR")}</Typography>
        <QRCode value={userWallet.address} />
      </Box>
    </Dialog>
  );
};

export default Receive;
