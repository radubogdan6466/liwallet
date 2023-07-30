import { styled } from "@mui/material/styles";
import { Grid, Box, TextField, DialogContent } from "@mui/material";
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

export const TypographyTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "",
  textAlign: "center",
  marginTop: "12px",
  marginBottom: "12px",
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
  padding: "30px",
  backgroundColor: "#d3d3d3", // Gri deschis pentru fundal
});
export const StyledDialogContent = styled(DialogContent)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: "400px",
});

export const StyledFormControl = styled(FormControl)({
  marginBottom: "15px", // Adaugă spațiu între input-uri
});

export const TransferDetailsBox = styled(Box)({
  backgroundColor: "#666666", // Gri pentru fundal
  color: "#ffffff", // Text alb
  borderRadius: "10px",
  padding: "20px",
  marginTop: "20px",
  textAlign: "left",
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
