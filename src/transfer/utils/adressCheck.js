// addressCheck.js

import { checkAddress } from "../../api/api.js";
import { handleError } from "../../hooks/errorHandler.js";

export const checkAddressBeforeTransfer = (toAddress) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkResult = await checkAddress(toAddress);
      let warningMessage = "";

      if (checkResult.isReported) {
        warningMessage += `Atenție! Această adresă a fost raportată.`;
        if (checkResult.details) {
          warningMessage += ` Detalii: ${checkResult.details}`;
        }
      } else {
        warningMessage = "Nu sunt detalii despre aceasta adresa";
      }
      resolve({ warningMessage, isAddressChecked: true });
    } catch (err) {
      const errorMessage = handleError(err);
      reject(errorMessage);
    }
  });
};
