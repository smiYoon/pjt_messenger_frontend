import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// Context 생성
export const LoadScriptContext = createContext(null);

export const LoadScriptProvider = ({ children }) => {

    const [decodedToken, setDecodedToken] = useState(null); // [] -> null 로 변경.
    const [token, setToken] = useState(localStorage.getItem('jwt') || null); // 수정점.
    
    useEffect(() => {
        const loadToken = () => {
            try {
                // const token = localStorage.getItem('jwt');
                const stored = localStorage.getItem('jwt');
                // if (!token) return;
                if (!stored) return; // 수정점.
                // const decoded = jwtDecode(token);
                // setDecodedToken(decoded);
                setToken(stored); // 수정점.
                const decoded = jwtDecode(stored);
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
        // setDecodedToken(jwtDecode(newToken));
        setToken(newToken); // 수정점.
        setDecodedToken(jwtDecode(newToken));
    };

    const role_level = {
        // "ROLE_Employee": 1,
        // "ROLE_TeamLeader": 2,
        // "ROLE_DepartmentLeader": 3,
        // "ROLE_CEO": 4,
        // "ROLE_HireManager": 5,
        // "ROLE_SystemManager": 9,
        "Employee": 1,
        "TeamLeader": 2,
        "DepartmentLeader": 3,
        "CEO": 4,
        "HireManager": 5,
        "SystemManager": 9,
    };


    return (
        <LoadScriptContext.Provider value={{ token, decodedToken, updateToken, role_level }}>
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


