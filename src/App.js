import React, { useState, useEffect } from "react";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import SetPassword from "./appAccess/ui/setPassword.js";
import EnterPassword from "./appAccess/ui/enterPassword.js";
import Createwallet from "./components/createwallet";
import LoginWallet from "./components/loginwallet";
import Home from "./components/home";
import Settings from "./components/settings";
import ReportAddress from "./report/ReportAddress";
import theme from "./theme/Theme"; // Importă tema creată
import { AppLogic } from "./appAccess/logic/appLogic.js";
import "./App.css";

function App() {
  const {
    isPasswordSet,
    setIsPasswordSet,
    isPasswordMatched,
    setIsPasswordMatched,
  } = AppLogic();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!isPasswordSet ? (
        <SetPassword onPasswordSet={() => setIsPasswordSet(true)} />
      ) : !isPasswordMatched ? (
        <EnterPassword onPasswordMatch={() => setIsPasswordMatched(true)} />
      ) : (
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
      )}
    </ThemeProvider>
  );
}

export default App;
