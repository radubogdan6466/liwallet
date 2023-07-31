// Actions.js
import React from "react";
import { Box, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useTheme } from "@mui/material/styles"; // Importă useTheme hook
import { ActionButton } from "./styles";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import AddIcon from "@mui/icons-material/Add";
export default function Actions({
  onSendClick,
  onImportClick,
  onReceiveClick,
}) {
  const theme = useTheme();
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <ActionButton
          sx={{
            color: theme.palette.text.secondary,
          }}
          onClick={onSendClick}
        >
          <CallMadeIcon
            sx={{
              color: theme.palette.primary.icon,
            }}
          />
          Send
        </ActionButton>

        <ActionButton onClick={onReceiveClick}>
          <CallReceivedIcon
            sx={{
              color: theme.palette.primary.icon,
            }}
          />
          Receive
        </ActionButton>
        <ActionButton onClick={onImportClick}>
          <AddIcon
            sx={{
              color: theme.palette.primary.icon,
            }}
          />
          Import
        </ActionButton>
      </Box>
    </Box>
  );
}
