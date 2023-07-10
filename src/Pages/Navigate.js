import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Menu,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white", // Schimbați culoarea textului
});

const Meniu = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const gocreate = () => {
    navigate("/create");
  };

  const gologin = () => {
    navigate("/login");
  };

  const goSettings = () => {
    navigate("/settings");
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
    }
  };

  //if (isMobile) {
  return (
    <StyledBox>
      <IconButton
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
        <MenuItem onClick={() => handleClose("create")}>Create</MenuItem>
        <MenuItem onClick={() => handleClose("login")}>Login</MenuItem>
        <MenuItem onClick={() => handleClose("settings")}>Settings</MenuItem>
      </Menu>
    </StyledBox>
  );
};
/**
   * 
  else {
    return (
      <StyledBox>
        <FormControl variant="standard" sx={{ minWidth: "80px" }}>
          <InputLabel id="menu-select-label" sx={{ color: "primary" }}>
            Menu
          </InputLabel>
          <Select
            labelId="menu-select-label"
            id="menu-select"
            value=""
            onChange={(event) => {
              const menuItem = event.target.value;
              if (menuItem === "create") {
                gocreate();
              } else if (menuItem === "login") {
                gologin();
              } else if (menuItem === "settings") {
                goSettings();
              }
            }}
            sx={{ color: "white" }}
          >
            <MenuItem value="create">Create</MenuItem>
            <MenuItem value="login">Login</MenuItem>
            <MenuItem value="settings">Settings</MenuItem>
          </Select>
        </FormControl>
      </StyledBox>
    );
  }
};
   * 
   */

export default Meniu;
