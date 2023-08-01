export function handleAsyncError(func) {
  return async (...args) => {
    try {
      const result = await func(...args);
      return [null, result];
    } catch (error) {
      console.error(error);
      return [error, null];
    }
  };
}
export const handleError = (error) => {
  let message;
  switch (error.message) {
    case "invalid_address":
      message = "Adresa introdusă nu este validă.";
      break;
    case "invalid_value":
      message = "Valoarea introdusă nu este validă.";
      break;
    case "gas_price_too_low":
      message = "Prețul gazului este prea mic.";
      break;
    default:
      message = "A apărut o eroare. Te rugăm să încerci din nou.";
      break;
  }

  return message;
};
