// Actions.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CallMadeOutlinedIcon from "@mui/icons-material/CallMadeOutlined";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import "./actions.css";

export default function Actions({
  onSendClick,
  onImportClick,
  onReceiveClick,
}) {
  const { t } = useTranslation();
  const [value, setValue] = useState(0);
  return (
    <BottomNavigation
      sx={{ backgroundColor: "rgba(29, 35, 41)" }}
      className="bottom-nav"
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction
        sx={{ color: "white" }}
        className="action-nav"
        label="Receive"
        icon={<CallReceivedIcon sx={{ fontSize: 40 }} />}
        onClick={onReceiveClick}
      ></BottomNavigationAction>
      <BottomNavigationAction
        sx={{ color: "white" }}
        className="action-nav"
        label="Send"
        icon={<CallMadeOutlinedIcon sx={{ fontSize: 40 }} />}
        onClick={onSendClick}
      ></BottomNavigationAction>
      <BottomNavigationAction
        sx={{ color: "white" }}
        className="action-nav"
        label="Import"
        icon={<AddIcon sx={{ fontSize: 40 }} />}
        onClick={onImportClick}
      ></BottomNavigationAction>
    </BottomNavigation>
  );
}
