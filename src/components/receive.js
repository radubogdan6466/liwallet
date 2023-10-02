import React from "react";
import { Dialog, Typography, Box } from "@mui/material";
import QRCode from "qrcode.react";
import { useTranslation } from "react-i18next";
import { ReceiveBox } from "../hooks/styles";
const Receive = ({ onClose, userWallet }) => {
  const { t } = useTranslation();

  const closePopup = () => {
    onClose();
  };

  return (
    <Dialog open={true} onClose={closePopup}>
      <ReceiveBox>
        <Typography>{t("sendAddress")}</Typography>
        <Typography>{userWallet.address}</Typography>
        <Typography>{t("scanQR")}</Typography>
        <QRCode value={userWallet.address} />
      </ReceiveBox>
    </Dialog>
  );
};

export default Receive;
