// SetPassword.js
import React from "react";
import {
  CenterBoxHome,
  GridLoginPassword,
  AvatarLoginPassword,
  TypographyLoginPass,
  TypographySetupPass,
  PassSetupFormField,
  SetupPassBtn,
} from "../../hooks/styles";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import logo from "../MIS.png";
import { Logicp } from "../logic/logicp";

export default function SetPassword({ onPasswordSet }) {
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSubmit,
  } = Logicp(onPasswordSet);
  const { t } = useTranslation();
  const theme = useTheme();
  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSubmit();
  };
  return (
    <GridLoginPassword>
      <CenterBoxHome item xs={12} sm={6} md={4} lg={3}>
        <AvatarLoginPassword alt="liwallet Logo" src={logo} />
        <TypographyLoginPass>{t("setPassword")}</TypographyLoginPass>
        <TypographySetupPass>{t("setPasswordInfo1")}</TypographySetupPass>
        <TypographySetupPass>{t("setPasswordInfo2")}</TypographySetupPass>
        <Box
          component="form"
          onSubmit={handleFormSubmit}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <PassSetupFormField
            placeholder="Password"
            type="password"
            value={password}
            size="small"
            onChange={(e) => setPassword(e.target.value)}
          />
          <PassSetupFormField
            placeholder="Confirm Password"
            type="password"
            size="small"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <SetupPassBtn
            type="submit"
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
          >
            {t("confirmSetPassword")}
          </SetupPassBtn>
        </Box>
      </CenterBoxHome>
    </GridLoginPassword>
  );
}
