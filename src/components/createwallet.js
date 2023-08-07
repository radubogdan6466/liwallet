import React, { useState } from "react";
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
    const mnemonic = userWalletKeys.mnemonic;

    // Encrypt and save pkey
    const secretKey = process.env.REACT_APP_SECRET_KEY; // Set your secret key here
    const encryptedPrivateKey = CryptoJS.AES.encrypt(
      userWalletKeys.privateKey,
      secretKey
    ).toString();
    localStorage.setItem("pkey", encryptedPrivateKey);

    localStorage.setItem("mnem", mnemonic.phrase);

    setMnemonic(mnemonic.phrase);
    setShowMnemonicPopup(true); // Show the popup when wallet is created
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
          {/* Other buttons here */}
        </ActionsContainer>

        {/* Mnemonic popup */}
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
            <TypographyTitle sx={{ width: "70px" }}>{mnemonic}</TypographyTitle>
            <Button
              variant="contained"
              onClick={closePopup}
              sx={{
                backgroundColor: theme.palette.button.normal,
                color: theme.palette.button.textNormal,
                "&:hover": {
                  backgroundColor: theme.palette.button.hover, // adăugat pentru exemplificare, dar poți ajusta dacă ai alte culori preferate pentru hover
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
