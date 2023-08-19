import React, { useState } from "react";
import { Box, MenuItem, IconButton, Menu, Dialog } from "@mui/material";
import { styled } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CreateWallet from "./createwallet.js";
import LoginWallet from "./loginwallet.js";
import ReportAddress from "../report/ReportAddress.js";
import Settings from "./settings.js";
import { useTranslation } from "react-i18next";

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
});
const Meniu = () => {
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
    <StyledBox>
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
      <Menu
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
          },
        }}
      >
        <MenuItem onClick={handleCreateClick}>{t("nav.create")}</MenuItem>
        <MenuItem onClick={handleLoginClick}>{t("nav.login")}</MenuItem>
        <MenuItem onClick={handleSettingsClick}>{t("nav.settings")}</MenuItem>
        <MenuItem onClick={handleReportClick}>{t("nav.report")}</MenuItem>
        <MenuItem onClick={handleExpandView}>{t("nav.expand")}</MenuItem>
      </Menu>

      <Dialog open={showCreatePopup} onClose={() => setShowCreatePopup(false)}>
        <CreateWallet mode="popup" />
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
    </StyledBox>
  );
};

export default Meniu;
