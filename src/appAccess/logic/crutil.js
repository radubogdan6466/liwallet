// CryptoUtils.js
import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.REACT_APP_SET_KEY; // Key from .env file

export const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const decrypt = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
