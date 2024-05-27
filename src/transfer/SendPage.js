import React, { useEffect, useState } from "react";
import { useTransaction } from "./utils/useTransaction";
import { ethers } from "ethers";
import {
  Dialog,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  Box,
} from "@mui/material";
import TransferDetailsDialog from "./utils/TransferDetailsDialog";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useTranslation } from "react-i18next";
import {
  StyledDialogSendContent,
  DialogContentSend,
  DialogMain,
  AmountSendTextField,
  inputLabelPropsStylesSend,
  ToAdrsSendTextField,
  TransferDetailsBoxSendPage,
  CheckButton,
  CheckedAddressButton,
  UncheckedAddressButton,
  TypographyWarning,
  gasBoxSendPage,
  TypographyErrImport,
  CenterBox,
} from "../hooks/styles.js";
import { getTokens, NativToken } from "./utils/chain.js";
import { useTheme } from "@mui/material/styles";
import calculateTransactionFee from "./utils/calculateTransactionFee";
import AppBar from "@mui/material/AppBar";
import Slide from "@mui/material/Slide";
import { addTransaction } from "./utils/localStorageService"; // Importă funcția
import { color } from "@mui/system";
import "./SendPage.css";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Send = ({
  onClose,
  selectedToken,
  selectedChain,
  selectedTokenBalance,
  ethBalance,
}) => {
  const theme = useTheme();
  const [selectedTokenState, setSelectedTokenState] = useState(selectedToken);
  const gasLimit = ethers.BigNumber.from(21000);
  const [transactionFee, setTransactionFee] = useState("0");
  const [nativeCurrencySymbol, setNativeCurrencySymbol] = useState("ETH");
  const { t } = useTranslation();
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [open, setOpen] = React.useState(true);
  const [openTooltips, setOpenTooltips] = useState({
    gasPrice: false,
    transactionFee: false,
  });
  const [isDetailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [error, setError] = useState("");

  const handleTooltipClick = (name) => {
    setOpenTooltips({
      ...openTooltips,
      [name]: !openTooltips[name],
    });
    setTimeout(() => {
      setOpenTooltips({
        ...openTooltips,
        [name]: false,
      });
    }, 2000);
  };
  const {
    transferDetails,
    addressChecked,
    showCheckButton,
    warningMessage,
    handleAddressCheck,
    transferToken,
    gasPrice,
    buttonText,
  } = useTransaction(selectedTokenState, selectedChain, t);
  const closePopup = () => {
    setOpen(false); // Close the modal
    onClose();
  };
  // console.log(
  //   "detalii transfer",
  //   "cantitate",
  //   transferDetails.amount,
  //   "chain",
  //   transferDetails.chain,
  //   "gasPrice",
  //   transferDetails.gasPrice,
  //   "toAddress",
  //   transferDetails.toAddress,
  //   "token",
  //   transferDetails.token,
  //   "",
  //   transferDetails.txHash
  // );

  useEffect(() => {
    const tokens = getTokens(selectedChain);
    if (!tokens.some((token) => token.symbol === selectedTokenState)) {
      setSelectedTokenState(tokens[0].symbol);
    }
  }, [selectedChain, selectedTokenState]);

  useEffect(() => {
    const fee = calculateTransactionFee(gasPrice, gasLimit);
    setTransactionFee(fee);
  }, [gasPrice]);
  useEffect(() => {
    const newNativeCurrencySymbol = NativToken(selectedChain);
    setNativeCurrencySymbol(newNativeCurrencySymbol);

    const tokens = getTokens(selectedChain);
    if (!tokens.some((token) => token.symbol === selectedTokenState)) {
      setSelectedTokenState(tokens[0].symbol);
    }
  }, [selectedChain, selectedTokenState]);
  // Funcție pentru setarea valorii maxime în caseta pentru suma
  const handleMaxAmountClick = () => {
    // Verificăm dacă avem informații despre balanță și setăm valoarea corespunzătoare
    if (selectedTokenBalance) {
      document.getElementById("val").value =
        selectedTokenBalance.balance.toString();
    } else {
      document.getElementById("val").value = ethBalance;
    }
  };
  function formatBalance(balance) {
    const num = parseFloat(balance);
    if (Number.isNaN(num)) {
      return balance; // Dacă nu este un număr valid, returnează valoarea originală
    }
    const fixedNum = num.toFixed(5);
    const formattedNum = parseFloat(fixedNum).toString();
    return formattedNum;
  }
  useEffect(() => {
    if (transferDetails) {
      setDetailsDialogOpen(true);
    }
  }, [transferDetails]);
  return (
    <Dialog
      className="SendDialogTransfer"
      fullScreen
      open={open}
      onClose={closePopup}
      TransitionComponent={Transition}
      sx={{
        "& .MuiPaper-root": {
          background:
            "linear-gradient(90deg, rgba(6, 7, 9, 0.5), rgba(23, 9, 34, 0.5))",
        },
      }}
    >
      <DialogMain
        className="SendDialogTransfer"
        sx={{
          position: "sticky",
          height: "90%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <div className="secmainHome">
          <div style={{ textAlign: "center" }}>
            <Typography
              sx={{ textAlign: "center", color: "#f2f2f2", fontSize: "16px" }}
            >
              Sending: {}
              {selectedTokenState}
            </Typography>
          </div>
          <div style={{ textAlign: "center" }}>
            <Typography
              sx={{ textAlign: "center", color: "#f2f2f2", fontSize: "16px" }}
            >
              Balance:{" "}
              {selectedTokenBalance
                ? formatBalance(selectedTokenBalance.balance)
                : formatBalance(ethBalance)}
            </Typography>{" "}
          </div>
          {/*  */}
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ position: "relative" }}>
                <AmountSendTextField
                  id="val"
                  placeholder={t("amountPlaceholder")}
                  required
                  color="success"
                  InputLabelProps={{ style: inputLabelPropsStylesSend(theme) }}
                  inputProps={{
                    style: {
                      fontSize: "10px",

                      color: "#f2f2f2", // Culoarea textului
                      backgroundColor: "rgba(29, 35, 41)",
                      "&:focus": {
                        borderColor: "#38ef7d",
                      },
                    },
                  }}
                  sx={{
                    marginTop: "10px",
                    marginBottom: "10px",
                    width: "275px",
                    "& input:focus": {
                      borderColor: "#38ef7d",
                    },
                    "& fieldset": {
                      borderColor: "#38ef7d",
                    },
                  }}
                />
                <Button
                  variant="text"
                  size="large"
                  onClick={handleMaxAmountClick}
                  cursor="pointer"
                  sx={{
                    fontSize: "11px",
                    position: "absolute",
                    right: 0,
                    marginTop: "20px",
                    color: "#f2f2f2",
                  }}
                >
                  {t("Use max")}
                </Button>
              </div>
            </div>

            <ToAdrsSendTextField
              id="toadrs"
              required
              color="success"
              placeholder={t("sendToPlaceholder")}
              InputLabelProps={{ style: inputLabelPropsStylesSend(theme) }}
              inputProps={{
                style: {
                  color: "#f2f2f2", // Culoarea textului
                  backgroundColor: "rgba(29, 35, 41)",
                  fontSize: "10px",
                },
              }}
              sx={{
                marginTop: "10px",
                marginBottom: "10px",
                width: "275px",
                "& input:focus": {
                  borderColor: "#38ef7d",
                },
                "& fieldset": {
                  borderColor: "#38ef7d",
                },
              }}
              onChange={(e) => {
                const address = e.target.value;
                setIsValidAddress(ethers.utils.isAddress(address));
              }}
            />
          </div>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Typography
              variant="caption"
              sx={{ color: "#f2f2f2", fontSize: "8px" }}
            >
              <Tooltip
                title={t("gasPriceTooltip")}
                open={openTooltips.gasPrice}
                sx={{ color: "#f2f2f2" }}
              >
                <IconButton
                  size="small"
                  style={{ marginLeft: 4 }}
                  onClick={() => handleTooltipClick("gasPrice")}
                >
                  <InfoOutlinedIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
              {t("gasPrice")} {Number(gasPrice).toFixed(6)}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#f2f2f2", fontSize: "8px" }}
            >
              <Tooltip
                sx={{ color: "#f2f2f2" }}
                title={t("transactionFeeTooltip")}
                open={openTooltips.transactionFee}
              >
                <IconButton
                  size="small"
                  style={{ marginLeft: 4 }}
                  onClick={() => handleTooltipClick("transactionFee")}
                >
                  <InfoOutlinedIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
              {t("transactionFee")} {nativeCurrencySymbol}:
              {Number(transactionFee).toFixed(6)}
            </Typography>
          </Box>

          {/* <TransferDetailsBoxSendPage>
            <TypographyWarning> {warningMessage}</TypographyWarning>
            {transferDetails && <TransferDetails details={transferDetails} />}
          </TransferDetailsBoxSendPage> */}

          {/* <p style={{ color: "#ffffff" }}>
            Adresa raportata pentru Fake Investment
          </p> */}
        </div>
        <div className="transfer-dial">
          <TransferDetailsDialog
            open={isDetailsDialogOpen}
            onClose={() => setDetailsDialogOpen(false)}
            transferDetails={transferDetails}
            warningMessage={warningMessage}
          />
          <button
            variant="contained"
            color="error"
            onClick={transferToken}
            size="small"
            disabled={!isValidAddress}
            className="send-btn"
          >
            {buttonText}
          </button>
          {error && (
            <TypographyErrImport
              sx={{
                backgroundColor: "rgba(29, 35, 41)",
                color: "red",
                "& input:focus": {
                  borderColor: "#38ef7d",
                },
                "& fieldset": {
                  borderColor: "#38ef7d",
                },
              }}
            >
              {error}
            </TypographyErrImport>
          )}
          <TypographyWarning sx={{ color: "red", display: "center" }}>
            {warningMessage}
            {/* {(console.log(warningMessage), warningMessage)} */}
          </TypographyWarning>
        </div>
      </DialogMain>
      <AppBar sx={{ position: "relative", height: "64px" }}>
        <Button
          autoFocus
          //color="secondary"
          onClick={closePopup}
          sx={{
            position: "center",
            height: "64px",
            color: "red",
            fontWeight: "bold",
          }}
        >
          Close
        </Button>
      </AppBar>
    </Dialog>
  );
};
export default Send;
