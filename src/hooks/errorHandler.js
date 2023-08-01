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
  // Aici poți avea o logică complexă de gestionare a erorilor
  // În acest exemplu, presupunem că error este un string care descrie eroarea
  let message;
  switch (error) {
    case "invalid_address":
      message = "Adresa introdusă nu este validă.";
      break;
    case "invalid_value":
      message = "Valoarea introdusă nu este validă.";
      break;
    default:
      message = "A apărut o eroare. Te rugăm să încerci din nou.";
      break;
  }

  return message;
};
