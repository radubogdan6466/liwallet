import React, { useState, useEffect } from "react";
import { setupIonicReact } from "@ionic/react";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Actions from "./pages/Actions";
import SetPassword from "./appAccess/ui/setPassword.js";
import EnterPassword from "./appAccess/ui/enterPassword.js";
import CreateWalletUI from "./components/create/CreateWalletUi.js";
import CreateNewWallet from "./components/createNewWallet/createNewWallet.js";
import LoginWallet from "./components/Login/loginwallet";
import Home from "./pages/home.js";
import Settings from "./components/settings";
import ReportAddress from "./report/ReportAddress";
import { AppLogic } from "./appAccess/logic/appLogic.js";
import useLoading from "./hooks/useLoading.js";
// import CustomNetwork from "./components/CustomNetwork/CustomNetwork";
import "./App.css";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "./ionicTheme/variable.css";
function App() {
  setupIonicReact();

  const [isLoading, setIsLoading, LoadingIndicator] = useLoading(true, 1000);
  const {
    isPasswordSet,
    setIsPasswordSet,
    isPasswordMatched,
    setIsPasswordMatched,
  } = AppLogic();

  return isLoading ? (
    <LoadingIndicator />
  ) : !isPasswordSet ? (
    <SetPassword onPasswordSet={() => setIsPasswordSet(true)} />
  ) : !isPasswordMatched ? (
    <EnterPassword onPasswordMatch={() => setIsPasswordMatched(true)} />
  ) : (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Home" />} />
        <Route path="/connect" element={<EnterPassword />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/create" element={<CreateWalletUI />} />
        <Route path="/create/new" element={<CreateNewWallet />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<LoginWallet />} />
        <Route path="/report" element={<ReportAddress />} />
        {/* <Route path="/AddNetwork" element={<CustomNetwork />} /> */}
      </Routes>
    </HashRouter>
  );
}

export default App;
