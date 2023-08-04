import React from "react";
import { useNavigate } from "react-router-dom";
import { CenterBox, ActionButton, TypographyTitle } from "../hooks/styles"; // Înlocuiți <calea_dvs.> cu calea către componentele stilizate
import { Button } from "@mui/material";

const CheckUser = ({ handleLogin, handleCreate }) => {
  const navigate = useNavigate();

  const gocreate = () => {
    navigate("/create");
  };
  const gologin = () => {
    navigate("/login");
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
      <ActionButton variant="contained" color="primary" onClick={gologin}>
        Press here to login
      </ActionButton>
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
