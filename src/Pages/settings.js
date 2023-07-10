import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Settings() {
    const navigate = useNavigate();

    const gocreate = () =>{
        navigate("/create");
    }
    const gologin = () =>{
        navigate("/login");
    }
    const goSettings = () =>{
        navigate("/settings");
    }
    const goHome = () =>{
        navigate("/home");
    }
    const [showSecretKey, setShowSecretKey] =useState(false);
    const [showMnemonic, setShowMnemonic] = useState(false);
    return (
        <div className='settingsPage-container'>
        <div className="settingsPage-nav-container">
        <div className="settingsPage-dropdown">
            <button>Menu &#9662;</button>
            <div className="settingsPage-dropdown-content">
            <button onClick={gocreate}>Create</button>
            <button onClick={gologin}>Login</button>
            <button onClick={goSettings}>Settings</button>
            </div>
        </div>
        <button className="settingsPage-homeBtn" onClick={goHome}>Home</button>
        </div>
            <div className="settingsPage-showhide">
            <div className="settingsPage-settings-menu">
                {/* Toggle the visibility of the secret key when the button is clicked */}
                <button className="settingsPage-sc long-word" onClick={() => setShowSecretKey(!showSecretKey)}>
                    {showSecretKey ? "Hide" : "Show"} secret key
                </button>
                {/* Only display the secret key if the showSecretKey state is true */}
                {showSecretKey && <p className="key">{localStorage["pkey"]}</p>}
                <button className="settingsPage-rp" onClick={() => setShowMnemonic(!showMnemonic)}>
                    {showMnemonic ? "Hide" : "Show"} recovery phrase 
                </button>
                {showMnemonic && <p className="key">{localStorage["mnem"]}</p>}
            </div>
            </div>
        </div>
    );
}
