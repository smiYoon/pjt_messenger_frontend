import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from "./WorkBox.module.css";

console.groupCollapsed("src/Work/WorkBox.js");console.groupEnd();


const WorkBox = (props) => {
    console.debug(`WorkBox() invoked.`);
    
    const navigate = useNavigate();

    const {data, loginEmpData, token } = props;
    const [loading, setLoading] = useState(false);
    const [employeeData, setEmployeeData] = useState([]);


    useEffect(() => {       
                const fetchData = async () => {
                    try {
                        setLoading(true); // 로딩 시작
                        const response = await fetch(`https://localhost/work/${data.id}`,
                            {headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json", 
                                },
                            }
                        );
                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        } // if
                        const data1 = await response.json();
                        setEmployeeData(data1);
                        console.log("employeeData", data1);
                    } catch (error) {
                        console.error("Fetch error:", error);
                    } finally{
                        setLoading(false); // 로딩 종료
                    }// try-catch-finally
                  };
                  fetchData();
        }, [data.id, token]); 



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

    const [isDragging, setIsDragging] = useState(false);

    const handleDragStart = (e) => {
        setIsDragging(true);
        e.dataTransfer.setData("text/plain", props.data.id);
        props.onDragStart?.(e, props.data);
    } // handleDragStart;

    const handleDragEnd = () => {
        setIsDragging(false);
    }; // handleDragEnd;

    if(loading !== false || employeeData.length === 0) {
        return (
            <div className={styles.workBox}>
                <div className={styles.workBoxTop}>
                    <span className={styles.type}>로딩중...</span>
                </div>
            </div>
        );
    } // if

    return(
        <div
            className={`${styles.workBox} ${isDragging ? styles.dragging : ''}`}
            style={{cursor: "pointer"}}
            draggable={props.draggable}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onClick={() => navigate(`/work/detail/${data.id}`)}
        >
            <div className={styles.workBoxTop}>
                <span className={styles.type}>{switchType(data.type)}</span>
            </div>

            <div>업무명: {data.name}</div>

            <div>
                기간: {data.startDate.substring(0, 10)} ~ {data.endDate.substring(0, 10)} 
            </div>

            <div className={styles.manager}>
                <div>요청자: {employeeData.employee.name}</div>
                <div>담당자: {
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
                            }
                </div> 
            </div>
        </div>
    );

} // WorkBox

export default WorkBox;
