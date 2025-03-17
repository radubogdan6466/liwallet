import { styled } from "@mui/material/styles";
import {
  Grid,
  Box,
  TextField,
  DialogContent,
  Button,
  Dialog,
  InputLabel,
  Avatar,
  Menu,
  MenuItem,
  Switch,
} from "@mui/material";
import { Typography, Link as MuiLink, FormControl } from "@mui/material";
//import { CheckBox } from "@mui/icons-material";
import { Checkbox } from "@mui/material";

export const CenterBox = styled(Grid)(({ theme }) => ({}));

//HOME
export const CenterBoxHome = styled(Grid)(({ theme }) => ({}));

//  CenterBoxHome
export const ActionButton = styled(Button)(({ theme }) => ({}));
export const TypographyTitle = styled(Typography)(({ theme }) => ({}));
export const TypographyTitleForm = styled(Typography)(({ theme }) => ({}));
export const StyledBox = styled(Box)({});
// create
export const StyledLoginDialogBox = styled(DialogContent)({});
//LOGINPAGE
export const LoginFormField = styled(TextField)(({ theme }) => ({}));

export const StyledLoginBox = styled(Box)({});

export const ActionsContainerLogin = styled(Box)({});

//sendpage

// BEGIN NEW

export const DialogMain = styled(DialogContent)(({ theme }) => ({}));
export const DialogContentSend = styled(DialogContent)({
  marginLeft: 10,
  paddingLeft: 10,
  marginRight: 10,
  paddingRight: 10,
});
export const InputLabelSend = styled(InputLabel)(({ theme }) => ({}));

export const AmountSendTextField = styled(TextField)(({ theme }) => ({}));
export const ToAdrsSendTextField = styled(TextField)(({ theme }) => ({}));
//send input begin
export const inputLabelPropsStylesSend = (theme) => ({});

export const inputPropsStylesSend = (theme) => ({});
//send input end

export const inputLabelPropsStyles = (theme) => ({});

export const inputPropsStyles = (theme) => ({});

export const GasCheckBox = styled(Checkbox)(({ theme }) => ({}));
export const StyledGasTextfield = styled(TextField)(({ theme }) => ({}));
export const TransferDetailsBoxSendPage = styled(Box)(({ theme }) => ({}));
export const CheckButton = styled(Button)(({ theme }) => ({}));
export const CheckedAddressButton = styled(Button)(({ theme }) => ({}));
export const UncheckedAddressButton = styled(Button)(({ theme }) => ({}));
//END NEW
export const StyledBoxx = styled(Box)({});
export const StyledDialogContent = styled(DialogContent)({});

export const StyledTextField = styled(TextField)({});

export const StyledFormControl = styled(FormControl)({});
//TransferDetails Page begin
export const TransferDetailsBox = styled(Box)(({ theme }) => ({}));
export const TypographyTrDetails = styled(Typography)(({ theme }) => ({}));
export const TypographyWarning = styled(Typography)(({ theme }) => ({}));
export const TypographyAmountDetails = styled(Typography)(({ theme }) => ({}));
export const TypographyTxDetails = styled(Typography)(({ theme }) => ({}));
export const TypographyToDetails = styled(Typography)(({ theme }) => ({}));
export const LinkTransferDetails = styled(MuiLink)(({ theme }) => ({}));
//TransferDetails Page end

export const DialogActionsCustomGas = styled(DialogContent)({});
export const DialogActionsCustomGasCheck = styled(DialogContent)({});

export const TypographyCustomGas = styled(Typography)({});

//IMPORT    StyledGasTextfield

export const FormField = styled(TextField)({});

export const ActionsContainer = styled("div")({});

export const FormContainer = styled("form")({});
// TOKEN IMPORT SECTION UI
export const TypographyErrImport = styled(Typography)(({ theme }) => ({}));
export const TypographyTitleImport = styled(Typography)(({ theme }) => ({}));
export const MenuItemImport = styled(MenuItem)(({ theme }) => ({}));

export const DialogImportContent = styled(DialogContent)(({ theme }) => ({}));
export const FormImport = styled("form")(({ theme }) => ({}));
export const ImportBtn = styled(Button)(({ theme }) => ({}));
export const ImportFormField = styled(TextField)(({ theme }) => ({}));

//receive component
// dialog
//box
//typo
//typo
//typo
//qr code
//
export const ReceiveBox = styled(Box)(({ theme }) => ({}));
//navigate component
export const NavigateBox = styled(Box)(({ theme }) => ({}));
export const NavigateMenu = styled(Menu)(({ theme }) => ({
  // backgroundColor: theme.palette.primary.second,
}));
//report component

export const ReportFormField = styled(TextField)(({ theme }) => ({}));
//dark mode switch\
export const MaterialUISwitch = styled(Switch)(({ theme }) => ({}));
