import { ethers } from "ethers";

const calculateTransactionFee = (gasPriceInGwei, gasLimit) => {
  const gasPriceInWei = ethers.utils.parseUnits(gasPriceInGwei || "0", "gwei");
  const fee = gasPriceInWei.mul(gasLimit);
  return ethers.utils.formatUnits(fee, "ether");
};

export default calculateTransactionFee;
