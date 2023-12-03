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
} from "@mui/material";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useTranslation } from "react-i18next";
import {
  StyledFormControl,
  StyledDialogSendContent,
  DialogContentSend,
  DialogMain,
  InputLabelSend,
  AmountSendTextField,
  inputLabelPropsStylesSend,
  inputPropsStylesSend,
  ToAdrsSendTextField,
  TransferDetailsBoxSendPage,
  CheckButton,
  CheckedAddressButton,
  UncheckedAddressButton,
  TypographyWarning,
} from "../hooks/styles.js";
import { getTokens, NativToken } from "./utils/chain.js";
import TransferDetails from "../hooks/TransferDetails.js";
import { useTheme } from "@mui/material/styles";
import calculateTransactionFee from "./utils/calculateTransactionFee";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { display } from "@mui/system";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function FullScreenDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}
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
  } = useTransaction(selectedTokenState, selectedChain, t);
  //andr        0xEC76CFF0C4992629f7Aa533BECc2783B9d420E68
  const closePopup = () => {
    onClose();
  };

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

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={closePopup}
      TransitionComponent={Transition}
      sx={{
        position: "fixed",
        top: "64px",
        background: "rgba(29, 35, 41)", // Change to 'red' for example to make it more visible
        "& .MuiPaper-root": {
          background: "rgba(29, 35, 41)", // Change to 'red' for example to make it more visible
        },
      }}
    >
      <AppBar sx={{ position: "relative", height: "64px" }}>
        <Button
          autoFocus
          //color="secondary"
          onClick={closePopup}
          sx={{ position: "center", height: "64px", color: "#f2f2f2" }}
        >
          Close
        </Button>
      </AppBar>
      <DialogMain>
        <DialogContentSend>
          <div>
            <Typography
              sx={{ textAlign: "center", color: "#f2f2f2" }}
              variant="h4"
            >
              {selectedTokenState}
            </Typography>
          </div>
          <div style={{ display: "flex" }}>
            <Typography sx={{ textAlign: "center", color: "#f2f2f2" }}>
              Balance:
              {selectedTokenBalance ? selectedTokenBalance.balance : ethBalance}
            </Typography>
          </div>
          <div style={{ justifyContent: "center" }}>
            <div>
              <AmountSendTextField
                id="val"
                placeholder={t("amountPlaceholder")}
                required
                size="small"
                InputLabelProps={{ style: inputLabelPropsStylesSend(theme) }}
                inputProps={{
                  style: {
                    color: "#f2f2f2", // Culoarea textului
                    backgroundColor: "rgba(29, 35, 41)", // Culoarea de fundal
                    // Alte proprietăți de stil
                  },
                }}
                sx={{ marginTop: "10px", marginBottom: "10px", width: "170px" }}
              />
              <Button
                variant="text"
                size="small"
                color="success"
                onClick={handleMaxAmountClick}
                cursor="pointer"
                sx={{
                  fontWeight: "bold",
                  marginTop: "10px",
                  color: "#f2f2f2",
                }}
              >
                {t("Use max")}
              </Button>
            </div>

            <ToAdrsSendTextField
              id="toadrs"
              required
              size="small"
              placeholder={t("sendToPlaceholder")}
              InputLabelProps={{ style: inputLabelPropsStylesSend(theme) }}
              inputProps={{
                style: {
                  color: "#f2f2f2", // Culoarea textului
                  backgroundColor: "rgba(29, 35, 41)", // Culoarea de fundal
                  // Alte proprietăți de stil
                },
              }}
              sx={{ marginTop: "10px", marginBottom: "10px", width: "250px" }}
              onChange={(e) => {
                const address = e.target.value;
                setIsValidAddress(ethers.utils.isAddress(address));
              }}
            />
          </div>
          <Typography variant="caption" sx={{ color: "#f2f2f2" }}>
            {/* Adaugă restul codului pentru dialogul detaliat */}
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
            {t("gasPrice")} {gasPrice}
          </Typography>
          <Typography variant="caption" sx={{ color: "#f2f2f2" }}>
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
            {Number(transactionFee).toFixed(8)}
          </Typography>

          <TransferDetailsBoxSendPage>
            <TypographyWarning> {warningMessage}</TypographyWarning>
            {transferDetails && <TransferDetails details={transferDetails} />}
          </TransferDetailsBoxSendPage>
        </DialogContentSend>
        <StyledDialogSendContent>
          {showCheckButton && (
            <CheckButton
              variant="contained"
              size="small"
              onClick={handleAddressCheck}
              disabled={!isValidAddress}
            >
              {t("checkAddress")}
            </CheckButton>
          )}
          {addressChecked && (
            <CheckedAddressButton
              variant="contained"
              onClick={transferToken}
              size="small"
              disabled={!isValidAddress}
            >
              {t("sendToken")} {selectedTokenState}
            </CheckedAddressButton>
          )}
          <UncheckedAddressButton
            variant="contained"
            color="error"
            onClick={transferToken}
            size="small"
            disabled={!isValidAddress}
          >
            {t("sendToken")} {selectedTokenState}
          </UncheckedAddressButton>
        </StyledDialogSendContent>
      </DialogMain>
    </Dialog>
  );
};
export default Send;
