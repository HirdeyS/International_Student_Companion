import { createTheme } from "@mui/material/styles";


const theme = createTheme({

  palette: {

    mode: "dark",

    primary: {
      main: "#60a5fa",
    },

    secondary: {
      main: "#a78bfa",
    },

    background: {
      default: "#020617",
      paper: "#111827",
    },

    text: {
      primary: "#f8fafc",
      secondary: "#94a3b8",
    },

  },


  typography: {

    fontFamily:
      "Inter, Roboto, Arial, sans-serif",

    h1: {
      fontSize: "2rem",
      fontWeight: 700,
    },

    h2: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },

    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },

  },


  components: {

    MuiCssBaseline: {

      styleOverrides: {

        body: {

          color:
            "#f8fafc",

        },


        // Emoji support
        "*": {

          fontFamily:
            "Inter, Roboto, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji",

        },

      },

    },

  },


});


export default theme;