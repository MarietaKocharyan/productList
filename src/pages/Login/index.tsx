
import React, { useState } from 'react';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated}) => {
    const [email, setEmail] = useState<string>('admin@example.com');
    const [password, setPassword] = useState<string>('qwerty');
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    const navigate = useNavigate();

    const adminEmail = 'admin@example.com';
    const adminPassword = 'qwerty';

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (email === adminEmail && password === adminPassword) {
            setSnackbarMessage('Successfully logged in!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);

            setTimeout(() => {
                localStorage.setItem('is_authenticated', 'true');
                setIsAuthenticated(true);
                navigate('/dashboard'); // Redirect to dashboard or another route
            }, 1500); // Simulate loading time
        } else {
            setSnackbarMessage('Incorrect email or password.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div style={{ maxWidth: 400, margin: 'auto', padding: 16 }}>
            <form onSubmit={handleLogin}>
                <h1>Admin Login</h1>
                <TextField
                    fullWidth
                    id="email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    variant="outlined"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 12 }}
                >
                    Login
                </Button>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={1500}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Login;
