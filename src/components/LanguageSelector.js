import React, { useState } from "react";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import ro from "../flags/ro.svg";
import en from "../flags/en.svg";
import it from "../flags/it.svg";

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const flags = {
    en: en,
    ro: ro,
    it: it,
  };
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.light,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h6">{t("languageSelector.title")}</Typography>
      <IconButton onClick={handleClick}>
        <img
          src={flags[i18n.language] || ro}
          alt="Flag"
          width="30"
          height="30"
          style={{ borderRadius: "50%" }}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => changeLanguage("ro")}>
          <img
            src={ro}
            alt="RO Flag"
            width="30"
            height="30"
            style={{ borderRadius: "50%" }}
          />
          <Typography variant="body1" style={{ paddingLeft: 8 }}>
            {t("languageSelector.ro")}
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => changeLanguage("en")}>
          <img
            src={en}
            alt="EN Flag"
            width="30"
            height="30"
            style={{ borderRadius: "50%" }}
          />
          <Typography variant="body1" style={{ paddingLeft: 8 }}>
            {t("languageSelector.en")}
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => changeLanguage("it")}>
          <img
            src={it}
            alt="IT Flag"
            width="30"
            height="30"
            style={{ borderRadius: "50%" }}
          />
          <Typography variant="body1" style={{ paddingLeft: 8 }}>
            {t("languageSelector.it")}
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default LanguageSelector;
