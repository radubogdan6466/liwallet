import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  palette: {
    primary: {
      main: "#bdbdbd", //gray
      icon: "#9c27b0", //icons color
    },
    text: {
      main: "#9c27b0", // Blue color -
      secondary: "#ffffff", // White color - poți înlocui cu culoarea dorită

      span: "#bdbdbd",
    },
  },
});

export default Theme;
