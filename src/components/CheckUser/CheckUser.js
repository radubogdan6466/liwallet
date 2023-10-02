import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@mui/material";
import LoginWallet from "../loginwallet";
import { useTranslation } from "react-i18next";
import "./CheckUser.css";
const CheckUser = ({ handleLogin, handleCreate }) => {
  const navigate = useNavigate();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
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
    <div className="checkUser-content">
      <h1 className="checkUser-title">{t("notConnected")}</h1>
      <div className="checkUser-button-content">
        <div className="checkUser-button-p">
          <button className="checkUser-button" onClick={openLoginDialog}>
            <p>{t("pkeyLogin")}</p>
          </button>
        </div>
        <Dialog open={loginDialogOpen} onClose={handleClose}>
          <LoginWallet onClose={handleClose} />
        </Dialog>
        <div className="checkUser-button-p">
          <button
            className="checkUser-button"
            variant="contained"
            onClick={gocreate}
          >
            <p>{t("createNewWallet")}</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckUser;
