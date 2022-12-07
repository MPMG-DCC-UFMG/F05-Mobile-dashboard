import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette:{
    mode:"dark"
  }
});

export const defaultTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#1976d2",
      main: "#1976d2",
      dark: "#1565c0",
    },
    secondary: {
      light: "rgb(112, 112, 112)",
      main: "#fff",
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

export const trenaTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "##c8ffc3",
      main: "#88ef87",
      dark: "#46af4c",
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

