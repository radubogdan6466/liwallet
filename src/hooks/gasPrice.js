// gasPrice.js
import { ethers } from "ethers";

export const getGasPrice = async (provider) => {
  try {
    const gasPriceEstimate = await provider.getGasPrice();
    return ethers.utils.formatUnits(gasPriceEstimate, "gwei");
  } catch (error) {
    console.error("Esuat la fetch gas price", error);
    return "0";
  }
};
