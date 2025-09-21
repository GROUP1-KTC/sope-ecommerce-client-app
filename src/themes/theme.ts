import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#ffffff',
        },
        background: {
            default: '#f5faff',
            paper: '#ffffff',
        },
        text: {
            primary: '#0d47a1',
            secondary: '#555',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
});

export default theme;
