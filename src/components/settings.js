import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useWeb3 from "../hooks/useWeb3";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import "./settings.css";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from "@ionic/react";

export default function Settings({ onClose }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const { getDecryptedData } = useWeb3();
  const { t } = useTranslation();
  const [showCustomRPC, setShowCustomRPC] = useState(false);

  const handleCustomRpcClick = () => {
    setShowCustomRPC(true);
    navigate("/AddNetwork");
  };
  const keys = Array.from(
    { length: 12 },
    (_, i) => process.env[`REACT_APP_KEY${String.fromCharCode(65 + i)}`]
  );
  const goBack = () => {
    navigate(-1);
  };
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

  return (
    <div className="settings-container">
      <div>
        <LanguageSelector />
      </div>
      <h6>{t("sec.main")}</h6>
      <div className="settings-button-ui-p">
        <button
          className="settings-button-ui"
          onClick={() => showKey("pkey", "Secret Key")}
        >
          {t("sec.first")}
        </button>
      </div>
      <div className="settings-button-ui-p">
        <button className="settings-button-ui" onClick={showRecoveryPhrase}>
          {t("sec.second")}
        </button>
      </div>
      <div className="settings-button-ui-p">
        <button className="settings-button-ui" onClick={handleCustomRpcClick}>
          {t("sec.cstNet")}
        </button>
      </div>
      {openDialog && (
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{dialogTitle}</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>{dialogContent}</IonCardContent>
          <div className="settings-button-ui-p">
            <button
              className="settings-button-ui"
              onClick={() => setOpenDialog(false)}
            >
              Close
            </button>
          </div>
        </IonCard>
      )}
      <div className="settings-button-ui-p">
        <button className="settings-button-return" onClick={goBack}>
          Return
        </button>
      </div>
    </div>
  );
}
