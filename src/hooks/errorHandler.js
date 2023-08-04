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
        "Eroare la estimarea gazului. Poate fi necesară setarea manuală a limitelor.";
      break;
    case "INSUFFICIENT_FUNDS":
      message = "Fonduri insuficiente";
      break;
    case "NUMERIC_FAULT":
      message = "Incorrect decimals";
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
/**
 * 
 * 
 * de adaugat eroarea asta:
 * 
 * useTransaction.js:138 Error: fractional component exceeds decimals [ See: https://links.ethers.org/v5-errors-NUMERIC_FAULT ] (fault="underflow", operation="parseFixed", code=NUMERIC_FAULT, version=bignumber/5.7.0)
    at Logger.makeError (index.ts:269:1)
    at Logger.throwError (index.ts:281:1)
    at throwFault (fixednumber.ts:19:1)
    at parseFixed (fixednumber.ts:104:1)
    at Module.parseUnits (index.ts:80:1)
    at transferToken (useTransaction.js:79:1)
 */
