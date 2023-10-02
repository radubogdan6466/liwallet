// SetPassword.js
import React from "react";
import "./set.css";
import { useTranslation } from "react-i18next";
import logo from "../MIS.png";
import { Logicp } from "../logic/logicp";
import { IonInput, IonItem, IonList, IonLabel, IonButton } from "@ionic/react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
export default function SetPassword({ onPasswordSet }) {
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSubmit,
  } = Logicp(onPasswordSet);
  const { t } = useTranslation();
  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSubmit();
  };
  return (
    <div className="container-set">
      <div className="content-set">
        <div className="content-set-text">
          <h1 className="title1">{t("setPassword")}</h1>
          <h2 className="title2">{t("setPasswordInfo1")}</h2>
          <h2 className="title2">{t("setPasswordInfo2")}</h2>
        </div>

        <form className="form__group field" onSubmit={handleFormSubmit}>
          <input
            type="password"
            className="form__field"
            placeholder="Name"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label for="name" className="form__label">
            Password
          </label>

          <input
            type="password"
            className="form__field"
            placeholder="Name"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label for="name" class="form__label">
            Confirm
          </label>

          <button className="noselect" onClick={handleSubmit}>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
