/** 
import React from 'react'
import "./pages.css"
import  {Wallet, ethers} from 'ethers';
import { useNavigate } from 'react-router-dom'
let k1, k2, k3, k4, k5, k6, k7, k8, k9, k10, k11, k12;


export default function LoginWallet() {
    let navigate = useNavigate();
    const create = () =>{
        k1 = document.getElementById("1").value;
        k2 = document.getElementById("2").value;
        k3 = document.getElementById("3").value;
        k4 = document.getElementById("4").value;
        k5 = document.getElementById("5").value;
        k6 = document.getElementById("6").value;
        k7 = document.getElementById("7").value;
        k8 = document.getElementById("8").value;
        k9 = document.getElementById("9").value;
        k10 = document.getElementById("10").value;
        k11 = document.getElementById("11").value;
        k12 = document.getElementById("12").value;

       let wordlists = `${k1} ${k2} ${k3} ${k4} ${k5} ${k6} ${k7} ${k8} ${k9} ${k10} ${k11} ${k12}`
       let userWallet = ethers.Wallet.fromMnemonic(wordlists)
        //console.log(wordlists);
        localStorage.setItem("pkey", userWallet.privateKey)
        navigate("/home")
    }
    

  return (
    <div className='flex flex-col min-h-screen'>
        <main className='container mx-auto w-screen h-screen lg:max-w-screen-lg flex-1'>
            <div className='shadow-md shadow-slate-200 content-center flex-row items-center justify-center'> 
                <div className="kk-container">
                    <div className="my-17 flex py-2 px-4">
                        <div className="flex-row flex=center lg:flex items-center flex-center p-2">
                            <input id="1" value={k1} className="inputfields placeholder-gray-700"  placeholder="1" type={"text"}/>
                        </div>
                        <div className="flex-row flex=center lg:flex items-center flex-center p-2">
                            <input id="2" value={k2} className="inputfields placeholder-gray-700"  placeholder="2" type={"text"}/>
                        </div>
                        <div className="flex-row flex=center lg:flex items-center flex-center p-2">
                            <input id="3" value={k3} className="inputfields placeholder-gray-700"  placeholder="3" type={"text"}/>
                        </div>
                        <div className="flex-row flex=center lg:flex items-center flex-center p-2">
                            <input id="4" value={k4} className="inputfields placeholder-gray-700"  placeholder="4" type={"text"}/>
                        </div>
                    </div>
                    <div className="my-17 flex py-2 px-4">
                        <div className="flex-row flex=center lg:flex items-center flex-center p-2">
                            <input id="5" value={k5} className="inputfields placeholder-gray-700"  placeholder="5" type={"text"}/>
                        </div>
                        <div className="flex-row flex=center lg:flex items-center flex-center p-2">
                            <input id="6" value={k6} className="inputfields placeholder-gray-700"  placeholder="6" type={"text"}/>
                        </div>
                        <div className="flex-row flex=center lg:flex items-center flex-center p-2">
                            <input id="7" value={k7} className="inputfields placeholder-gray-700"  placeholder="7" type={"text"}/>
                        </div>
                        <div className="flex-row flex=center lg:flex items-center flex-center p-2">
                            <input id="8" value={k8} className="inputfields placeholder-gray-700"  placeholder="8" type={"text"}/>
                        </div>
                        
                    </div>
                    <div className="my-17 flex py-2 px-4">
                        <div className="flex-row flex=center lg:flex items-center flex-center p-2">
                            <input id="9" value={k9} className="inputfields placeholder-gray-700"  placeholder="9" type={"text"}/>
                        </div>
                        <div className="flex-row flex=center lg:flex items-center flex-center p-2">
                            <input id="10" value={k10} className="inputfields placeholder-gray-700"  placeholder="10" type={"text"}/>
                        </div>
                        <div className="flex-row flex=center lg:flex items-center flex-center p-2">
                            <input id="11" value={k11} className="inputfields placeholder-gray-700"  placeholder="11" type={"text"}/>
                        </div>
                        <div className="flex-row flex=center lg:flex items-center flex-center p-2">
                            <input id="12" value={k12} className="inputfields placeholder-gray-700"  placeholder="12" type={"text"}/>
                        </div>
                        
                    </div>
                    <button onClick={create} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Create Wallet</button>
                </div>
            </div>
        </main>
    </div>
  )
}
*/
/** 
import React, { useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

export default function LoginWallet() {
  const [mnemonic, setMnemonic] = useState([]);
  const navigate = useNavigate();

  const create = () => {
    const wordlists = mnemonic.join(" ");
    const userWallet = ethers.Wallet.fromMnemonic(wordlists);
    localStorage.setItem("pkey", userWallet.privateKey);
    navigate("/home");
  };

  const handleMnemonicChange = (event, index) => {
    const updatedMnemonic = [...mnemonic];
    updatedMnemonic[index] = event.target.value;
    setMnemonic(updatedMnemonic);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="container mx-auto w-screen h-screen lg:max-w-screen-lg flex-1">
        <div className="shadow-md shadow-slate-200 content-center flex-row items-center justify-center">
          <div className="kk-container">
            {[0, 1, 2].map((row) => (
              <div key={row} className="my-17 flex py-2 px-4">
                {[0, 1, 2, 3].map((col) => (
                  <div key={row * 4 + col} className="flex-row flex=center lg:flex items-center flex-center p-2">
                    <input
                      id={row * 4 + col}
                      value={mnemonic[row * 4 + col] || ""}
                      className="inputfields placeholder-gray-700"
                      placeholder={row * 4 + col + 1}
                      type="text"
                      onChange={(event) => handleMnemonicChange(event, row * 4 + col)}
                    />
                  </div>
                ))}
              </div>
            ))}
            <button onClick={create} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Login
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
*/
//private key login
import "../App.css";

import React, { useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

export default function LoginWallet() {
  const [privateKey, setPrivateKey] = useState("");
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

const Login = () => {
  try {
    const userWallet = new ethers.Wallet(privateKey);
    localStorage.setItem("pkey", userWallet.privateKey);
    navigate("/home");
  } catch (error) {
    // Handler de eroare
    console.error("Error, try again:", error);
    // Poți trata eroarea în modul dorit, de exemplu, afișând un mesaj de eroare sau redirectionând către o pagină de eroare
  }
};

  const handlePrivateKeyChange = (event) => {
    setPrivateKey(event.target.value);
  };

  return (
    <div className="LoginPage-page-container">
    <div className="LoginPage-nav-container">
      <div className="LoginPage-dropdown">
        <button>Menu &#9662;</button>
        <div className="LoginPage-dropdown-content">
          <button onClick={gocreate}>Create</button>
          <button onClick={gologin}>Login</button>
          <button onClick={goSettings}>Settings</button>
        </div>
      </div>
      <button className="LoginPage-homeBtn" onClick={goHome}>Home</button>
    </div>
    <div className='LoginPage-content-container'>
      <div className="LoginPage-InputBox">
        <input
          id="privateKey"
          value={privateKey}
          placeholder="Enter private key"
          type="password"
          onChange={handlePrivateKeyChange}
        />
      </div>
      <button onClick={Login}  className="LoginPage-btn">
        Login
      </button>
    </div>
  </div>
  

  );
}
