import React from "react";
import "./CreateWalletUI.css";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";

import {
  Button,
  Dialog,
  DialogTitle,
  Typography,
  TextField,
  CircularProgress,
  Box,
  Grid,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { CreateWallet } from "../createwallet";
const CreateWalletUI = ({ mode }) => {
  const {
    showMnemonicPopup,
    setShowMnemonicPopup,
    mnemonic,
    verificationIndices,
    userInputWords,
    setUserInputWords,
    isBackdropOpen,
    tempMnemonic,
    create,
    closePopup,
    handleCloseDialog,
    handleInputChange,
  } = CreateWallet();
  const isPopup = mode === "popup";
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  const groupedWords = [];
  for (let i = 0; i < tempMnemonic.length; i += 4) {
    groupedWords.push(tempMnemonic.slice(i, i + 4));
  }
  return (
    <div className="createPage-container">
      <p className="create-p">{t("savePhrase")}</p>
      <p className="create-p">{t("savePhraseWarning")}</p>
      <div className="create-button-ui-p">
        <button className="create-button-ui" onClick={create}>
          {t("generate")}
        </button>
      </div>
      <div className="create-button-ui-p">
        <button className="create-button-return " onClick={goBack}>
          Back
        </button>
      </div>

      <Popup
        open={showMnemonicPopup}
        onClose={handleCloseDialog}
        aria-labelledby="mnemonic-dialog-title"
      >
        <div className="createPage-container-dialog">
          <h2 className="create-p">{t("sPhrase")}</h2>
          <div className="create-p-sl">
            {tempMnemonic.split(" ").map((word, index) => (
              <p
                key={index}
                style={{
                  fontSize: "12px",
                  display: "inline-block",
                  marginRight: "10px",
                }}
              >
                {index + 1}. {word}
              </p>
            ))}
          </div>
          <div className="form__group-create-wallet">
            {verificationIndices.map((index) => (
              <div item key={index}>
                <div>
                  <p className="word-sl">
                    {t("word")} {index + 1}
                  </p>

                  <input
                    placeholder="Name"
                    className="form__field"
                    type="password"
                    value={userInputWords[index] || ""}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="create-button-ui-p">
            <button className="create-button-ui" onClick={closePopup}>
              {t("sPhraseSaved")}
            </button>
          </div>
          <div className="create-button-ui-p">
            <button className="create-button-return " onClick={goBack}>
              Back
            </button>
          </div>
        </div>
      </Popup>
      <Backdrop open={isBackdropOpen}>
        <CircularProgress color="inherit" size={150} />
      </Backdrop>
    </div>
  );
};
export default CreateWalletUI;
