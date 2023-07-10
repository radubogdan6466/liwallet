import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { React, useEffect } from "react";
import Createwallet from "./Pages/createwallet";
import LoginWallet from "./Pages/loginwallet";
import Home from "./Pages/home";
import Sendeth from "./Pages/SendPage";
import Settings from "./Pages/settings";

function App() {
  useEffect(() => {
    document.body.style.backgroundColor = "#212121";
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/send" element={<Sendeth />} />
          <Route path="/" element={<Home />} />
          {/** <Route path="/home" element={<Home />} /> */}
          <Route path="/login" element={<LoginWallet />} />
          <Route path="/create" element={<Createwallet />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
