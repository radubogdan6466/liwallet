// Actions.js
import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // Importă useTheme hook
import { ActionButton } from "../hooks/styles";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";

export default function Actions({
  onSendClick,
  onImportClick,
  onReceiveClick,
}) {
  const theme = useTheme();
  const { t } = useTranslation();

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
          {t("send")}
        </ActionButton>

        <ActionButton onClick={onReceiveClick}>
          <CallReceivedIcon
            sx={{
              color: theme.palette.primary.icon,
            }}
          />
          {t("receive")}
        </ActionButton>
        <ActionButton onClick={onImportClick}>
          <AddIcon
            sx={{
              color: theme.palette.primary.icon,
            }}
          />
          {t("import")}
        </ActionButton>
      </Box>
    </Box>
  );
}
