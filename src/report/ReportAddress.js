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
            labelColor: theme.palette.text.input,
            color: theme.palette.text.input, // Acesta setează culoarea textului
            "& .MuiInputBase-input": {
              // Acesta asigură că input-ul real este și el alb
              color: theme.palette.text.input,
            },
          }}
        >
          <FormField
            label="Adresa"
            variant="outlined"
            color="secondary"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            error={!!error}
            helperText={error}
            required
            InputLabelProps={{
              style: { color: theme.palette.text.input },
            }}
            inputProps={{
              style: { color: theme.palette.text.input },
            }}
            sx={{
              labelColor: theme.palette.text.input,
              color: theme.palette.text.input, // Acesta setează culoarea textului
              "& .MuiInputBase-input": {
                // Acesta asigură că input-ul real este și el alb
                color: theme.palette.text.input,
              },
            }}
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel
              color="secondary"
              id="details-label"
              sx={{ color: "#000" }}
            >
              Detalii
            </InputLabel>
            <Select
              labelId="details-label"
              label="Detalii"
              color="secondary"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            >
              <MenuItem value={"Phishing"}>Phishing</MenuItem>
              <MenuItem value={"PonziScheme"}>Scheme Ponzi</MenuItem>
              <MenuItem value={"FakeICO"}>ICO-uri false</MenuItem>
              <MenuItem value={"PumpAndDump"}>Pump and Dump</MenuItem>
              <MenuItem value={"CloudMiningScam"}>
                Scamuri de cloud mining
              </MenuItem>
              <MenuItem value={"FakeWallet"}>Portofele false</MenuItem>
              <MenuItem value={"Shill"}>Promovări exagerate</MenuItem>
              <MenuItem value={"Malware"}>
                Malware pentru furtul de criptomonede
              </MenuItem>
              <MenuItem value={"Blackmail"}>
                Blackmail and extortion scams
              </MenuItem>
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
