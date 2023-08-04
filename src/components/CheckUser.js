import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CenterBox, ActionButton, TypographyTitle } from "../hooks/styles";
import { Button, Dialog } from "@mui/material";
import LoginWallet from "./loginwallet";

const CheckUser = ({ handleLogin, handleCreate }) => {
  const navigate = useNavigate();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

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
    >
      <TypographyTitle variant="h4" component="div">
        Looks like you're not connected with any address
      </TypographyTitle>
      <ActionButton
        variant="contained"
        color="primary"
        onClick={openLoginDialog}
      >
        Press here to login
      </ActionButton>
      <Dialog open={loginDialogOpen} onClose={handleClose}>
        <LoginWallet onClose={handleClose} />
      </Dialog>
      <TypographyTitle variant="h5" component="div">
        Or
      </TypographyTitle>
      <ActionButton variant="contained" color="primary" onClick={gocreate}>
        Create a new wallet
      </ActionButton>
    </CenterBox>
  );
};

export default CheckUser;
