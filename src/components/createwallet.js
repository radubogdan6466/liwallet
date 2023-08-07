import React, { useState, useRef } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import {
  CenterBox,
  StyledBoxx,
  ActionsContainer,
  TypographyTitle,
  StyledLoginDialogBox,
} from "../hooks/styles";
import {
  Button,
  Dialog,
  DialogTitle,
  Typography,
  TextField,
} from "@mui/material";
import CryptoJS from "crypto-js";
import { useTheme } from "@mui/material/styles";

export default function CreateWallet() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [showMnemonicPopup, setShowMnemonicPopup] = useState(false);
  const [mnemonic, setMnemonic] = useState("");
  const [verificationIndices, setVerificationIndices] = useState([]);
  const [userInputWords, setUserInputWords] = useState({});
  const mnemonicKeysRef = useRef([]);
  const selectVerificationWords = (mnemonicPhrase) => {
    const words = mnemonicPhrase.split(" ");
    const indices = [];
    while (indices.length < 3) {
      const rndIndex = Math.floor(Math.random() * words.length);
      if (indices.indexOf(rndIndex) === -1) indices.push(rndIndex);
    }
    setVerificationIndices(indices);
  };

  const handleInputChange = (index, value) => {
    setUserInputWords((prevState) => ({
      ...prevState,
      [index]: value,
    }));
  };

  const verifyWords = () => {
    const words = mnemonic.split(" ");
    for (let i of verificationIndices) {
      if (words[i] !== userInputWords[i]) {
        return false;
      }
    }
    return true;
  };

  const clearData = () => {
    localStorage.removeItem("pkey");

    mnemonicKeysRef.current.forEach((key) => {
      localStorage.removeItem(key);
    });
  };

  const closePopup = () => {
    if (verifyWords()) {
      setShowMnemonicPopup(false);
      navigate("/");
    } else {
      alert("Cuvintele introduse nu sunt corecte. Te rog să încerci din nou.");
      clearData();
      setTimeout(() => {
        window.location.reload();
      }, 5000); // Reload după 5 secunde
    }
  };

  const handleCloseDialog = () => {
    clearData();
    setShowMnemonicPopup(false);
  };

  const create = () => {
    const userWalletKeys = ethers.Wallet.createRandom();
    const secretKey = process.env.REACT_APP_SECRET_KEY;

    if (!secretKey) {
      console.error("Secret key is not defined!");
      return;
    }

    const encryptedPrivateKey = CryptoJS.AES.encrypt(
      userWalletKeys.privateKey,
      secretKey
    ).toString();
    localStorage.setItem("pkey", encryptedPrivateKey);

    const mnemonicWords = userWalletKeys.mnemonic.phrase.split(" ");
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

    if (keys.some((key) => !key)) {
      console.error("One or more keys are not defined!");
      return;
    }

    mnemonicWords.forEach((word, index) => {
      const encryptedWord = CryptoJS.AES.encrypt(word, keys[index]).toString();
      const randomKey = `data_${Math.random()
        .toString(36)
        .substr(2, 5)}_${index}`;

      localStorage.setItem(randomKey, encryptedWord);
      mnemonicKeysRef.current.push(randomKey);
    });

    setMnemonic(userWalletKeys.mnemonic.phrase);
    selectVerificationWords(userWalletKeys.mnemonic.phrase);
    setShowMnemonicPopup(true);
  };

  return (
    <CenterBox
      container
      sx={{ backgroundColor: theme.palette.background.light }}
    >
      <StyledBoxx
        className="createPage"
        sx={{ backgroundColor: theme.palette.background.light }}
      >
        <TypographyTitle>
          Salveaza fraza pe o hartie. Odata ce ai creat portofelul, nu vei mai
          avea acces la ea.
        </TypographyTitle>
        <ActionsContainer>
          <Button
            variant="contained"
            onClick={create}
            sx={{
              backgroundColor: theme.palette.button.normal,
              color: theme.palette.button.textNormal,
              "&:hover": {
                backgroundColor: theme.palette.button.hover,
                color: theme.palette.button.textHover,
              },
            }}
          >
            Create wallet
          </Button>
        </ActionsContainer>

        <Dialog
          open={showMnemonicPopup}
          onClose={handleCloseDialog}
          aria-labelledby="mnemonic-dialog-title"
        >
          <DialogTitle
            id="mnemonic-dialog-title"
            sx={{
              backgroundColor: theme.palette.background.light,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Secret Phrase
          </DialogTitle>
          <StyledLoginDialogBox
            sx={{
              backgroundColor: theme.palette.background.light,
              fontSize: "10px",
            }}
          >
            <Typography sx={{ width: "50px", fontSize: "15px" }}>
              {mnemonic}
            </Typography>

            {verificationIndices.map((index) => (
              <div key={index}>
                <Typography>Cuvântul {index + 1}</Typography>
                <TextField
                  size="small"
                  value={userInputWords[index] || ""}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              </div>
            ))}

            <Button
              variant="contained"
              onClick={closePopup}
              sx={{
                backgroundColor: theme.palette.button.normal,
                color: theme.palette.button.textNormal,
                "&:hover": {
                  backgroundColor: theme.palette.button.hover,
                  color: theme.palette.button.textHover,
                },
              }}
            >
              Am salvat fraza secreta
            </Button>
          </StyledLoginDialogBox>
        </Dialog>
      </StyledBoxx>
    </CenterBox>
  );
}

/**
 * import React, { useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import {
  CenterBox,
  StyledBoxx,
  ActionsContainer,
  TypographyTitle,
  StyledLoginDialogBox,
} from "../hooks/styles";
import {
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CryptoJS from "crypto-js";
import { useTheme } from "@mui/material/styles"; // Importă useTheme hook

export default function CreateWallet() {
  const theme = useTheme(); // Folosește useTheme hook pentru a obține tema
  const [showMnemonicPopup, setShowMnemonicPopup] = useState(false);
  const [mnemonic, setMnemonic] = useState("");
  let navigate = useNavigate();

  const create = () => {
    const userWalletKeys = ethers.Wallet.createRandom();

    // Encrypt and save pkey
    const secretKey = process.env.REACT_APP_SECRET_KEY; // Set your secret key here
    const encryptedPrivateKey = CryptoJS.AES.encrypt(
      userWalletKeys.privateKey,
      secretKey
    ).toString();

    const encryptedMnemonic = CryptoJS.AES.encrypt(
      userWalletKeys.mnemonic.phrase,
      secretKey
    ).toString();
    localStorage.setItem("pkey", encryptedPrivateKey);

    localStorage.setItem("encryptedMnemonic", encryptedMnemonic);

    setMnemonic(userWalletKeys.mnemonic.phrase);
    setShowMnemonicPopup(true);
  };

  const closePopup = () => {
    setShowMnemonicPopup(false); // Close the popup
    navigate("/");
  };

  return (
    <CenterBox
      container
      sx={{
        backgroundColor: theme.palette.background.light, // Folosește culoarea principală din tema
      }}
    >
      <StyledBoxx
        className="createPage"
        sx={{
          backgroundColor: theme.palette.background.light,
        }}
      >
        <TypographyTitle>
          Salveaza fraza pe o hartie. Odata ce ai creat portofelul, nu vei mai
          avea acces la ea.
        </TypographyTitle>
        <ActionsContainer>
          <Button
            variant="contained"
            onClick={create}
            sx={{
              backgroundColor: theme.palette.button.normal,
              color: theme.palette.button.textNormal,
              "&:hover": {
                backgroundColor: theme.palette.button.hover, // adăugat pentru exemplificare, dar poți ajusta dacă ai alte culori preferate pentru hover
                color: theme.palette.button.textHover,
              },
            }}
          >
            Create wallet
          </Button>
          </ActionsContainer>

          <Dialog
            open={showMnemonicPopup}
            onClose={closePopup}
            aria-labelledby="mnemonic-dialog-title"
          >
            <DialogTitle
              id="mnemonic-dialog-title"
              sx={{
                backgroundColor: theme.palette.background.light,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Secret Phrase
            </DialogTitle>
            <StyledLoginDialogBox
              sx={{
                backgroundColor: theme.palette.background.light,
              }}
            >
              <TypographyTitle sx={{ width: "60px", fontSize: "small" }}>
                {mnemonic}
              </TypographyTitle>
              <Button
                variant="contained"
                onClick={closePopup}
                sx={{
                  backgroundColor: theme.palette.button.normal,
                  color: theme.palette.button.textNormal,
                  "&:hover": {
                    backgroundColor: theme.palette.button.hover, 
                    color: theme.palette.button.textHover,
                  },
                }}
              >
                Am salvat fraza secreta
              </Button>
            </StyledLoginDialogBox>
          </Dialog>
        </StyledBoxx>
      </CenterBox>
    );
  }
  
 * 
 * 
 */
