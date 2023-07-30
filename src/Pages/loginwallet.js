import React, { useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Dialog } from "@mui/material";
import {
  CenterBox,
  TypographyTitle,
  FormField,
  ActionsContainer,
} from "./styles";
import { StyledDialogContent, FormContainer } from "./styles";

export default function LoginWallet({ onClose }) {
  const [privateKey, setPrivateKey] = useState("");
  const navigate = useNavigate();

  const closePopup = () => {
    onClose();
  };
  const Login = (event) => {
    event.preventDefault();
    try {
      const userWallet = new ethers.Wallet(privateKey);
      localStorage.setItem("pkey", userWallet.privateKey);
      navigate("/");
    } catch (error) {
      console.error("Error, try again:", error);
    }
  };

  const handlePrivateKeyChange = (event) => {
    setPrivateKey(event.target.value);
  };

  return (
    <Dialog open={true} onClose={closePopup}>
      <TypographyTitle variant="h4" gutterBottom>
        Login
      </TypographyTitle>
      <FormContainer
        onSubmit={Login}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "400px",
        }}
      >
        <FormField
          id="privateKey"
          value={privateKey}
          placeholder="Enter private key"
          type="password"
          onChange={handlePrivateKeyChange}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </FormContainer>
    </Dialog>
  );
}
