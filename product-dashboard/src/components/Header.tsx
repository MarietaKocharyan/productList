import { Button, Box, Typography } from '@mui/material';
import Logout from '../pages/Logout';

interface HeaderProps {
    setIsAdding: (value: boolean) => void;
    setIsAuthenticated: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setIsAdding, setIsAuthenticated }) => {
    return (
        <Box
            component="header"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding={2}
            color="white"
        >
            <Typography variant="h4">Product Dashboard</Typography>
            <Box>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setIsAdding(true)}
                    sx={{ marginRight: 2 }}
                >
                    Add product
                </Button>
                <Logout
                    setIsAuthenticated={setIsAuthenticated}
                />
            </Box>
        </Box>
    );
};

export default Header;
