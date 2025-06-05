
// context/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        role: null,
    });

    const login = (role) => {
        setAuth({
            isAuthenticated: true,
            role: role,
        });
    };

    const logout = () => {
        setAuth({
            isAuthenticated: false,
            role: null,
        });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
