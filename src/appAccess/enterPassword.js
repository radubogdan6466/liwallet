import React, { useState } from "react";
import { CenterBox, CenterBoxHome, TypographyTitleForm } from "../hooks/styles";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import theme from "../theme/Theme";

export default function EnterPassword({ onPasswordMatch }) {
  const [enteredPassword, setEnteredPassword] = useState("");
  const storedPassword = localStorage.getItem("userPassword");

  const handleSubmit = () => {
    if (enteredPassword === storedPassword) {
      onPasswordMatch();
      sessionStorage.setItem("isAuthenticated", "true");
      window.location.hash = "/Home"; // redirecționează către pagina de Home
    } else {
      console.error("Incorrect Password");
    }
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
        <Typography variant="h4">Enter Your Password</Typography>
        <TextField
          label="Password"
          type="text"
          value={enteredPassword}
          onChange={(e) => setEnteredPassword(e.target.value)}
        />
        <Button onClick={handleSubmit}>Login</Button>
      </CenterBoxHome>
    </Grid>
  );
}
