import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";

import Createwallet from "./components/createwallet";
import LoginWallet from "./components/loginwallet";
import Home from "./components/home";
//import Sendeth from "./components/SendPage"; // dacă dorești să incluzi aceasta
import Settings from "./components/settings";
import ReportAddress from "./report/ReportAddress";
import theme from "./theme/Theme"; // Importă tema creată
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
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
