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
      <Box>
        <ActionButton onClick={onSendClick}>
          <CallMadeIcon />
          {t("send")}
        </ActionButton>

        <ActionButton onClick={onReceiveClick}>
          <CallReceivedIcon />
          {t("receive")}
        </ActionButton>
        <ActionButton onClick={onImportClick}>
          <AddIcon />
          {t("import")}
        </ActionButton>
      </Box>
    </Box>
  );
}
