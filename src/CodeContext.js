import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// Context 생성
export const CodeContext = createContext(null);

// 상태 및 타입 매핑
export const pjtStatusMapping = { 1: "진행예정", 2: "진행중", 3: "종료" };

export const empPositionMapping = {
    1: "팀원",
    2: "팀장",
    3: "부서장",
    4: "CEO",
    5: "인사담당자",
    9: "시스템관리자"
};
