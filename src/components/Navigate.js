import React, { useState } from "react";
import { Box, MenuItem, IconButton, Menu, Dialog } from "@mui/material";
import { styled } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CreateWallet from "./createwallet.js";
import LoginWallet from "./loginwallet.js";
import ReportAddress from "../report/ReportAddress.js";
import Settings from "./settings.js";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { NavigateBox, NavigateMenu, MenuItemImport } from "../hooks/styles.js";
import CreateWalletUI from "../pages/CreateWalletUi.js";

const Meniu = () => {
  const theme = useTheme();
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showReportPopup, setShowReportPopup] = useState(false);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  const { t } = useTranslation();
  const handleCreateClick = () => {
    setShowCreatePopup(true);
  };
  const handleLoginClick = () => {
    setShowLoginPopup(true);
  };
  const handleReportClick = () => {
    setShowReportPopup(true);
  };
  const handleSettingsClick = () => {
    setShowSettingsPopup(true);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (menuItem) => {
    setAnchorEl(null);
  };
  const handleExpandView = () => {
    window.open(
      "chrome-extension://edlbpjmiidgfnmblcaildocjliemkfkc/index.html",
      "_blank"
    );
  };

  return (
    <NavigateBox>
      <IconButton
        color="secondary"
        size="large"
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <NavigateMenu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: "210px",
            width: "20ch",
            backgroundColor: theme.palette.primary.second, // Setăm culoarea de fundal folosind tema
          },
        }}
      >
        <MenuItemImport onClick={handleCreateClick}>
          {t("nav.create")}
        </MenuItemImport>
        <MenuItemImport onClick={handleLoginClick}>
          {t("nav.login")}
        </MenuItemImport>
        <MenuItemImport onClick={handleSettingsClick}>
          {t("nav.settings")}
        </MenuItemImport>
        <MenuItemImport onClick={handleReportClick}>
          {t("nav.report")}
        </MenuItemImport>
        <MenuItemImport onClick={handleExpandView}>
          {t("nav.expand")}
        </MenuItemImport>
      </NavigateMenu>

      <Dialog open={showCreatePopup} onClose={() => setShowCreatePopup(false)}>
        <CreateWalletUI mode="popup" />
      </Dialog>
      <Dialog open={showLoginPopup} onClose={() => setShowLoginPopup(false)}>
        <LoginWallet />
      </Dialog>
      <Dialog open={showReportPopup}>
        <ReportAddress onClose={() => setShowReportPopup(false)} />
      </Dialog>
      <Dialog open={showSettingsPopup}>
        <Settings onClose={() => setShowSettingsPopup(false)} />
      </Dialog>
    </NavigateBox>
  );
};

export default Meniu;
