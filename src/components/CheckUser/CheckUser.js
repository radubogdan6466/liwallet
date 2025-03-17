import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginWallet from "../Login/loginwallet";
import { useTranslation } from "react-i18next";
import "./CheckUser.css";

const CheckUser = () => {
  const navigate = useNavigate();
  const [showLoginWallet, setShowLoginWallet] = useState(false); // Starea pentru afișarea componentei LoginWallet
  const { t } = useTranslation();

  const gocreate = () => {
    navigate("/create");
  };
  const gologin = () => {
    navigate("/login");
  };

  const openLoginWallet = () => {
    setShowLoginWallet(true); // Deschidem componenta LoginWallet
  };

  const closeLoginWallet = () => {
    setShowLoginWallet(false); // Închidem componenta LoginWallet
  };

  return (
    <div className="checkUser-content">
      <h1 className="checkUser-title">{t("notConnected")}</h1>
      <div className="checkUser-button-content">
        <div className="checkUser-button-p">
          <button className="checkUser-button" onClick={gologin}>
            <p>{t("pkeyLogin")}</p>
          </button>
        </div>
        <div className="checkUser-button-p">
          <button className="checkUser-button" onClick={gocreate}>
            <p>{t("createNewWallet")}</p>
          </button>
        </div>
      </div>
      {showLoginWallet && <LoginWallet onClose={closeLoginWallet} />}
    </div>
  );
};

export default CheckUser;
