import { Navigate } from 'react-router-dom';

export const ProtectedAdminRoute = ({ children }) => {
    const adminInfo = localStorage.getItem('adminInfo');
    console.log('Admin info:', adminInfo); // Debug log

    if (!adminInfo) {
        console.log('No admin info found, redirecting to login'); // Debug log
        return <Navigate to="/admin/login" />;
    }

    return children;
};