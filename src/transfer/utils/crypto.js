import CryptoJS from "crypto-js";

const secretKey = process.env.REACT_APP_SECRET_KEY;

export const getDecryptedPrivateKey = () => {
  const encryptedPrivateKey = localStorage.getItem("pkey");
  const bytes = CryptoJS.AES.decrypt(encryptedPrivateKey, secretKey);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);

  return originalText;
};
