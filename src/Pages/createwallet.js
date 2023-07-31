import React, { useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import {
  CenterBox,
  StyledBoxx,
  ActionsContainer,
  TypographyTitle,
} from "./styles";
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
        backgroundColor: theme.palette.primary.main, // Folosește culoarea principală din tema
      }}
    >
      <StyledBoxx
        className="createPage"
        sx={{
          backgroundColor: theme.palette.primary.main, // Folosește culoarea principală din tema
        }}
      >
        <TypographyTitle>
          Salvează fraza pe un dispozitiv offline sau scrie-o pe hârtie. Odată
          ce ai creat portofelul, nu vei mai avea acces la ea.
        </TypographyTitle>
        <ActionsContainer>
          <Button variant="contained" color="primary" onClick={create}>
            Crează wallet
          </Button>
          {/* Other buttons here */}
        </ActionsContainer>

        {/* Mnemonic popup */}
        <Dialog
          open={showMnemonicPopup}
          onClose={closePopup}
          aria-labelledby="mnemonic-dialog-title"
        >
          <DialogTitle id="mnemonic-dialog-title">
            Fraza ta Mnemonica
          </DialogTitle>
          <DialogContent>
            <Typography>{mnemonic}</Typography>
            <Button variant="contained" color="secondary" onClick={closePopup}>
              Am salvat fraza secreta
            </Button>
          </DialogContent>
        </Dialog>
      </StyledBoxx>
    </CenterBox>
  );
}
