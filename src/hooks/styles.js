import { styled } from "@mui/material/styles";
import { Grid, Box, TextField, DialogContent, Button } from "@mui/material";
import { Typography, Link as MuiLink, FormControl } from "@mui/material";
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
  color: "white",
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
export const StyledTextField = styled(TextField)({
  marginTop: "10px",
});

export const DialogContentSend = styled(DialogContent)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
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
//IMPORT

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
