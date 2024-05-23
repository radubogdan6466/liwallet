// AppLogic.js
import { useState, useEffect } from "react";

export const AppLogic = () => {
  const [isPasswordSet, setIsPasswordSet] = useState(false);
  const [isPasswordMatched, setIsPasswordMatched] = useState(
    localStorage.getItem("passwordWasMatched") === "true"
  );

  useEffect(() => {
    const storedPassword = localStorage.getItem("B#V%VBbkgnucg842ui3v56BH#Vc");
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
    setIsPasswordSet(!!storedPassword);
    setIsPasswordMatched(isAuthenticated === "true");
  }, []);

  return {
    isPasswordSet,
    setIsPasswordSet,
    isPasswordMatched,
    setIsPasswordMatched,
  };
};
