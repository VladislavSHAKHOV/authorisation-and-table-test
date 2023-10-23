import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../../Routes/Routes';
import { LOGIN_ROUTE, TABLE_ROUTE } from '../../utils/consts';




const AppRouter = () => {
    const user = useSelector((state) => state.logIn.user);

    return (
        <Routes>
            {user
                ? privateRoutes.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                ))
                : publicRoutes.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                ))}
            <Route
                path="*"
                element={<Navigate to={user ? TABLE_ROUTE : LOGIN_ROUTE} />}
            />
        </Routes>
    );
};

export default AppRouter;





