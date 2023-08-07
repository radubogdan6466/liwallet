import { styled } from "@mui/material/styles";
import {
  Grid,
  Box,
  TextField,
  DialogContent,
  Button,
  Dialog,
} from "@mui/material";
import { Typography, Link as MuiLink, FormControl } from "@mui/material";
import { CheckBox } from "@mui/icons-material";
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
export const StyledDialogSendContent = styled(DialogContent)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});
export const StyledTextField = styled(TextField)({
  marginTop: "10px",
});

export const DialogContentSend = styled(DialogContent)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: 0,
  marginTop: 0,
});
export const StyledFormControl = styled(FormControl)({});

export const TransferDetailsBox = styled(Box)({
  backgroundColor: "#666666", // Gri pentru fundal
  color: "#ffffff", // Text alb
  textAlign: "center",
});

export const Link = styled(MuiLink)({
  textDecoration: "none", // Fără text decoration pentru link-uri
});

export const DialogActionsCustomGas = styled(DialogContent)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "5px",
});
export const DialogActionsCustomGasCheck = styled(DialogContent)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  margin: 0,
  padding: 0,
});

export const StyledGasTextfield = styled(TextField)({
  width: "125px",
  height: "56px",
});
export const TypographyCustomGas = styled(Typography)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});
export const CheckboxCustomGas = styled(CheckBox)({
  fontSize: 30,
  textAlign: "center",
  marginTop: "10px",
  marginBottom: "10px",
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
