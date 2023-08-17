import { useState } from "react";
import { decrypt } from "./crutil";

export const usePasswordLogic = (onPasswordMatchCallback) => {
  const [enteredPassword, setEnteredPassword] = useState("");
  const encryptedStoredPassword = localStorage.getItem(
    "B#V%VBbkgnucg842ui3v56BH#Vc"
  );
  const decryptedStoredPassword = decrypt(encryptedStoredPassword);

  const handleSubmit = () => {
    if (enteredPassword === decryptedStoredPassword) {
      onPasswordMatchCallback();
      sessionStorage.setItem("isAuthenticated", "true");
      window.location.hash = "/Home";
    } else {
      console.error("Incorrect Password");
    }
  };

  return {
    enteredPassword,
    setEnteredPassword,
    handleSubmit,
  };
};
