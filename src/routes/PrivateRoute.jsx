import React, { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';

import { Navigate, useLocation } from 'react-router';
import Loading from '../pages/Loading/Loading';

const PrivateRoute = ({ children }) => {
    const { loading, user } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <Loading></Loading>
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children;
};

export default PrivateRoute;