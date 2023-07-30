import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { CenterBox, TypographyTitle, StyledBox } from "./styles";

export default function Settings() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const showKey = (key, title) => {
    setDialogTitle(title);
    setOpenDialog(true);
    setDialogContent(localStorage[key]);
  };

  return (
    <CenterBox>
      <TypographyTitle variant="h6">Settings</TypographyTitle>
      <StyledBox>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleMenuClick}
        >
          Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => navigate("/create")}>Create</MenuItem>
          <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
          <MenuItem onClick={() => navigate("/settings")}>Settings</MenuItem>
        </Menu>
        <Button onClick={() => navigate("/")}>Home</Button>
      </StyledBox>

      <Button variant="contained" onClick={() => showKey("pkey", "Secret Key")}>
        Show Secret Key
      </Button>
      <Button
        variant="contained"
        onClick={() => showKey("mnem", "Recovery Phrase")}
      >
        Show Recovery Phrase
      </Button>

      <Dialog onClose={() => setOpenDialog(false)} open={openDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>{dialogContent}</DialogContent>
      </Dialog>
    </CenterBox>
  );
}
