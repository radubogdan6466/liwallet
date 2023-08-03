import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, MenuItem, IconButton, Menu } from "@mui/material";
import { styled } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
});

const Meniu = () => {
  const navigate = useNavigate();
  //const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const gocreate = () => {
    navigate("/create");
  };

  const gologin = () => {
    navigate("/login");
  };

  const goSettings = () => {
    navigate("/settings");
  };
  const goReport = () => {
    navigate("/report");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (menuItem) => {
    setAnchorEl(null);

    if (menuItem === "create") {
      gocreate();
    } else if (menuItem === "login") {
      gologin();
    } else if (menuItem === "settings") {
      goSettings();
    } else if (menuItem === "report") {
      goReport();
    }
  };

  //if (isMobile) {
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
        <MenuItem onClick={() => handleClose("create")}>Create</MenuItem>
        <MenuItem onClick={() => handleClose("login")}>Login</MenuItem>
        <MenuItem onClick={() => handleClose("settings")}>Settings</MenuItem>
        <MenuItem onClick={() => handleClose("report")}>Report</MenuItem>
      </Menu>
    </StyledBox>
  );
};

export default Meniu;
