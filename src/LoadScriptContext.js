import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// Context 생성
export const LoadScriptContext = createContext(null);

export const LoadScriptProvider = ({ children }) => {

    const [decodedToken, setDecodedToken] = useState([]);

    useEffect(() => {
        const loadToken = () => {
            try {
                const token = localStorage.getItem('jwt');
                if (!token) return;
                const decoded = jwtDecode(token);
                setDecodedToken(decoded);
                console.log('디코딩 완료');
            } catch (error) {
                console.log('디코딩 실패', error);
                localStorage.removeItem('jwt');
            }
        };

        loadToken();
    }, []);

    const updateToken = (newToken) => {
        localStorage.setItem('jwt', newToken);
        setDecodedToken(jwtDecode(newToken));
    };

    const role_level = {
        "ROLE_Employee": 1,
        "ROLE_TeamLeader": 2,
        "ROLE_DepartmentLeader": 3,
        "ROLE_CEO": 4,
        "ROLE_HireManager": 5,
        "ROLE_SystemManager": 9,
    };


    return (
        <LoadScriptContext.Provider value={{ decodedToken, updateToken, role_level }}>
            {children}
        </LoadScriptContext.Provider>
    );
};


// 커스텀 훅
export const useLoadScript = () => {
    const context = useContext(LoadScriptContext);
    if (!context) {
        throw new Error('useLoadScript must be used within a LoadScriptProvider');
    }
    return context;
};