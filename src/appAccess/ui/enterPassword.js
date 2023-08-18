import React from "react";
import {
  CenterBoxHome,
  GridLoginPassword,
  AvatarLoginPassword,
  LoginPassBtn,
  PassLoginFormField,
  TypographyLoginPass,
} from "../../hooks/styles";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import logo from "../MIS.png";
import { usePasswordLogic } from "../logic/passwordLogic"; // <-- import the new hook

export default function EnterPassword({ onPasswordMatch }) {
  const { enteredPassword, setEnteredPassword, handleSubmit } =
    usePasswordLogic(onPasswordMatch); // <-- use the hook
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <GridLoginPassword>
      <CenterBoxHome item xs={12} sm={6} md={4} lg={3}>
        <AvatarLoginPassword alt="liwallet Logo" src={logo} />
        <TypographyLoginPass>{t("enterPassword")}</TypographyLoginPass>
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
