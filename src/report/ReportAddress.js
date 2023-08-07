import React, { useState } from "react";
import { reportAddress } from "../api/api.js";
import EthereumAddress from "ethereum-address";
import {
  TypographyTitle,
  StyledBoxx,
  FormField,
  FormContainer,
  ActionsContainer,
} from "../hooks/styles.js";
import { Button, Box, Typography, Dialog } from "@mui/material";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

import { useTheme } from "@mui/material/styles";

export default function ReportAddress({ onClose }) {
  const [address, setAddress] = useState("");
  const [details, setDetails] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const theme = useTheme();

  const closePopup = () => {
    onClose();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!EthereumAddress.isAddress(address)) {
      setError("Adresa nu este validă");
      return;
    }

    setError(null);
    try {
      const response = await reportAddress(address, details);

      if (response === "Address reported successfully") {
        setMessage(response);
        setAddress("");
        setDetails("");
      } else {
        console.error("A apărut o eroare", response);
      }
    } catch (error) {
      console.error("A apărut o eroare", error);
    }
  };

  return (
    <Dialog open={true} onClose={closePopup}>
      <StyledBoxx
        sx={{
          backgroundColor: theme.palette.background.light,
        }}
      >
        <TypographyTitle variant="h5" gutterBottom>
          Raportează o adresă
        </TypographyTitle>
        <FormContainer
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FormField
            label="Adresa"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            error={!!error}
            helperText={error}
            required
            sx={{
              color: theme.palette.text.text,
              labelColor: theme.palette.text.text,
            }}
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="details-label">Detalii</InputLabel>
            <Select
              labelId="details-label"
              label="Detalii"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            >
              <MenuItem value={"ScamOption1"}>Scam Option 1</MenuItem>
              <MenuItem value={"ScamOption2"}>Scam Option 2</MenuItem>
              <MenuItem value={"ScamOption3"}>Scam Option 3</MenuItem>
              {/* Adaugă aici alte opțiuni dacă este necesar */}
            </Select>
          </FormControl>
          {message && (
            <Box mb={2}>
              <Typography>{message}</Typography>
            </Box>
          )}
          <ActionsContainer>
            <Button variant="contained" color="secondary" type="submit">
              Trimite
            </Button>
          </ActionsContainer>
        </FormContainer>
      </StyledBoxx>
    </Dialog>
  );
}
