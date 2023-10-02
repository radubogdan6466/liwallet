import React, { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle, Box } from "@mui/material";
import { TypographyTitle } from "../hooks/styles";
import { useTheme } from "@mui/material/styles";
import useWeb3 from "../hooks/useWeb3";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";

export default function Settings({ onClose }) {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const { getDecryptedData } = useWeb3();
  const { t } = useTranslation();
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
      setDialogTitle(t("sec.title"));
      setDialogContent(t("sec.warning"));
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
      <Box>
        <Box>
          <LanguageSelector />
        </Box>

        <TypographyTitle variant="h6">{t("sec.main")}</TypographyTitle>
        <Button
          variant="contained"
          onClick={() => showKey("pkey", "Secret Key")}
        >
          {t("sec.first")}
        </Button>
        <Button variant="contained" onClick={showRecoveryPhrase}>
          {t("sec.second")}
        </Button>
        <Dialog onClose={() => setOpenDialog(false)} open={openDialog}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>{dialogContent}</DialogContent>
        </Dialog>
      </Box>
    </Dialog>
  );
}
