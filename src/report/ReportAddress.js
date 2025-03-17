import React, { useState } from "react";
import { reportAddress } from "../api/api.js";
import { useNavigate } from "react-router-dom";
import EthereumAddress from "ethereum-address";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import {
  ToAdrsSendTextField,
  inputLabelPropsStylesSend,
} from "../hooks/styles.js";
import { InputLabel, FormControl, MenuItem, Select } from "@mui/material";

export default function ReportAddress({ onClose }) {
  const [address, setAddress] = useState("");
  const [details, setDetails] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();

  const goBack = () => {
    navigate(-1);
  };
  // const closePopup = () => {
  //   onClose();
  // };

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
    <div className="login-container">
      <div className="login-title">
        <h5>{t("reportTitle")}</h5>
        {/* <button onClick={closePopup} className="close-button">
            &times;
          </button> */}
      </div>
      <form onSubmit={handleSubmit} className="form__group field">
        <ToAdrsSendTextField
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={`input ${error ? "error" : ""}`}
          required
          placeholder={t("reportAddressPlaceholder")}
          color="success"
          InputLabelProps={{ style: inputLabelPropsStylesSend(theme) }}
          inputProps={{
            style: {
              fontSize: "10px",

              color: "#f2f2f2", // Culoarea textului
              backgroundColor: "rgba(29, 35, 41)",
              "&:focus": {
                borderColor: "#38ef7d",
              },
            },
          }}
          sx={{
            marginTop: "10px",
            marginBottom: "10px",
            width: "275px",
            "& input:focus": {
              borderColor: "#38ef7d",
            },
            "& fieldset": {
              borderColor: "#38ef7d",
            },
          }}
        />
        <div className="form-field">
          {/* <label>{t("addressRep")}</label> */}
          {/* <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={`input ${error ? "error" : ""}`}
            required
          /> */}
          {error && <span className="error-text">{error}</span>}
        </div>
        {/* <div className="form-field">
          <label htmlFor="details">{t("detailRep")}</label>
          <select
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="select"
            required
          >
            <option value="FakeGiveaway">Fake Giveaway</option>
            <option value="StolenCrypto">Stolen Crypto</option>
            <option value="FakeInvestment">Fake Investment</option>
            <option value="RugPull">Rug Pull</option>
          </select>
        </div> */}
        <FormControl
          fullWidth
          color="success"
          InputLabelProps={{ style: inputLabelPropsStylesSend(theme) }}
          inputProps={{
            style: {
              fontSize: "10px",

              color: "#f2f2f2",
              backgroundColor: "rgba(29, 35, 41)",
              "&:focus": {
                borderColor: "#38ef7d",
              },
            },
          }}
          sx={{
            marginTop: "10px",
            marginBottom: "10px",
            width: "275px",
            "& input:focus": {
              borderColor: "#38ef7d",
            },
            "& fieldset": {
              borderColor: "#38ef7d",
            },
          }}
        >
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            inputProps={{}}
            sx={{
              "&amp; .MuiSelect-select": {
                color: "#ffffff", // Culoarea textului selectat
              },

              "&amp; .MuiMenuItem-root.Mui-selected": {
                backgroundColor: "rgba(29, 35, 41) !important", // Fundal pentru item selectat
              },
            }}
          >
            <MenuItem value="FakeGiveaway" style={{ color: "#ffffff" }}>
              Fake Giveaway
            </MenuItem>
            <MenuItem value="StolenCrypto">Stolen Crypto</MenuItem>
            <MenuItem value="FakeInvestment">Fake Investment</MenuItem>
            <MenuItem value="RugPull">Rug Pull</MenuItem>
          </Select>
        </FormControl>
        {message && (
          <div className="message">
            <p>{message}</p>
          </div>
        )}
        <div className="actions-container">
          <button type="submit" className="login-button">
            {t("sendRep")}
          </button>
        </div>
      </form>
      <div className="login-button-p">
        <button className="login-button-return" onClick={goBack}>
          Return
        </button>
      </div>
    </div>
  );
}
