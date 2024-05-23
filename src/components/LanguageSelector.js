import React, { useState } from "react";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import ro from "../flags/ro.svg";
import en from "../flags/en.svg";
import it from "../flags/it.svg";

const LANGUAGES = [
  { code: "ro", label: "Română", flag: ro },
  { code: "en", label: "English", flag: en },
  { code: "it", label: "Italiano", flag: it },
];

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    setAnchorEl(null);
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <img
          src={
            LANGUAGES.find((lang) => lang.code === i18n.language)?.flag || ro
          }
          alt="Flag"
          width="30"
          height="30"
          style={{ borderRadius: "50%" }}
        />
        <Typography>
          {LANGUAGES.find((lang) => lang.code === i18n.language)?.label ||
            "Română"}
        </Typography>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {LANGUAGES.map((lang) => (
          <MenuItem key={lang.code} onClick={() => changeLanguage(lang.code)}>
            <img
              src={lang.flag}
              alt={`${lang.label} Flag`}
              width="30"
              height="30"
              style={{ borderRadius: "50%" }}
            />
            <Typography variant="body1" style={{ paddingLeft: 8 }}>
              {t(`languageSelector.${lang.code}`)}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageSelector;
