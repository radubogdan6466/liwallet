import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, MenuItem, IconButton, Menu, Dialog } from "@mui/material";
import { styled } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CreateWallet from "./createwallet.js";
import LoginWallet from "./Login/loginwallet.js";
import ReportAddress from "../report/ReportAddress.js";
import Settings from "./settings.js";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { NavigateBox, NavigateMenu, MenuItemImport } from "../hooks/styles.js";
import CreateNewWallet from "./createNewWallet/createNewWallet.js";
import { IonButton, IonActionSheet } from "@ionic/react";
import settingsLogo from "../logos/settings.png";
import Popup from "reactjs-popup";

const Meniu = () => {
  const theme = useTheme();

  const [showActionSheet, setShowActionSheet] = useState(false);

  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showReportPopup, setShowReportPopup] = useState(false);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleCreateClick = () => {
    setShowCreatePopup(true);
    navigate("/create/new");
  };
  const handleLoginClick = () => {
    setShowLoginPopup(true);
    navigate("/Login");
  };
  const handleReportClick = () => {
    setShowReportPopup(true);
    navigate("/Report");
  };
  const handleSettingsClick = () => {
    setShowSettingsPopup(true);
    navigate("/settings");
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleExpandView = () => {
    window.open(
      "chrome-extension://edlbpjmiidgfnmblcaildocjliemkfkc/index.html",
      "_blank"
    );
  };

  const handleOpenActionSheet = () => {
    setShowActionSheet(true);
  };

  const handleCloseActionSheet = () => {
    setShowActionSheet(false);
  };

  return (
    <NavigateBox>
      <IonButton
        fill="clear"
        id="open-action-sheet"
        onClick={handleOpenActionSheet}
      >
        <img
          src={settingsLogo}
          alt="Settings Logo"
          style={{ height: "40px" }}
        />
      </IonButton>

      <Popup open={showCreatePopup} onClose={() => setShowCreatePopup(false)}>
        <CreateNewWallet />
      </Popup>
      <Popup open={showLoginPopup} onClose={() => setShowLoginPopup(false)}>
        <LoginWallet />
      </Popup>
      <Popup open={showReportPopup} onClose={() => setShowReportPopup(false)}>
        <ReportAddress />
      </Popup>
      <Popup
        open={showSettingsPopup}
        onClose={() => setShowSettingsPopup(false)}
      >
        <Settings />
      </Popup>

      <IonActionSheet
        isOpen={showActionSheet}
        onDidDismiss={handleCloseActionSheet}
        header="Actions"
        buttons={[
          {
            text: "Create",
            handler: handleCreateClick,
          },
          {
            text: "Import wallet",
            handler: handleLoginClick,
          },
          {
            text: "Settings",
            handler: handleSettingsClick,
          },
          {
            text: "Report",
            handler: handleReportClick,
          },
          {
            text: "Expand ( coming soon )",
            handler: handleExpandView,
          },
          {
            text: "Cancel",
            role: "cancel",
            handler: handleCloseActionSheet,
          },
        ]}
      />
    </NavigateBox>
  );
};

export default Meniu;
