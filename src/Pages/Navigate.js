import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white", // Schimbați culoarea textului
});

const Meniu = () => {
  const navigate = useNavigate();

  const gocreate = () => {
    navigate("/create");
  };

  const gologin = () => {
    navigate("/login");
  };

  const goSettings = () => {
    navigate("/settings");
  };

  return (
    <StyledBox>
      <FormControl variant="filled" sx={{ minWidth: "80px" }}>
        <InputLabel id="menu-select-label" sx={{ color: "white" }}>
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
};

export default Meniu;
