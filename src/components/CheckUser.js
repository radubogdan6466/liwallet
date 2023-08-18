import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CenterBox, ActionButton, TypographyTitle } from "../hooks/styles";
import { Button, Dialog, Typography } from "@mui/material";
import LoginWallet from "./loginwallet";
import { useTheme } from "@mui/material/styles"; // Importă useTheme hook
import { useTranslation } from "react-i18next";

const CheckUser = ({ handleLogin, handleCreate }) => {
  const navigate = useNavigate();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const theme = useTheme(); // Folosește useTheme hook pentru a obține tema
  const { t } = useTranslation();
  const gocreate = () => {
    navigate("/create");
  };
  const openLoginDialog = () => {
    setLoginDialogOpen(true);
  };
  const handleClose = () => {
    setLoginDialogOpen(false);
  };

  return (
    <CenterBox
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: theme.palette.primary.home,
        position: "relative",
        top: 0,
        left: 0,
        width: "337px",
        minHeight: "650px",
        height: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TypographyTitle
        sx={{
          color: theme.palette.text.secondary,
        }}
      >
        {t("notConnected")}
      </TypographyTitle>
      <Button
        variant="contained"
        color="secondary"
        sx={{
          backgroundColor: theme.palette.button.normal,
          color: theme.palette.button.textNormal,
          "&:hover": {
            backgroundColor: theme.palette.button.hover, // adăugat pentru exemplificare, dar poți ajusta dacă ai alte culori preferate pentru hover
            color: theme.palette.button.textHover,
          },
        }}
        onClick={openLoginDialog}
      >
        <Typography>{t("pkeyLogin")}</Typography>
      </Button>
      <Dialog open={loginDialogOpen} onClose={handleClose}>
        <LoginWallet onClose={handleClose} />
      </Dialog>
      <TypographyTitle
        variant="h5"
        component="div"
        sx={{
          color: theme.palette.text.secondary,
        }}
      ></TypographyTitle>
      <Button
        variant="contained"
        onClick={gocreate}
        sx={{
          backgroundColor: theme.palette.button.normal,
          color: theme.palette.button.textNormal,

          "&:hover": {
            backgroundColor: theme.palette.button.hover, // adăugat pentru exemplificare, dar poți ajusta dacă ai alte culori preferate pentru hover
            color: theme.palette.button.textHover,
          },
        }}
      >
        <Typography>{t("createNewWallet")}</Typography>
      </Button>
    </CenterBox>
  );
};

export default CheckUser;
