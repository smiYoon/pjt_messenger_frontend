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
                const stored = localStorage.getItem('jwt');
                if (!stored) return; // 수정점.
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

    const deptName = {
        2: "CEO",
        3: "개발본부",
        4: "개발1팀",
        5: "개발2팀",
        6: "개발3팀",
        7: "개발4팀",
        8: "인사본부",
        9: "인사1팀",
        10: "인사2팀",
        11: "인사3팀",
        12: "인사4팀",
        13: "운영본부",
        14: "운영1팀",
        15: "운영2팀",
        16: "운영3팀",
        17: "운영4팀",
        18: "마케팅본부",
        19: "마케팅1팀",
        20: "마케팅2팀",
        21: "마케팅3팀",
        22: "마케팅4팀",
        23: "회계본부",
        24: "회계1팀",
        25: "회계2팀",
        26: "회계3팀",
        27: "회계4팀"
    };

    const role_level = {
        "Employee": 1,
        "TeamLeader": 2,
        "DepartmentLeader": 3,
        "CEO": 4,
        "HireManager": 5,
        "SystemManager": 9,
    };

    const empPositionMapping = {
        1: "팀원",
        2: "팀장",
        3: "부서장",
        4: "CEO",
        5: "인사담당자",
        9: "시스템관리자"
    };

    const pjtStatusMapping = { 1: "진행예정", 2: "진행중", 3: "종료" };

    const userRole = Array.isArray(decodedToken?.roles)
    ? decodedToken.roles[0]
    : decodedToken?.roles;
    const isTopLevel = role_level?.[userRole] === 9; // 수정점 04.22




    return (
        <LoadScriptContext.Provider value={{ token, decodedToken, updateToken, role_level, deptName, empPositionMapping, pjtStatusMapping, isTopLevel }}>
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


