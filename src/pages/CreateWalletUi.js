import React from "react";
import {
  CenterBox,
  StyledBoxx,
  ActionsContainer,
  TypographyTitle,
  StyledLoginDialogBox,
  CenterBoxHome,
} from "../hooks/styles";
import {
  Button,
  Dialog,
  DialogTitle,
  Typography,
  TextField,
  CircularProgress,
  Box,
  Grid,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { CreateWallet } from "../components/createwallet";

export default function CreateWalletUI({ mode }) {
  const {
    showMnemonicPopup,
    setShowMnemonicPopup,
    mnemonic,
    verificationIndices,
    userInputWords,
    setUserInputWords,
    isBackdropOpen,
    tempMnemonic,
    create,
    closePopup,
    handleCloseDialog,
    handleInputChange,
  } = CreateWallet();
  const isPopup = mode === "popup";
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useTranslation();

  return (
    <Grid item container>
      <Box className="createPage">
        <Typography>{t("savePhrase")}</Typography>
        <Typography>{t("savePhraseWarning")}</Typography>
        <ActionsContainer>
          <Button variant="contained" onClick={create}>
            {t("generate")}
          </Button>
        </ActionsContainer>

        <Dialog
          open={showMnemonicPopup}
          onClose={handleCloseDialog}
          aria-labelledby="mnemonic-dialog-title"
        >
          <StyledLoginDialogBox>
            <DialogTitle id="mnemonic-dialog-title">{t("sPhrase")}</DialogTitle>
            <Typography>{tempMnemonic}</Typography>
            <Grid container direction="row">
              {verificationIndices.map((index) => (
                <Grid item key={index}>
                  <Box>
                    <Typography fontSize="12px">
                      {t("word")} {index + 1}
                    </Typography>
                    <TextField
                      type="password"
                      value={userInputWords[index] || ""}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Button variant="contained" onClick={closePopup}>
              {t("sPhraseSaved")}
            </Button>
          </StyledLoginDialogBox>
        </Dialog>
        <Backdrop open={isBackdropOpen}>
          <CircularProgress color="inherit" size={150} />
        </Backdrop>
      </Box>
    </Grid>
  );
}
