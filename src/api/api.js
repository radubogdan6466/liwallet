import axios from "axios";

export const reportAddress = async (address, details) => {
  try {
    const response = await axios.post(
      "https://busy-calf-earrings.cyclic.app/report",
      {
        address: address,
        details: details,
      }
    );

    return response.data;
  } catch (error) {
    console.error("A apărut o eroare", error);
    if (error.response) {
      return error.response;
    }
  }
};
export const checkAddress = async (address) => {
  try {
    const response = await axios.get(
      `https://busy-calf-earrings.cyclic.app/check/${address}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
  }
};
