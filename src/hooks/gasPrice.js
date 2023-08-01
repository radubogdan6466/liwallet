// gasPrice.js
import { useState, useEffect } from "react";
import { ethers } from "ethers";

export const GasPrice = (provider) => {
  const [gasPrice, setGasPrice] = useState(null);

  useEffect(() => {
    const fetchGasPrice = async () => {
      const gasPriceEstimate = await provider.getGasPrice();
      setGasPrice(ethers.utils.formatUnits(gasPriceEstimate, "gwei"));
    };

    if (!gasPrice) {
      fetchGasPrice();
    }
  }, [gasPrice, provider]);

  return [gasPrice, setGasPrice];
};
