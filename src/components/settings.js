import React, { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { TypographyTitle } from "../hooks/styles";
import { useTheme } from "@mui/material/styles";
import useWeb3 from "../hooks/useWeb3";

export default function Settings({ onClose }) {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const { getDecryptedData } = useWeb3();

  const keys = Array.from(
    { length: 12 },
    (_, i) => process.env[`REACT_APP_KEY${String.fromCharCode(65 + i)}`]
  );

  const showRecoveryPhrase = () => {
    let mnemonicWords = [];

    for (let i = 0; i < 12; i++) {
      const encryptedWordKey = Object.keys(localStorage).find((key) =>
        key.endsWith(`_${i}`)
      );
      const encryptedWord = localStorage.getItem(encryptedWordKey);
      const decryptedWord = getDecryptedData(encryptedWord, keys[i]);
      mnemonicWords.push(decryptedWord);
    }

    const mnemonic = mnemonicWords.join(" ");
    setDialogTitle("Recovery Phrase");
    setOpenDialog(true);
    setDialogContent(mnemonic);
  };

  const showKey = (key, title) => {
    setDialogTitle(title);

    const encryptedData = localStorage.getItem(key);
    if (encryptedData) {
      try {
        const decryptedData = getDecryptedData(encryptedData);
        setOpenDialog(true);
        setDialogContent(decryptedData);
      } catch (error) {
        console.error(`Error decrypting ${title.toLowerCase()}:`, error);
      }
    } else {
      console.error(`Encrypted ${title.toLowerCase()} is missing.`);
    }
  };
  const closePopup = () => {
    onClose();
  };
  return (
    <Dialog open={true} onClose={closePopup}>
      <TypographyTitle variant="h6">Security</TypographyTitle>
      <Button
        variant="contained"
        onClick={() => showKey("pkey", "Secret Key")}
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
