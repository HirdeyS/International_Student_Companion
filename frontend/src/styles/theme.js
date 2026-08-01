import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#3B82F6",
    },

    secondary: {
      main: "#8B5CF6",
    },

    success: {
      main: "#22C55E",
    },

    warning: {
      main: "#F59E0B",
    },

    error: {
      main: "#EF4444",
    },

    background: {
      default: "#020617",
      paper: "#0F172A",
    },

    text: {
      primary: "#F8FAFC",
      secondary: "#94A3B8",
    },

    divider: "rgba(255,255,255,.08)",
  },

  shape: {
    borderRadius: 16,
  },

  typography: {
    fontFamily: `"Inter", "Roboto", sans-serif`,

    h1: {
      fontWeight: 700,
      fontSize: "2.8rem",
    },

    h2: {
      fontWeight: 700,
      fontSize: "2rem",
    },

    h3: {
      fontWeight: 600,
    },

    h4: {
      fontWeight: 600,
    },

    h5: {
      fontWeight: 600,
    },

    h6: {
      fontWeight: 600,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            "linear-gradient(180deg,#020617,#0F172A 45%,#111827 100%)",
          backgroundAttachment: "fixed",
        },

        "*": {
          scrollbarWidth: "thin",
        },

        "::-webkit-scrollbar": {
          width: 8,
          height: 8,
        },

        "::-webkit-scrollbar-thumb": {
          background: "#334155",
          borderRadius: 20,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#0F172A",
          border: "1px solid rgba(255,255,255,.08)",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          background: "rgba(15,23,42,.85)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,.08)",
          boxShadow: "0 15px 40px rgba(0,0,0,.35)",
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        root: {
          borderRadius: 14,
          padding: "10px 22px",
          transition: "all .25s ease",
        },

        contained: {
          background:
            "linear-gradient(90deg,#3B82F6,#6366F1)",

          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow:
              "0 10px 30px rgba(59,130,246,.35)",
          },
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 14,

          "& fieldset": {
            borderColor: "rgba(255,255,255,.1)",
          },

          "&:hover fieldset": {
            borderColor: "#3B82F6",
          },

          "&.Mui-focused fieldset": {
            borderColor: "#3B82F6",
          },
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "rgba(2,6,23,.75)",
          backdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(255,255,255,.08)",
          boxShadow: "none",
        },
      },
    },

    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#64748B",

          "&.Mui-checked": {
            color: "#3B82F6",
          },
        },
      },
    },
  },
});

export default theme;