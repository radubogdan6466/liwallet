import React, { useState } from "react";
import "./set.css";
import { useTranslation } from "react-i18next";
import logo from "../MIS.png";
import { Logicp } from "../logic/logicp";

export default function SetPassword({ onPasswordSet }) {
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSubmit,
  } = Logicp(onPasswordSet);
  const { t } = useTranslation();
  const [privacyChecked, setPrivacyChecked] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSubmit();
  };
  return (
    <div className="set-content">
      <div>
        <h1 className="title1">{t("setPassword")}</h1>
        <h2 className="title2">{t("setPasswordInfo1")}</h2>
        <h2 className="title2">{t("setPasswordInfo2")}</h2>
      </div>
      <form className="form__group field" onSubmit={handleFormSubmit}>
        <input
          type="password"
          className="form__field"
          required
          placeholder="Name"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="name" className="form__label">
          Password
        </label>
      </form>
      <form className="form__group field">
        <input
          type="password"
          className="form__field"
          required
          placeholder="Name"
          autoComplete="off"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <label htmlFor="name" className="form__label">
          Confirm
        </label>
      </form>
      <div>
        <input
          type="checkbox"
          required
          id="privacyCheckbox"
          checked={privacyChecked}
          onChange={() => setPrivacyChecked(!privacyChecked)}
        />
        <label htmlFor="privacyCheckbox">
          {t("I agree to the Privacy Policy")}
        </label>
        <a
          href="https://radubogdan6466.github.io/privacy-policy/"
          target="_blank"
        >
          Privacy Policy
        </a>
      </div>
      <div className="set-button-p">
        <button
          className="noselect"
          onClick={handleSubmit}
          disabled={!privacyChecked}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
