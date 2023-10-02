import React, { useState } from "react";
import { ethers } from "ethers";
import { Button, Typography, Box, Grid } from "@mui/material";
import {
  TypographyTitle,
  FormField,
  FormContainer,
  StyledFormControl,
  LoginFormField,
} from "../hooks/styles";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

export default function LoginWallet({ onClose }) {
  const secretKey = process.env.REACT_APP_SECRET_KEY;
  const [privateKey, setPrivateKey] = useState("");
  const [displayPrivateKey, setDisplayPrivateKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const theme = useTheme();

  const navigate = useNavigate();

  const isValidPrivateKey = (privateKey) => {
    try {
      new ethers.Wallet(privateKey);
      return true;
    } catch (error) {
      return false;
    }
  };

  const gologin = () => {
    navigate("/Home");
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

      setPrivateKey("");
      setDisplayPrivateKey("");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      gologin();
    } catch (error) {
      console.error("Error, try again:", error);
    }
  };

  return (
    <Grid
      position="relative"
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <TypographyTitle variant="h5" gutterBottom>
        Login
      </TypographyTitle>
      <FormContainer onSubmit={Login}>
        <StyledFormControl>
          <LoginFormField
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
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Button type="submit" variant="contained">
            Login
          </Button>
        </Grid>
      </FormContainer>
    </Grid>
  );
}
