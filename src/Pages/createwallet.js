import React, { useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import {
  CenterBox,
  TypographyTitle,
  StyledBoxx,
  StyledFormControl,
  ActionsContainer,
} from "./styles";
import {
  Button,
  Input,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export default function CreateWallet() {
  const [showMnemonicPopup, setShowMnemonicPopup] = useState(false);
  const [mnemonic, setMnemonic] = useState("");
  let navigate = useNavigate();

  const create = () => {
    const userWalletKeys = ethers.Wallet.createRandom();
    const mnemonic = userWalletKeys.mnemonic;

    localStorage.setItem("pkey", userWalletKeys.privateKey);
    localStorage.setItem("mnem", mnemonic.phrase);

    setMnemonic(mnemonic.phrase);
    setShowMnemonicPopup(true); // Show the popup when wallet is created
  };

  const closePopup = () => {
    setShowMnemonicPopup(false); // Close the popup
    navigate("/");
  };

  return (
    <CenterBox container>
      <StyledBoxx className="createPage">
        <Typography>
          Save the phrase on an offline device or write it on paper. Once you
          create the wallet, you will never have access to it.
        </Typography>
        <ActionsContainer>
          <Button variant="contained" color="primary" onClick={create}>
            Create Wallet
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
