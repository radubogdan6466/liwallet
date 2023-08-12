import React, { useState } from "react";
import {
  CenterBoxHome,
  GridLoginPassword,
  AvatarLoginPassword,
  LoginPassBtn,
  PassLoginFormField,
  TypographyLoginPass,
} from "../hooks/styles";

import { useTheme } from "@mui/material/styles";
import logo from "./MIS.png";

export default function EnterPassword({ onPasswordMatch }) {
  const [enteredPassword, setEnteredPassword] = useState("");
  const storedPassword = localStorage.getItem("userPassword");
  const theme = useTheme();

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
    <GridLoginPassword>
      <CenterBoxHome item xs={12} sm={6} md={4} lg={3}>
        <AvatarLoginPassword alt="liwallet Logo" src={logo} />
        <TypographyLoginPass>Introduceti parola</TypographyLoginPass>
        <PassLoginFormField
          placeholder="Parola"
          type="password"
          value={enteredPassword}
          onChange={(e) => setEnteredPassword(e.target.value)}
        />
        <LoginPassBtn variant="contained" onClick={handleSubmit}>
          Login
        </LoginPassBtn>
      </CenterBoxHome>
    </GridLoginPassword>
  );
}
