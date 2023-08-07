import React, { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle, Box } from "@mui/material";
import { TypographyTitle } from "../hooks/styles";
import CryptoJS from "crypto-js";
import { useTheme } from "@mui/material/styles";

export default function Settings({ onClose }) {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");

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
        onClick={showPrivateKey}
        sx={{
          borderRadius: 0,
          margin: 1,

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",

          backgroundColor: theme.palette.button.normal,
          color: theme.palette.button.textNormal,
          "&:hover": {
            backgroundColor: theme.palette.button.hover, // adăugat pentru exemplificare, dar poți ajusta dacă ai alte culori preferate pentru hover
            color: theme.palette.button.textHover,
          },
        }}
      >
        Show private Key
      </Button>
      <Button
        variant="contained"
        onClick={showRecoveryPhrase}
        sx={{
          borderRadius: 0,
          margin: 1,

          backgroundColor: theme.palette.button.normal,
          color: theme.palette.button.textNormal,
          "&:hover": {
            backgroundColor: theme.palette.button.hover, // adăugat pentru exemplificare, dar poți ajusta dacă ai alte culori preferate pentru hover
            color: theme.palette.button.textHover,
          },
        }}
      >
        Secret Recovery Phrase
      </Button>
      <Dialog onClose={() => setOpenDialog(false)} open={openDialog}>
        <DialogTitle style={{ color: theme.palette.text.text }}>
          {dialogTitle}
        </DialogTitle>
        <DialogContent
          sx={{
            padding: 2,
            color: theme.palette.text.text,
            height: "120px",
            width: "256px",
          }}
        >
          {dialogContent}
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}
