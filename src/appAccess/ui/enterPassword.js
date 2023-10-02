import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import logo from "../MIS.png";
import { usePasswordLogic } from "../logic/passwordLogic"; // <-- import the new hook
import "./enter.css";
export default function EnterPassword({ onPasswordMatch }) {
  const { enteredPassword, setEnteredPassword, handleSubmit } =
    usePasswordLogic(onPasswordMatch);
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <div className="enter-content">
      <h1 className="titleEnterPass">{t("enterPassword")}</h1>
      <form className="form__group field">
        <input
          type="password"
          className="form__field"
          placeholder="Name"
          required
          autoComplete="off"
          value={enteredPassword}
          onChange={(e) => setEnteredPassword(e.target.value)}
        />
        <label htmlFor="name" className="form__label">
          Password
        </label>
      </form>
      <div className="enter-button-p">
        <button
          className="enter-button"
          variant="contained"
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
    </div>
  );
}
