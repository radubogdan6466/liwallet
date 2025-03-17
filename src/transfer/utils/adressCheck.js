// addressCheck.js

import { checkAddress } from "../../api/api.js";
import { handleError } from "../../hooks/errorHandler.js";
import { useTranslation } from "react-i18next";

export const CheckAddressBeforeTransfer = (toAddress, t) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkResult = await checkAddress(toAddress);
      let warningMessage = "";

      if (checkResult.isReported) {
        warningMessage += t("warning.unsafeAddress");
        if (checkResult.details) {
          warningMessage += t("warning.details", {
            details: checkResult.details,
          });
        }
      } else {
        warningMessage = t("warning.noInformation");
      }

      resolve({ warningMessage, isAddressChecked: true });
    } catch (err) {
      const errorMessage = handleError(err, t); // Pasează t la handleError
      reject(errorMessage);
    }
  });
};
