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
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";

export default function ReportAddress({ onClose }) {
  const [address, setAddress] = useState("");
  const [details, setDetails] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const theme = useTheme();
  const { t } = useTranslation();
  const closePopup = () => {
    onClose();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!EthereumAddress.isAddress(address)) {
      setError(t("error.invalidAddress"));
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
      <StyledBoxx>
        <TypographyTitle variant="h5" gutterBottom>
          {t("reportTitle")}
        </TypographyTitle>
        <FormContainer onSubmit={handleSubmit}>
          <FormField
            label={t("addressRep")}
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            error={!!error}
            helperText={error}
            required
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel color="secondary" id="details-label">
              {t("detailRep")}
            </InputLabel>
            <Select
              labelId="details-label"
              label="Detalii"
              color="secondary"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            >
              <MenuItem value={"FakeGiveaway"}>Fake Giveaway</MenuItem>
              <MenuItem value={"StolenCrypto"}>Stolen Crypto</MenuItem>
              <MenuItem value={"FakeInvestment"}>Fake Investment</MenuItem>
              <MenuItem value={"RugPull"}>Rug Pull</MenuItem>
            </Select>
          </FormControl>
          {message && (
            <Box mb={2}>
              <Typography>{message}</Typography>
            </Box>
          )}
          <ActionsContainer>
            <Button variant="contained" color="secondary" type="submit">
              {t("sendRep")}
            </Button>
          </ActionsContainer>
        </FormContainer>
      </StyledBoxx>
    </Dialog>
  );
}
