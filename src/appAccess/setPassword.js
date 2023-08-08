import React, { useState } from "react";
import { CenterBox, CenterBoxHome, TypographyTitleForm } from "../hooks/styles";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import theme from "../theme/Theme";

export default function SetPassword({ onPasswordSet }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Adaugat

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      console.error("Parolele nu coincid.");
      return;
    }

    if (password.length < 5) {
      console.error("Parola trebuie să aibă cel puțin 5 caractere.");
      return;
    }

    localStorage.setItem("userPassword", password);
    onPasswordSet();
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      height="100Vh"
      sx={{
        backgroundColor: theme.palette.primary.home,
      }}
    >
      <CenterBoxHome item xs={12} sm={6} md={4} lg={3}>
        <Typography variant="h4">Setează parola</Typography>
        <TypographyTitleForm>
          Această parolă va fi folosită pentru a-ți debloca aplicația doar pe
          acest dispozitiv. Memorează parola deoarece aplicația nu o poate
          recupera.
        </TypographyTitleForm>
        <TextField
          label="Parola"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirmă Parola"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button onClick={handleSubmit}>Setează Parola</Button>
      </CenterBoxHome>
    </Grid>
  );
}
