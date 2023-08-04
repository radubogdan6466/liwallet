import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  palette: {
    primary: {
      main: "#bdbdbd", //gray
      icon: "#9c27b0", //icons color
    },
    text: {
      main: "#9c27b0", // Blue color -
      secondary: "#ffffff", // White color
      popup: "#9e9e9e", //
      span: "#bdbdbd",
      input: "#000000",
      text: "#000000",
    },
    background: {
      light: "#f3e5f5",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    transferDetails: {
      light: "#f3e5f5",
      main: "#3f50b5",
      dark: "#000000",
      contrastText: "#fff",
    },
  },
});

export default Theme;
