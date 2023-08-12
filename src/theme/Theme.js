import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  palette: {
    primary: {
      main: "#bdbdbd", //gray
      icon: "#9c27b0", //icons color
      home: "#24272a", //principal
      second: "#212121",
      TransferDetails: "#f3e5f5",
    },
    text: {
      main: "#9c27b0", // Blue color -
      secondary: "#ffffff", // White color
      popup: "#9e9e9e", //
      span: "#bdbdbd",
      input: "#000000",
      text: "#000000",
      symbol: "#bdbdbd",
      red: "#FF0000",
    },
    background: {
      light: "#f3e5f5",
      main: "#3f50b5",
      dark: "#002884",
    },
    transferDetails: {
      light: "#f3e5f5",
      main: "#3f50b5",
      dark: "#000000",
      contrastText: "#fff",
      warning: "#FF0000",
    },
    button: {
      normal: "#9c27b0", //mov deschis
      hover: "#4a148c", // mov inchis
      textNormal: "#fff", //alb
      textHover: "#f3e5f5", // alb-mov
    },
  },
});

export default Theme;
