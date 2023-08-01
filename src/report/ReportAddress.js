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

export default function ReportAddress({ onClose }) {
  const [address, setAddress] = useState("");
  const [details, setDetails] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

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
      <TypographyTitle variant="h5" gutterBottom>
        Raportează o adresă
      </TypographyTitle>
      <StyledBoxx>
        <FormContainer onSubmit={handleSubmit}>
          <FormField
            label="Adresa"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            error={!!error}
            helperText={error}
            required
          />
          <FormField
            label="Detalii"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          {message && (
            <Box mb={2}>
              <Typography>{message}</Typography>
            </Box>
          )}
          <ActionsContainer>
            <Button variant="contained" color="primary" type="submit">
              Trimite
            </Button>
          </ActionsContainer>
        </FormContainer>
      </StyledBoxx>
    </Dialog>
  );
}
