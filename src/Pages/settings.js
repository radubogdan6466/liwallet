import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { CenterBox, TypographyTitle } from "./styles";
import CryptoJS from "crypto-js";
import { useTheme } from "@mui/material/styles";

export default function Settings({ onClose }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closePopup = () => {
    onClose();
  };

  const showPrivateKey = () => {
    showKey("pkey", "Secret Key");
  };

  const showRecoveryPhrase = () => {
    const mnemonic = localStorage.getItem("mnem");
    if (mnemonic) {
      setDialogTitle("Recovery Phrase");
      setOpenDialog(true);
      setDialogContent(mnemonic);
    }
  };

  const decryptData = (encryptedData) => {
    const secretKey = process.env.REACT_APP_SECRET_KEY;
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const showKey = (key, title) => {
    setDialogTitle(title);

    const encryptedData = localStorage.getItem(key);
    if (encryptedData) {
      try {
        const decryptedData = decryptData(encryptedData);
        setOpenDialog(true);
        setDialogContent(decryptedData);
      } catch (error) {
        console.error(`Error decrypting ${title.toLowerCase()}:`, error);
      }
    } else {
      console.error(`Encrypted ${title.toLowerCase()} is missing.`);
    }
  };

  return (
    <Dialog open={true} onClose={closePopup}>
      <TypographyTitle variant="h6">Security</TypographyTitle>
      <Button
        variant="contained"
        style={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.text.secondary,
        }}
        onClick={showPrivateKey}
      >
        Show Secret Key
      </Button>
      <Button
        variant="contained"
        style={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.text.secondary,
        }}
        onClick={showRecoveryPhrase}
      >
        Show Recovery Phrase
      </Button>
      <Dialog onClose={() => setOpenDialog(false)} open={openDialog}>
        <DialogTitle style={{ color: theme.palette.text.main }}>
          {dialogTitle}
        </DialogTitle>
        <DialogContent style={{ color: theme.palette.text.main }}>
          {dialogContent}
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}
