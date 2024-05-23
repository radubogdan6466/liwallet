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
export const handleError = (error, t) => {
  let message;
  switch (error.code) {
    case "UNPREDICTABLE_GAS_LIMIT":
      message = "error.unpredictableGasLimit";
      break;
    case "INSUFFICIENT_FUNDS":
      message = "error.insufficientFunds";
      break;
    case "NUMERIC_FAULT":
      message = "error.numericFault";
      break;
    case " INVALID_ARGUMENT":
      message = "error.invalidValue";
      break;
    default:
      switch (error.message) {
        case "invalid_address":
          message = "error.invalidAddress";
          break;
        case "invalid_value":
          message = "error.invalidValue";
          break;
        case "gas_price_too_low":
          message = "error.gasPriceTooLow";
          break;
        case "insufficient_funds":
          message = "error.insufficientFunds";
          break;
        case "CALL_EXCEPTION":
          message = "error.callException";
          break;
        case "UNPREDICTABLE_GAS_LIMIT":
          message = "error.unpredictableGasLimit";
          break;
        case " INVALID_ARGUMENT":
          message = "error.invalidValue";
          break;
        default:
          message = "error.generic";
          break;
      }
      break;
  }

  return t(message);
};
