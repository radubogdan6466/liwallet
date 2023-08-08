import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CenterBox, ActionButton, TypographyTitle } from "../hooks/styles";
import { Button, Dialog, Typography } from "@mui/material";
import LoginWallet from "./loginwallet";
import { useTheme } from "@mui/material/styles";

const CheckUser = ({ handleLogin, handleCreate }) => {
  const navigate = useNavigate();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const theme = useTheme();

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
        backgroundColor: theme.palette.background.light,
      }}
    >
      <TypographyTitle color={theme.palette.text.text}>
        Looks like you're not connected with any address
      </TypographyTitle>
      <Button
        variant="contained"
        color="secondary"
        sx={{
          backgroundColor: theme.palette.button.normal,
          color: theme.palette.button.textNormal,
          "&:hover": {
            backgroundColor: theme.palette.button.hover,
            color: theme.palette.button.textHover,
          },
        }}
        onClick={openLoginDialog}
      >
        <Typography>Press here to login</Typography>
      </Button>
      <Dialog open={loginDialogOpen} onClose={handleClose}>
        <LoginWallet onClose={handleClose} />
      </Dialog>
      <TypographyTitle
        variant="h5"
        component="div"
        color={theme.palette.text.text}
      >
        Or
      </TypographyTitle>
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
        <Typography>Create a new wallet</Typography>
      </Button>
    </CenterBox>
  );
};

export default CheckUser;
