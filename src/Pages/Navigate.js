import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, MenuItem, IconButton, Menu, Dialog } from "@mui/material";
import { styled } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CreateWallet from "./createwallet.js";
import LoginWallet from "./loginwallet.js";

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
});

const Meniu = () => {
  const navigate = useNavigate();
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleCreateClick = () => {
    setShowCreatePopup(true);
  };
  const handleLoginClick = () => {
    setShowLoginPopup(true);
  };

  const goSettings = () => {
    navigate("/settings");
  };

  const goReport = () => {
    navigate("/report");
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (menuItem) => {
    setAnchorEl(null);

    if (menuItem === "settings") {
      goSettings();
    } else if (menuItem === "report") {
      goReport();
    }
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
            width: "12ch",
          },
        }}
      >
        <MenuItem onClick={handleCreateClick}>Create</MenuItem>
        <MenuItem onClick={handleLoginClick}>Login</MenuItem>
        <MenuItem onClick={() => handleClose("settings")}>Settings</MenuItem>
        <MenuItem onClick={() => handleClose("report")}>Report</MenuItem>
      </Menu>

      <Dialog open={showCreatePopup} onClose={() => setShowCreatePopup(false)}>
        <CreateWallet />
      </Dialog>
      <Dialog open={showLoginPopup}>
        <LoginWallet onClose={() => setShowLoginPopup(false)} />
      </Dialog>
    </StyledBox>
  );
};

export default Meniu;
