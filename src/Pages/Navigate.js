import React from "react";
import { useNavigate } from "react-router-dom";

const Meniu = () => {
  const navigate = useNavigate();

  const gocreate = () => {
    navigate("/create");
  };

  const gologin = () => {
    navigate("/login");
  };

  const goSettings = () => {
    navigate("/settings");
  };

  return (
    <div className="homePage-nav-container">
      <div className="homePage-dropdown">
        <button>Menu &#9662;</button>
        <div className="homePage-dropdown-content">
          <button className="nav-button" onClick={gocreate}>
            Create
          </button>
          <button className="nav-button" onClick={gologin}>
            Login
          </button>
          <button className="nav-button" onClick={goSettings}>
            Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Meniu;
