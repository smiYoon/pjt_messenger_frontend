import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from "./WorkBox.module.css";
import { useLoadScript } from '../LoadScriptContext.js';

console.groupCollapsed("src/Work/WorkBox.js");console.groupEnd();


const WorkBox = (props) => {
    console.debug(`WorkBox() invoked.`);
    
    const navigate = useNavigate();

    const {data} = props;
    // console.log("data is :", data);
    const [loading, setLoading] = useState(false);
    const [employeeData, setEmployeeData] = useState([]);
    // var userId = "E2405001";
    var userId = "E2005003";
    // E2405001
    // E2406002 , E2005003
    // var userDeptId = "27"; // 8 , 27
    // var userDeptId = "8"; // 8 , 27
    var userDeptId = "14"; // 8 , 27
    var userName = "홍시리";
    var userStatus = 2; // 1, 2, 3, 4, 5, 9
    const [userData, setUserDate] = useState({ 
        userId : "E2005003",
        userDeptId : "14",
        userName : "홍시리",
        userStatus : 2,
    }); // 로그인한 사람의 정보

    useEffect(() => { 
        console.log("employeeData is :", employeeData);
    }, [employeeData]); // 로그인한 사람의 정보

    useEffect(() => {       
                const fetchData = async () => {
                    try {
                        setLoading(true); // 로딩 시작
                        const response = await fetch(`https://localhost:443/work/${data.id}`);
                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        } // if
                        const data1 = await response.json();
                        setEmployeeData(data1);
                    } catch (error) {
                        console.error("Fetch error:", error);
                    } finally{
                        setLoading(false); // 로딩 종료
                    }// try-catch-finally
                  };
                  fetchData();
        }, []);



    // 1: 개발, 2: 운영, 3: 인사, 4: 회계, 5: 마케팅
    const switchType = (type) => {
        switch(type) {
            case 1: return "개발";
            case 2: return "운영";
            case 3: return "인사";
            case 4: return "회계";
            case 5: return "마케팅";
            default: return "기타";
        } // switch
    } // switchType
    

    return(
        <div className={styles.workBox}>
            <div className={styles.workBoxTop}>
                <span className={styles.type}>{switchType(data.type)}</span>
                <span className={styles.arrow}>
                    <i style={{cursor: "pointer"}} className='fas fa-arrow-right' onClick={() => navigate(`/work/detail/${data.id}`)}/>
                </span>
            </div>

            <div>{data.name}</div>

            <div>
                <i className='fas fa-calendar-days'/>{" "}
                {data.startDate.substring(0, 10)} ~ {data.endDate.substring(0, 10)} 
            </div>

            <div>
                <div>요청자 
                    ({
                        loading 
                        ? null 
                        : (
                            employeeData.workEmployees &&
                            employeeData.workEmployees.length > 0
                              ? (() => {
                                  const names = employeeData.workEmployees.map(item => item.employee.name);
                                  if (names.length <= 2) {
                                    return names.join(", ");
                                  } else {
                                    return (
                                      <>
                                        {names.slice(0, 2).join(", ")}
                                        {" "}
                                        <span>
                                         , ...+{names.length - 2}
                                        </span>
                                      </>
                                    );
                                  }
                                })()
                              : null
                          )
                    })
                </div> 
                <div>담당자 ({userData.userName})</div>
            </div>
        </div>
    );

} // WorkBox

export default WorkBox;
