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
} from "@mui/material";
import { Typography, Link as MuiLink, FormControl } from "@mui/material";
//import { CheckBox } from "@mui/icons-material";
import { Checkbox } from "@mui/material";

export const CenterBox = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    minWidth: "54vw",
  },
  [theme.breakpoints.up("md")]: {
    minWidth: "50vw",
    fontSize: "2rem",
  },
}));

//HOME
export const CenterBoxHome = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  //border: "1px solid red",

  //padding: theme.spacing(3),

  [theme.breakpoints.down("md")]: {
    minWidth: "52vw",
  },
  [theme.breakpoints.up("md")]: {
    minWidth: "58vw",
    fontSize: "2rem",
  },
}));

//  CenterBoxHome
export const ActionButton = styled(Button)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: 20,
  marginRight: 20,
  color: theme.palette.text.secondary,
  "& .MuiSvgIcon-root": {
    fontSize: 50,
  },
}));
export const TypographyTitle = styled(Typography)(({ theme }) => ({
  fontSize: 30,
  textAlign: "center",
  marginTop: "10px",
  marginBottom: "10px",
  [theme.breakpoints.up("600")]: {
    fontSize: "2rem",
  },
}));
export const TypographyTitleForm = styled(Typography)(({ theme }) => ({
  fontSize: 20,
  textAlign: "center",
  [theme.breakpoints.up("600")]: {
    fontSize: "2rem",
  },
}));
export const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
// create
export const StyledLoginDialogBox = styled(DialogContent)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});
//LOGINPAGE

export const StyledLoginBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const ActionsContainerLogin = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

//sendpage

// BEGIN NEW
export const DialogMain = styled(DialogContent)(({ theme }) => ({
  backgroundColor: theme.palette.background.light,

  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
}));
export const DialogContentSend = styled(DialogContent)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: 0,
  marginTop: 0,
  overflowX: "hidden",
});
export const InputLabelSend = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const AmountSendTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
  overflowX: "hidden",
  width: "225px",
  marginTop: "10px",
  borderColor: theme.palette.primary.icon,
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: theme.palette.primary.icon, // înlocuiește cu culoarea dorită
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.icon, // înlocuiește cu culoarea dorită
    },
  },
  "& .MuiOutlinedInput-root fieldset": {
    borderColor: theme.palette.primary.icon,
  },
}));
export const ToAdrsSendTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
  overflowX: "hidden",
  width: "225px",
  marginTop: "10px",
  borderColor: theme.palette.primary.icon,
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: theme.palette.primary.icon, // înlocuiește cu culoarea dorită
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.icon, // înlocuiește cu culoarea dorită
    },
  },
  "& .MuiOutlinedInput-root fieldset": {
    borderColor: theme.palette.primary.icon,
  },
}));

export const inputLabelPropsStyles = (theme) => ({
  color: theme.palette.primary.icon,
});

export const inputPropsStyles = (theme) => ({
  color: theme.palette.text.text,
});

export const GasCheckBox = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.primary.icon,
  "&.Mui-checked": {
    color: theme.palette.secondary.main,
  },
}));
export const StyledGasTextfield = styled(TextField)(({ theme }) => ({
  width: "125px",
  height: "56px",
  borderColor: theme.palette.primary.icon,
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: theme.palette.primary.icon,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.icon,
    },
  },
  "& .MuiOutlinedInput-root fieldset": {
    borderColor: theme.palette.primary.icon,
  },
}));
export const TransferDetailsBoxSendPage = styled(Box)(({ theme }) => ({
  textAlign: "center",
  fontSize: "12px",
  maxWidth: "222.4px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));
export const CheckButton = styled(Button)(({ theme }) => ({
  marginRight: "5px", // adaugă spațiu între butoane
  fontSize: "12px",
  width: "100px",

  backgroundColor: theme.palette.button.normal,
  color: theme.palette.button.textNormal,
  "&:hover": {
    backgroundColor: theme.palette.button.hover,
    color: theme.palette.button.textHover,
  },
}));
export const CheckedAddressButton = styled(Button)(({ theme }) => ({
  marginRight: "5px", // adaugă spațiu între butoane
  fontSize: "12px",
  width: "100px",

  backgroundColor: theme.palette.button.normal,
  color: theme.palette.button.textNormal,
  "&:hover": {
    backgroundColor: theme.palette.button.hover,
    color: theme.palette.button.textHover,
  },
}));
export const UncheckedAddressButton = styled(Button)(({ theme }) => ({
  marginRight: "5px", // adaugă spațiu între butoane
  fontSize: "12px",
  width: "100px",

  backgroundColor: theme.palette.button.normal,
  color: theme.palette.button.textNormal,
  "&:hover": {
    backgroundColor: theme.palette.button.hover,
    color: theme.palette.button.textHover,
  },
}));
//END NEW
export const StyledBoxx = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#d3d3d3", // Gri deschis pentru fundal
});
export const StyledDialogContent = styled(DialogContent)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});
export const StyledDialogSendContent = styled(DialogContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.background.light,
}));
export const StyledTextField = styled(TextField)({
  marginTop: "10px",
});

