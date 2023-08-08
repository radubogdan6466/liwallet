import React, { useState, useEffect } from "react";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import SetPassword from "./appAccess/setPassword.js";
import EnterPassword from "./appAccess/enterPassword.js";
import Createwallet from "./components/createwallet";
import LoginWallet from "./components/loginwallet";
import Home from "./components/home";
import Settings from "./components/settings";
import ReportAddress from "./report/ReportAddress";
import theme from "./theme/Theme"; // Importă tema creată
import "./App.css";

function App() {
  const [isPasswordSet, setIsPasswordSet] = useState(false);
  const [isPasswordMatched, setIsPasswordMatched] = useState(
    localStorage.getItem("passwordWasMatched") === "true"
  );
  useEffect(() => {
    const storedPassword = localStorage.getItem("userPassword");
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
    setIsPasswordSet(!!storedPassword);
    setIsPasswordMatched(isAuthenticated === "true");
  }, []);

  if (!isPasswordSet) {
    return <SetPassword onPasswordSet={() => setIsPasswordSet(true)} />;
  }

  if (!isPasswordMatched) {
    return <EnterPassword onPasswordMatch={() => setIsPasswordMatched(true)} />;
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/Home" />} />
          <Route path="/connect" element={<EnterPassword />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/create" element={<Createwallet />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<LoginWallet />} />
          <Route path="/report" element={<ReportAddress />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
