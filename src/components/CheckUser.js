import React from "react";
import { useNavigate } from "react-router-dom";

const CheckUser = ({ handleLogin, handleCreate }) => {
  const navigate = useNavigate();

  const gocreate = () => {
    navigate("/create");
  };
  const gologin = () => {
    navigate("/login");
  };
  return (
    <div className="Loading-container">
      <div className="Loading-content">
        Looks like you're not connected with any address
        <br />
        <button className="Loading-btn-login" onClick={gologin}>
          Press here to login
        </button>
        <p className="text-3xl font-bold underline">Or</p>
        <button className="Loading-btn-create" onClick={gocreate}>
          Create a new wallet
        </button>
      </div>
    </div>
  );
};

export default CheckUser;
