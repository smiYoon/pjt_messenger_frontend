import React, { useEffect, useState } from "react";
import styles from './emList.module.css';

const Emlist= ({isOpen, onClose})=>{


//데이터베이스에서 부서 정보 가져오기:
//팝업 UI:
//부서/팀 선택:
// 초대 기능:

//정보 가져오기
useEffect(()=>{
    if (isOpen) {
        fetch("/api/t_employee")
        .then((response) => response.json())
        .then((data) => setEmps(data))
        .catch((error) => console.error("Error fetching data:",error));
    }//if
},[isOpen])//useEffect

    //전체 리턴
    return(null);//return

}//Emlist