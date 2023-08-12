import React, { useState } from "react";
import { CenterBox, CenterBoxHome, TypographyTitleForm } from "../hooks/styles";
import {
  Box,
  Typography,
  TextField,
  Avatar,
  Button,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import theme from "../theme/Theme";
import logo from "./MIS.png";

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
      sx={{
        position: "relative",
        top: 0,
        left: 0,
        width: "337px",
        minHeight: "650px",
        height: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: "translateY(-10%)",
        color: theme.palette.text.secondary, // Acesta setează culoarea textului
        "& .MuiInputBase-input": {
          // Acesta asigură că input-ul real este și el alb
          color: theme.palette.text.secondary,
        },
      }}
    >
      <CenterBoxHome item xs={12} sm={6} md={4} lg={3}>
        <Avatar
          alt="liwallet Logo"
          src={logo}
          sx={{
            width: "100px",
            height: "50px",
          }}
        />
        <Typography variant="h4">Setează parola</Typography>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontSize: "15px",
          }}
        >
          Parola va fi folosita doar pe acest dispozitiv. Memoreaza parola
          deoarece nimeni nu o poate recupera.
        </Typography>
        <TextField
          label="Parola"
          type="password"
          color="secondary"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            marginTop: "20px",
          }}
        />
        <TextField
          label="Confirmă Parola"
          type="password"
          value={confirmPassword}
          color="secondary"
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{
            marginTop: "20px",
          }}
        />
        <Button
          sx={{
            marginTop: "20px",
            backgroundColor: theme.palette.button.normal,
            color: theme.palette.button.textNormal,
            "&:hover": {
              backgroundColor: theme.palette.button.hover,
              color: theme.palette.button.textHover,
            },
          }}
          variant="contained"
          onClick={handleSubmit}
        >
          Setează Parola
        </Button>
      </CenterBoxHome>
    </Grid>
  );
}
