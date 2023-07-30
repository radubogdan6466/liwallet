import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { React } from "react";
import Createwallet from "./Pages/createwallet";
import LoginWallet from "./Pages/loginwallet";
import Home from "./Pages/home";
//import Sendeth from "./Pages/SendPage";
import Settings from "./Pages/settings";
import ReportAddress from "./report/ReportAddress";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginWallet />} />
          <Route path="/create" element={<Createwallet />} />
          <Route path="/settings" element={<Settings />} />
          {/**
           *           <Route path="/send" element={<Sendeth />} />
           *
           *
           *
           */}

          <Route path="/report" element={<ReportAddress />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
