import { useState, useEffect } from 'react';
import Login from './pages/Login/index';
import Dashboard from './pages/Dashbord/index';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const authStatus = localStorage.getItem('is_authenticated');
        setIsAuthenticated(authStatus ? JSON.parse(authStatus) : false);
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Routes>
                {isAuthenticated ? (
                    <Route path="/dashboard" element={<Dashboard setIsAuthenticated={setIsAuthenticated} />} />
                ) : (
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                )}
                <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
            </Routes>
        </Router>
    );
};

export default App;
