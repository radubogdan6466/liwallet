import React, { useState } from "react";
import { ethers } from "ethers";
import { Button, Typography } from "@mui/material";
import {
  CenterBox,
  TypographyTitle,
  FormField,
  FormContainer,
  StyledBoxx,
  StyledFormControl,
  ActionsContainer,
} from "../hooks/styles";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom"; // Schimbați 'useHistory' cu 'useNavigate'

export default function LoginWallet({ onClose }) {
  const secretKey = process.env.REACT_APP_SECRET_KEY;
  const [privateKey, setPrivateKey] = useState("");
  const [displayPrivateKey, setDisplayPrivateKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // Folosiți 'useNavigate' în loc de 'useHistory'

  const isValidPrivateKey = (privateKey) => {
    try {
      new ethers.Wallet(privateKey);
      return true;
    } catch (error) {
      return false;
    }
  };

  const gologin = () => {
    navigate("/");
  };

  const handlePrivateKeyChange = (event) => {
    setPrivateKey(event.target.value);
    setDisplayPrivateKey("*".repeat(event.target.value.length));
    setErrorMessage("");
  };

  const Login = (event) => {
    event.preventDefault();

    if (!isValidPrivateKey(privateKey)) {
      setErrorMessage("Invalid");
      return;
    }

    try {
      const encryptedPrivateKey = CryptoJS.AES.encrypt(
        privateKey,
        secretKey
      ).toString();
      localStorage.setItem("pkey", encryptedPrivateKey);

      // Clear the input field to prevent password saving prompt
      setPrivateKey("");
      setDisplayPrivateKey("");

      gologin(); // Aici chemăm funcția 'gologin'
    } catch (error) {
      console.error("Error, try again:", error);
    }
  };

  return (
    <CenterBox
      container
      sx={{
        backgroundColor: "#d3d3d3",
      }}
    >
      <StyledBoxx
        className="loginPage"
        sx={{
          backgroundColor: "#d3d3d3",
        }}
      >
        <TypographyTitle variant="h5" gutterBottom>
          Login
        </TypographyTitle>
        <FormContainer onSubmit={Login}>
          <StyledFormControl>
            <FormField
              id="privateKey"
              value={displayPrivateKey}
              placeholder="Enter private key"
              type="text"
              onChange={handlePrivateKeyChange}
              fullWidth
              autoComplete="off"
            />
          </StyledFormControl>
          {errorMessage && (
            <Typography color="error" variant="body2" gutterBottom>
              {errorMessage}
            </Typography>
          )}
          <ActionsContainer>
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </ActionsContainer>
        </FormContainer>
      </StyledBoxx>
    </CenterBox>
  );
}
