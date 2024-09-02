import React, { useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Snackbar,
    Alert,
} from '@mui/material';

interface LogoutProps {
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Logout: React.FC<{ setIsAuthenticated: (value: boolean) => void }> = ({ setIsAuthenticated })=> {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

    const handleLogout = () => {
        setOpenDialog(true);
    };

    const handleConfirmLogout = () => {
        setOpenDialog(false);
        setOpenSnackbar(true);
        setTimeout(() => {
            localStorage.setItem('is_authenticated', 'false');
            setIsAuthenticated(false);
        }, 1500);
    };

    const handleCloseSnackbar = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <>
            <Button
                style={{ marginLeft: '12px' }}
                className="muted-button"
                onClick={handleLogout}
            >
                Logout
            </Button>

            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            >
                <DialogTitle>Logging Out</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to log out?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmLogout} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={1500}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>
                    Logging out...
                </Alert>
            </Snackbar>
        </>
    );
};

export default Logout;
