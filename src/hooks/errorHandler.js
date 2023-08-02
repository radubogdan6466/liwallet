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
  switch (error.code) {
    case "UNPREDICTABLE_GAS_LIMIT":
      message =
        "Estimarea gazului a eșuat. Această tranzacție poate necesita un limită manuală a gazului.";
      break;
    default:
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
        case "insufficient_funds":
          message =
            "Nu ai suficiente fonduri pentru a efectua această tranzacție.";
          break;
        case "CALL_EXCEPTION":
          message = "Adresa incorecta pentru chain-ul selectat";
          break;
        case "UNPREDICTABLE_GAS_LIMIT":
          message = "Nu se poate estime Gas, introdu manual.";
          break;
        default:
          message = "A apărut o eroare. Te rugăm să încerci din nou.";
          break;
      }
      break;
  }

  return message;
};