export const StyledFormControl = styled(FormControl)({});
//TransferDetails Page begin
export const TransferDetailsBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.TransferDetails,
  color: theme.palette.text.text,
  width: "225px",
  borderRadius: "15px", // margini rotunjite
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // umbră
  padding: theme.spacing(2), // spațiere internă
  "& > *": {
    marginBottom: theme.spacing(1), // spațiere între elemente
  },
}));
export const TypographyTrDetails = styled(Typography)(({ theme }) => ({
  color: theme.palette.transferDetails.icon,
  fontWeight: "bold",
}));
export const TypographyWarning = styled(Typography)(({ theme }) => ({
  color: theme.palette.transferDetails.warning,
  fontSize: "10px",
}));
export const TypographyAmountDetails = styled(Typography)(({ theme }) => ({
  color: theme.palette.transferDetails.dark,
  fontSize: "13px",
}));
export const TypographyTxDetails = styled(Typography)(({ theme }) => ({
  color: theme.palette.transferDetails.dark,
  fontSize: "13px",
}));
export const TypographyToDetails = styled(Typography)(({ theme }) => ({
  color: theme.palette.transferDetails.icon,
  fontSize: "13px",
}));
export const LinkTransferDetails = styled(MuiLink)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.transferDetails.dark,
  fontWeight: "bold",
}));
//TransferDetails Page end

export const DialogActionsCustomGas = styled(DialogContent)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "5px",
  width: "222.4px",
  marginTop: "10px",
});
export const DialogActionsCustomGasCheck = styled(DialogContent)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  margin: 0,
  padding: 0,
});

export const TypographyCustomGas = styled(Typography)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "10px",
});

//IMPORT    StyledGasTextfield

export const FormField = styled(TextField)({
  marginBottom: "10px",
  marginTop: "10px",
});

export const ActionsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const FormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
});
//createpassword
export const PasswordCreateBox = styled("grid")({
  backgroundColor: "#24272a", //gray
});

//ENTER PASSWORD PAGE:
export const GridLoginPassword = styled(Grid)(({ theme }) => ({
  //color: theme.palette.text.secondary,
  position: "relative",
  top: 0,
  left: 0,
  width: "337px",
  minHeight: "650px",
  height: "auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transform: "translateY(-10%)",
  "& .MuiInputBase-input": {
    color: theme.palette.text.secondary,
  },
}));
export const AvatarLoginPassword = styled(Avatar)({
  height: "200px",
  width: "200px",
  marginBottom: "0",
  paddingBottom: "0",
});
export const PassLoginFormField = styled(TextField)(({ theme }) => ({
  marginTop: "20px",
  borderColor: theme.palette.primary.icon,
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: theme.palette.primary.icon,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.icon,
    },
  },
  "& .MuiOutlinedInput-root fieldset": {
    borderColor: theme.palette.primary.icon,
  },
}));
export const LoginPassBtn = styled(Button)(({ theme }) => ({
  fontSize: "12px",
  width: "100px",
  marginTop: "20px",
  backgroundColor: theme.palette.button.normal,
  color: theme.palette.button.textNormal,
  "&:hover": {
    backgroundColor: theme.palette.button.hover,
    color: theme.palette.button.textHover,
  },
}));
export const TypographyLoginPass = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: "bold",
  fontSize: "25px",
}));
export const TypographySetupPass = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "10px",
  marginLeft: "10px",
  marginRight: "10px",
  justifyContent: "center",
}));
export const PassSetupFormField = styled(TextField)(({ theme }) => ({
  marginTop: "20px",
  borderColor: theme.palette.primary.icon,
  width: "80%",

  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: theme.palette.primary.icon,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.icon,
    },
  },
  "& .MuiOutlinedInput-root fieldset": {
    borderColor: theme.palette.primary.icon,
  },
}));
export const SetupPassBtn = styled(Button)(({ theme }) => ({
  fontSize: "12px",
  height: "small",
  width: "80%",

  marginTop: "20px",
  backgroundColor: theme.palette.button.normal,
  color: theme.palette.button.textNormal,
  "&:hover": {
    backgroundColor: theme.palette.button.hover,
    color: theme.palette.button.textHover,
  },
}));
