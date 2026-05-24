import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2",
        },
        secondary: {
            main: "#ff9800",
        },
        background: {
            default: "f5f5f5",
        },
    },

    typography: {
        fontFamily: "Inter, Roboto, sans-serif",
        h1: {fontSize: "2rem", fontWeight: 700},
        h2: {fontSize: "1.5rem", fontWeight: 600},
        body1: {fontSize: "1rem", lineHeight: 1.6},
    },
});

export default theme;