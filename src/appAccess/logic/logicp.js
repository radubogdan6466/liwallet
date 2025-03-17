import { useState } from "react";
import { encrypt } from "./crutil";

export const Logicp = (onPasswordSetCallback) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      console.error("Parolele nu coincid.");
      return;
    }

    if (password.length < 5) {
      console.error("Parola trebuie să aibă cel puțin 5 caractere.");
      return;
    }

    const encryptedPassword = encrypt(password);
    localStorage.setItem("B#V%VBbkgnucg842ui3v56BH#Vc", encryptedPassword);
    onPasswordSetCallback();
  };

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSubmit,
  };
};
