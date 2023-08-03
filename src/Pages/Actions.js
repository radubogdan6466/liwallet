// Actions.js
import React from "react";
import { Box, Button } from "@mui/material";

export default function Actions({ onSendClick, onImportClick }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        margin: "10px",
      }}
    >
      <Box>
        <Button variant="contained" color="primary" onClick={onSendClick}>
          Send
        </Button>
        <Button variant="contained" color="primary" onClick={onImportClick}>
          Import
        </Button>
      </Box>
    </Box>
  );
}
