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

    return response.data; // return response to the caller
  } catch (error) {
    console.error("A apărut o eroare", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx

      return error.response;
    }
  }
};
export const checkAddress = async (address) => {
  try {
    const response = await axios.get(
      `https://busy-calf-earrings.cyclic.app/check/${address}`
    );
    return response.data; // return response to the caller
  } catch (error) {
    console.error("A apărut o eroare", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx

      return error.response;
    }
  }
};
