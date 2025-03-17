// CustomNetwork.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { addNetwork } from "./DatbaBase.js"; // Import the IndexedDB utility functions
import "./CustomNetwork.css";
import {
  inputLabelPropsStylesSend,
  ToAdrsSendTextField,
} from "../../hooks/styles";
import { useTranslation } from "react-i18next";
import ValidChainNames from "./ValidChainNames.js";
import { getChainNameById } from "../../hooks/utils.js"; // Import the chain IDs and names

const CustomNetwork = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [networkName, setNetworkName] = useState("");
  const [rpcUrl, setRpcUrl] = useState("");
  const [chainId, setChainId] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [blockExplorerUrl, setBlockExplorerUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const chainIdNumber = parseInt(chainId, 10);
    const validChainName = getChainNameById(chainIdNumber);
    if (validChainName) {
      const network = {
        networkName: validChainName,
        rpcUrl,
        chainId: chainIdNumber,
        currencySymbol,
        blockExplorerUrl,
      };
      await addNetwork(network);
      alert("Network added successfully!");
      navigate(-1);
    } else {
      setErrorMessage("Please enter a valid chain ID.");
    }
  };

  const handleChainIdChange = (e) => {
    const id = e.target.value;
    setChainId(id);
    const chainIdNumber = parseInt(id, 10);
    const name = getChainNameById(chainIdNumber);
    if (name) {
      setNetworkName(name);
      setErrorMessage("");
    } else {
      setNetworkName("");
      setErrorMessage("Invalid chain ID. Please enter a valid chain ID.");
    }
  };

  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="login-container">
      <h1 className="login-title">Enter your private key</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}{" "}
      {/* Display error message */}
      <form className="form__group field" onSubmit={handleSubmit}>
        <ToAdrsSendTextField
          id="chainId"
          required
          color="success"
          value={chainId}
          onChange={handleChainIdChange}
          placeholder={t("Chain ID")}
          InputLabelProps={{ style: inputLabelPropsStylesSend(theme) }}
          inputProps={{
            style: {
              color: "#f2f2f2",
              backgroundColor: "rgba(29, 35, 41)",
              fontSize: "10px",
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

        <ToAdrsSendTextField
          id="networkName"
          required
          color="success"
          value={networkName}
          placeholder={t("Network Name")}
          InputLabelProps={{ style: inputLabelPropsStylesSend(theme) }}
          inputProps={{
            style: {
              color: "#f2f2f2",
              backgroundColor: "rgba(29, 35, 41)",
              fontSize: "10px",
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
          disabled // Make this field read-only
        />

        <ToAdrsSendTextField
          id="rpcUrl"
          required
          color="success"
          value={rpcUrl}
          onChange={(e) => setRpcUrl(e.target.value)}
          placeholder={t("New RPC URL")}
          InputLabelProps={{ style: inputLabelPropsStylesSend(theme) }}
          inputProps={{
            style: {
              color: "#f2f2f2",
              backgroundColor: "rgba(29, 35, 41)",
              fontSize: "10px",
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

        <ToAdrsSendTextField
          id="currencySymbol"
          required
          color="success"
          value={currencySymbol}
          onChange={(e) => setCurrencySymbol(e.target.value)}
          placeholder={t("Currency Symbol")}
          InputLabelProps={{ style: inputLabelPropsStylesSend(theme) }}
          inputProps={{
            style: {
              color: "#f2f2f2",
              backgroundColor: "rgba(29, 35, 41)",
              fontSize: "10px",
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

        <ToAdrsSendTextField
          id="blockExplorerUrl"
          color="success"
          value={blockExplorerUrl}
          onChange={(e) => setBlockExplorerUrl(e.target.value)}
          placeholder={t("Block Explorer URL (optional)")}
          InputLabelProps={{ style: inputLabelPropsStylesSend(theme) }}
          inputProps={{
            style: {
              color: "#f2f2f2",
              backgroundColor: "rgba(29, 35, 41)",
              fontSize: "10px",
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
        <div className="login-button-p">
          <button className="login-button" type="submit">
            Add Custom Rpc
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
};

export default CustomNetwork;
