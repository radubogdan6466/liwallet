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
    const keys = [
      process.env.REACT_APP_KEYA,
      process.env.REACT_APP_KEYB,
      process.env.REACT_APP_KEYC,
      process.env.REACT_APP_KEYD,
      process.env.REACT_APP_KEYE,
      process.env.REACT_APP_KEYF,
      process.env.REACT_APP_KEYG,
      process.env.REACT_APP_KEYH,
      process.env.REACT_APP_KEYI,
      process.env.REACT_APP_KEYJ,
      process.env.REACT_APP_KEYK,
      process.env.REACT_APP_KEYL,
    ];

    let mnemonicWords = [];

    for (let i = 0; i < 12; i++) {
      const encryptedWordKey = Object.keys(localStorage).find((key) =>
        key.endsWith(`_${i}`)
      );
      const encryptedWord = localStorage.getItem(encryptedWordKey);
      const decryptedWord = CryptoJS.AES.decrypt(
        encryptedWord,
        keys[i]
      ).toString(CryptoJS.enc.Utf8);
      mnemonicWords.push(decryptedWord);
    }

    const mnemonic = mnemonicWords.join(" ");
    setDialogTitle("Recovery Phrase");
    setOpenDialog(true);
    setDialogContent(mnemonic);
  };
  //census pluck zebra maple shift verify east nature assume puzzle survey donor
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
