import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#bbff91",
      main: "#73FF00",
      dark: "#42bb15",
    },
    secondary: {
      light: "rgb(112, 112, 112)",
      main: "#000000",
      dark: "rgb(53, 53, 53)",
    },
    error: {
      light: "#ef5350",
      main: "#d32f2f",
      dark: "#c62828",
    },
    warning: {
      light: "#ff9800",
      main: "#ed6c02",
      dark: "#e65100",
    },
    info: {
      light: "#03a9f4",
      main: "#0288d1",
      dark: "#01579b",
    },
    success: {
      light: "#4caf50",
      main: "#2e7d32",
      dark: "#1b5e20",
    },
  },

  typography: {
    fontFamily: "Roboto",
  },
});
