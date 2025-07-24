import { createTheme } from '@mui/material/styles';

const theme = createTheme();

export const colors = {
    primary: {
        light: theme.palette.primary.light,
        main: theme.palette.primary.main,
        dark: theme.palette.primary.dark,
        contrastText: theme.palette.primary.contrastText,
        background: '#d0001a',
        backgroundHover: '#a00016',
    },
    secondary: {
        light: theme.palette.secondary.light,
        main: theme.palette.secondary.main,
        dark: theme.palette.secondary.dark,
        contrastText: theme.palette.secondary.contrastText,
    },
    error: {
        light: theme.palette.error.light,
        main: theme.palette.error.main,
        dark: theme.palette.error.dark,
        contrastText: theme.palette.error.contrastText,
    },
    action: {
        active: theme.palette.action.active,
        hover: theme.palette.action.hover,
        selected: theme.palette.action.selected,
    },
};
