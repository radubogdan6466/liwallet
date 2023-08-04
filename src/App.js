import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { React } from "react";
import Createwallet from "./components/createwallet";
import LoginWallet from "./components/loginwallet";
import Home from "./components/home";
//import Sendeth from "./Pages/SendPage";
import Settings from "./components/settings";
import ReportAddress from "./report/ReportAddress";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Box } from "@mui/material";
import theme from "./theme/Theme"; // Importă tema creată

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Createwallet />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<LoginWallet />} />
          {/** <Route path="/send" element={<Sendeth />} />*/}
          <Route path="/report" element={<ReportAddress />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
