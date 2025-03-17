// useGasPrice.js
import { useState, useEffect } from "react";
import { getGasPrice } from "../../hooks/gasPrice";

export const useGasPrice = (provider) => {
  const [gasPrice, setGasPrice] = useState("0");

  const updateGasPrice = async () => {
    const newGasPrice = await getGasPrice(provider);
    setGasPrice(newGasPrice);
  };

  useEffect(() => {
    updateGasPrice();
    const intervalId = setInterval(updateGasPrice, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return gasPrice;
};
