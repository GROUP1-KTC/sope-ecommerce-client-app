import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2', // Màu xanh blue chuẩn của MUI
        },
        secondary: {
            main: '#ffffff', // Trắng
        },
        background: {
            default: '#f5faff', // Nền sáng xanh nhạt
            paper: '#ffffff', // Nền component trắng
        },
        text: {
            primary: '#0d47a1', // Xanh đậm cho chữ chính
            secondary: '#555', // Màu phụ
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
});

export default theme;
