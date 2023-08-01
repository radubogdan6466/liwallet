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
    },
  },
});

export default Theme;
