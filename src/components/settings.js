import React, { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle, Box } from "@mui/material";
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

      // Verificăm dacă encryptedWord este valid și nu este nul
      if (encryptedWord) {
        const decryptedWord = getDecryptedData(encryptedWord, keys[i]);
        mnemonicWords.push(decryptedWord);
      } else {
        mnemonicWords.push(null); // adăugăm o valoare nulă sau poate un string gol
      }
    }

    if (mnemonicWords.some((word) => !word)) {
      setDialogTitle("Atenție");
      setDialogContent("Ai accesat aplicația cu Pkey fara fraza mnemonica...");
    } else {
      const mnemonic = mnemonicWords.join(" ");
      setDialogTitle("Secret words");
      setDialogContent(mnemonic);
    }

    setOpenDialog(true);
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
      <Box
        sx={{
          backgroundColor: theme.palette.background.light,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TypographyTitle
          variant="h6"
          sx={{
            backgroundColor: theme.palette.background.light,
          }}
        >
          Security
        </TypographyTitle>
        <Button
          variant="contained"
          onClick={() => showKey("pkey", "Secret Key")}
          sx={{
            borderRadius: 0,
            margin: 1,
            width: "230px",
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
          Afiseaza private key
        </Button>
        <Button
          variant="contained"
          onClick={showRecoveryPhrase}
          sx={{
            borderRadius: 0,
            margin: 1,
            width: "230px",
            backgroundColor: theme.palette.button.normal,
            color: theme.palette.button.textNormal,
            "&:hover": {
              backgroundColor: theme.palette.button.hover, // adăugat pentru exemplificare, dar poți ajusta dacă ai alte culori preferate pentru hover
              color: theme.palette.button.textHover,
            },
          }}
        >
          Afiseaza Secret words
        </Button>
        <Dialog onClose={() => setOpenDialog(false)} open={openDialog}>
          <DialogTitle
            style={{
              color: theme.palette.text.text,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "30px",
            }}
          >
            {dialogTitle}
          </DialogTitle>
          <DialogContent
            sx={{
              padding: "20px",
              color: theme.palette.text.text,
              height: "130px",
              width: "270px",
              overflowWrap: "break-word", // asigură-te că textul lung se rupe
              maxWidth: "90%", // alegi procentajul dorit pentru lățimea maximă a textului
            }}
          >
            {dialogContent}
          </DialogContent>
        </Dialog>
      </Box>
    </Dialog>
  );
}
