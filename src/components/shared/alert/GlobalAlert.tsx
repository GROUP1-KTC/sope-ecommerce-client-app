'use client';

import { Alert } from '@mui/material';
import { Snackbar, Fade } from '@mui/material';
import { useAlertStore } from '~/store/zustand/alertStore';

const GlobalAlert = () => {
    const { open, severity, message, closeAlert } = useAlertStore();

    return (
        <Snackbar
            open={open}
            autoHideDuration={2500}
            onClose={closeAlert}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            TransitionComponent={Fade}
        >
            <Alert severity={severity} onClose={closeAlert}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default GlobalAlert;
