import React from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <div>
      <Button onClick={() => changeLanguage("ro")}>Română</Button>
      <Button onClick={() => changeLanguage("en")}>English</Button>
    </div>
  );
};

export default LanguageSelector;
