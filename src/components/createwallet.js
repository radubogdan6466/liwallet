import React, { useState, useRef } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTranslation } from "react-i18next";

import {
  CenterBox,
  StyledBoxx,
  ActionsContainer,
  TypographyTitle,
  StyledLoginDialogBox,
  CenterBoxHome,
} from "../hooks/styles";
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

import CryptoJS from "crypto-js";
import { useTheme } from "@mui/material/styles";

export default function CreateWallet({ mode }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isPopup = mode === "popup";
  const { t } = useTranslation();
  const [showMnemonicPopup, setShowMnemonicPopup] = useState(false);
  const [mnemonic, setMnemonic] = useState("");
  const [verificationIndices, setVerificationIndices] = useState([]);
  const [userInputWords, setUserInputWords] = useState({});
  const mnemonicKeysRef = useRef([]);
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);
  const [tempMnemonic, setTempMnemonic] = useState(""); // Stare temporară pentru mnemonic
  const [userWalletKeys, setUserWalletKeys] = useState(null);

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
    const words = tempMnemonic.split(" ");
    for (let i of verificationIndices) {
      if (words[i] !== userInputWords[i]) {
        return false;
      }
    }
    return true;
  };
  const clearOldMnemonicData = () => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("data_")) {
        localStorage.removeItem(key);
        i--; // Ajustează indexul pentru a ține cont de elementul șters
      }
    }
  };
  const clearData = () => {
    localStorage.removeItem("pkey");
    mnemonicKeysRef.current.forEach((key) => {
      localStorage.removeItem(key);
    });
  };
  const saveToLocalStorage = (privateKey, mnemonicPhrase) => {
    // 1. Elimină cheia privată existentă
    localStorage.removeItem("pkey");
    clearOldMnemonicData();

    // 2. Șterge toate datele mnemonice vechi din localStorage
    mnemonicKeysRef.current.forEach((key) => {
      localStorage.removeItem(key);
    });

    // 3. Resetare mnemonicKeysRef
    mnemonicKeysRef.current = [];

    // 4. Verifică dacă ai o cheie secretă setată
    const secretKey = process.env.REACT_APP_SECRET_KEY;
    if (!secretKey) {
      console.error("Secret key is not defined!");
      return;
    }

    // 5. Criptează și stochează cheia privată
    const encryptedPrivateKey = CryptoJS.AES.encrypt(
      privateKey,
      secretKey
    ).toString();
    localStorage.setItem("pkey", encryptedPrivateKey);

    // 6. Separă fraza mnemonică în cuvinte
    const mnemonicWords = mnemonicPhrase.split(" ");

    // 7. Definește cheile cu care vor fi criptate cuvintele mnemonice
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

    // 8. Criptează fiecare cuvânt mnemonic și stochează-l în localStorage
    mnemonicWords.forEach((word, index) => {
      const encryptedWord = CryptoJS.AES.encrypt(word, keys[index]).toString();
      const randomKey = `data_${Math.random()
        .toString(36)
        .substr(2, 5)}_${index}`;
      localStorage.setItem(randomKey, encryptedWord);

      // Actualizează referința pentru cheile mnemonice
      mnemonicKeysRef.current.push(randomKey);
    });
  };

  const create = ({ mode }) => {
    const isPopup = mode === "popup";

    const keys = ethers.Wallet.createRandom();
    if (keys && keys.mnemonic && keys.mnemonic.phrase) {
      setTempMnemonic(keys.mnemonic.phrase);
      selectVerificationWords(keys.mnemonic.phrase);
      setUserWalletKeys(keys);
      setShowMnemonicPopup(true);
    } else {
      console.error("Failed to generate wallet keys.");
    }
  };

  const closePopup = () => {
    if (verifyWords()) {
      saveToLocalStorage(userWalletKeys.privateKey, tempMnemonic);
      setMnemonic(tempMnemonic);
      setIsBackdropOpen(true);
      setShowMnemonicPopup(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      navigate("/Home");
    } else {
      alert("Cuvintele introduse nu sunt corecte. Te rog să încerci din nou.");
      //clearData();
    }
  };

  const handleCloseDialog = () => {
    setTempMnemonic("");
    setShowMnemonicPopup(false);
  };

  return (
    <Box
      item
      container
      sx={{
        backgroundColor: theme.palette.primary.second,
        width: isSmallScreen ? "300px" : "198.5px",
        height: isSmallScreen ? "100Vh" : "600px",
        position: "relative",
        top: 0,
        left: 0,
        width: isPopup ? "270px" : "50Vh",
        minHeight: isPopup ? "313px" : "100Vh",
        height: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        className="createPage"
        sx={{ backgroundColor: theme.palette.primary.second }}
      >
        <Typography
          sx={{
            fontSize: 16,
            textAlign: "center",

            color: theme.palette.text.secondary,
          }}
        >
          {t("savePhrase")}
        </Typography>
        <Typography
          sx={{
            fontSize: 10,
            textAlign: "center",
            padding: "20px",
            color: theme.palette.text.red,
          }}
        >
          {t("savePhraseWarning")}
        </Typography>
        <ActionsContainer>
          <Button
            variant="contained"
            onClick={create}
            sx={{
              marginTop: "20px",
              marginBottom: "20px",
              backgroundColor: theme.palette.button.normal,
              color: theme.palette.button.textNormal,
              "&:hover": {
                backgroundColor: theme.palette.button.hover,
                color: theme.palette.button.textHover,
              },
            }}
          >
            {t("generate")}
          </Button>
        </ActionsContainer>

        <Dialog
          open={showMnemonicPopup}
          onClose={handleCloseDialog}
          aria-labelledby="mnemonic-dialog-title"
        >
          <StyledLoginDialogBox
            sx={{
              backgroundColor: theme.palette.primary.second,
            }}
          >
            <DialogTitle
              id="mnemonic-dialog-title"
              sx={{
                backgroundColor: theme.palette.primary.second,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: theme.palette.text.secondary,
              }}
            >
              {t("sPhrase")}
            </DialogTitle>
            <Typography
              sx={{ fontSize: "15px", color: theme.palette.text.secondary }}
            >
              {tempMnemonic}
            </Typography>
            <Grid
              container
              direction="row"
              sx={{
                marginTop: "10px",
                justifyContent: "space-between",
              }}
            >
              {verificationIndices.map((index) => (
                <Grid
                  item
                  key={index}
                  sx={{ fontSize: "15px", color: theme.palette.text.secondary }}
                >
                  <Box
                    sx={{
                      color: theme.palette.text.secondary,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography fontSize="12px">
                      {t("word")} {index + 1}
                    </Typography>
                    <TextField
                      type="password"
                      value={userInputWords[index] || ""}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      sx={{
                        width: "70px",
                        height: "30px",
                        //marginLeft: "10px",
                        color: theme.palette.text.secondary, // Acesta setează culoarea textului
                        "& .MuiInputBase-input": {
                          // Acesta asigură că input-ul real este și el alb
                          color: theme.palette.text.secondary,
                        },
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Button
              variant="contained"
              onClick={closePopup}
              sx={{
                marginTop: "40px",
                backgroundColor: theme.palette.button.normal,
                color: theme.palette.button.textNormal,
                "&:hover": {
                  backgroundColor: theme.palette.button.hover,
                  color: theme.palette.button.textHover,
                },
              }}
            >
              {t("sPhraseSaved")}
            </Button>
          </StyledLoginDialogBox>
        </Dialog>
        <Backdrop
          sx={{
            color: theme.palette.primary.icon,
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={isBackdropOpen}
        >
          <CircularProgress color="inherit" size={150} />
        </Backdrop>
      </Box>
    </Box>
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
