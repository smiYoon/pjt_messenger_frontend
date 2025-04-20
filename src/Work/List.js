import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from "./List.module.css";
import {WorkBox} from "./index.js";
import { useLoadScript } from '../LoadScriptContext.js';


console.groupCollapsed("src/Work/List.js");console.groupEnd();


const List = () => {
    console.debug("List() invoked.");

    const navigate = useNavigate();

    // var userId = "E2405001";
    var userId = "E2005003";
    // E2405001
    // E2406002 , E2005003
    // var userDeptId = "27"; // 8 , 27
    // var userDeptId = "8"; // 8 , 27
    var userDeptId = "14"; // 8 , 27
    var userName = "홍시리";
    var userStatus = 2; // 1, 2, 3, 4, 5, 9
    const [loading, setLoading] = useState(false);
    const [pickedEmployee, setPickedEmployee] = useState({
        empno: userId,
        name: userName,
    }); // 현재 선택된 사원
    const [work, setWork] = useState("managed");
    // 담당업무 = managed
    // 요청업무 = requested
    const [employeeData, setEmployeeData] = useState([]);
    const [userData, setUserDate] = useState({ children: [] }); // 로그인한 사람의 정보
    const [uploadData, setUploadData] = useState({
        work: work,
        employee: userId,
    });
    const [departmentMembers, setDepartmentMembers] = useState([]); // 부서원들
    

    const handleToggle = () => {
        setWork(work === "managed" ? "requested" : "managed");
        setUploadData({
            work: work === "managed" ? "requested" : "managed",
            employee: pickedEmployee.empno,
        });
    }; // handleToggle

    const handleChangePickedEmployee = (empno, name) => {
        console.log("Clicked work ID:", empno);
        const fetchData = async () => {
            try {
                console.log("handleChangePickedEmployee() invoked.");
                setLoading(true); // 로딩 시작
                setEmployeeData([]); // 초기화
                setPickedEmployee({empno:empno, name:name}); // 현재 선택된 사원
                const params = new URLSearchParams({
                    work: work,
                    employee: empno,
                });

                // 서버에 데이터 전송
                const response = await fetch(`https://localhost:443/work?${params}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                } // if
                const data = await response.json();
                setEmployeeData(data);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally{
                setLoading(false); // 로딩 종료
            }// try-catch-finally
          };
          fetchData();
    } // handleClick

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true); // 로딩 시작
                setPickedEmployee({
                    empno:userId,
                    name:userName
                }); // 현재 선택된 사원
                const response = await fetch(`https://localhost:443/department/${userDeptId}`, { method: "GET"});
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setUserDate(data);

                // 부서원 정보 추출 (empno, name만)
                if (data.children.length > 0) {
                    const topMembers = data.children.map(dept => {
                        if (Array.isArray(dept.employees) && dept.employees.length > 0) {
                            const topEmp = dept.employees.reduce((max, emp) => 
                            emp.position > max.position ? emp : max
                            , dept.employees[0]);
                            return {
                            empno: topEmp.empno,
                            name: topEmp.name
                            };
                        } else {
                            return {
                            empno: null,
                            name: null
                            };
                        } // if-else
                    }); // map

                    setDepartmentMembers(topMembers);
                } else {
                    // data.employees가 없을 때 처리: 모든 부서 사원 수집 → 최고 position 제외
                    const allEmployees = data.employees || [];
                    console.log("allEmployees is :", allEmployees);

                    if (allEmployees.length === 0) {
                        setDepartmentMembers([]);
                        return;
                    } // if

                    // 가장 높은 position 값 추출
                    const maxPosition = Math.max(...allEmployees.map(emp => emp.position));

                    // 최고 position 제외 + empno, name만 추출
                    const filteredEmployees = allEmployees
                        .filter(emp => emp.position !== maxPosition)
                        .map(emp => ({ empno: emp.empno, name: emp.name }));

                    setDepartmentMembers(filteredEmployees);
                } // if-else

            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false); // 로딩 종료
            }// try-catch-finally
        };
        fetchUserData();
    }, []); // useEffect

    useEffect(() => {
        console.log("userData is :", userData);
    }, [userData]); // useEffect

    useEffect(() => {
        // console.log("work is :", work);
        console.log("employeeData is :", employeeData);
        // console.log("uploadData is :", uploadData);
        // console.log("departmentMembers is :", departmentMembers);
    }, [work, employeeData, uploadData, departmentMembers]); // useEffect

    useEffect(() => {       
        const fetchData = async () => {
            try {
                console.log("fetchData() invoked.");
                setEmployeeData([]); // 초기화
                setLoading(true); // 로딩 시작
                // 서버에 데이터 전송
                const params = new URLSearchParams({
                    work: work,
                    employee: pickedEmployee.empno // 항상 최신 pickedEmployee 사용
                });

                const response = await fetch(`https://localhost:443/work?${params}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                } // if
                const data = await response.json();
                setEmployeeData(data);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally{
                setLoading(false); // 로딩 종료
            }// try-catch-finally
        };
        // pickedEmployee.empno가 있을 때만 fetch 실행
        if (pickedEmployee.empno) fetchData();
    }, [work, pickedEmployee]); // useEffect


    const status1List = employeeData.filter(item => item.status === 1);
    const status2List = employeeData.filter(item => item.status === 2);
    const status3List = employeeData.filter(item => item.status === 3);
    const status4List = employeeData.filter(item => item.status === 4);


    return(
        <div className={styles.body}>
            <div className={styles.pageTitle}>
                업무 리스트 ({loading ? null : pickedEmployee.name})
            </div>

            <div className={styles.pageMiddle}>
                <span className={styles.middleLeft}>
                    <span onClick={() => handleChangePickedEmployee(userId, userName)} className={styles.nameCircle}>({userName})</span>
                    {loading ? null : (
                        <>
                            {/* 최대 4개만 출력 */}
                            {departmentMembers.slice(0, 4).map((child, idx) => (
                                <span onClick={() => handleChangePickedEmployee(child.empno, child.name)} className={styles.nameCircle} key={child.id || idx}>{child.name}</span>
                            ))}
                            
                            {/* 5개 이상일 때 추가 버튼 */}
                            {departmentMembers.length > 4 && (
                                <button style={{ cursor: "pointer" }}
                                    className={styles.empPlusButton}
                                    onClick={() => {/* 사원 리스트 화면으로 이동하는 로직 */}}
                                >
                                    <i className='fas fa-plus'/>
                                    {departmentMembers.length - 4}
                                </button>
                            )}
                        </>
                    )}
                </span> 

                <span className={styles.middleRight}>
                    <div className={styles.toggleWrapper}>
                        <span>담당업무 </span>
                        <span className={styles.toggle_container} onClick={handleToggle}>
                        <span className={`${styles.toggle_button} ${work === "managed" ? styles.managed : styles.requested}`}/>
                        </span>
                        <span>요청업무 </span>
                    </div>
                    
                    <span>
                        <button className={styles.addButton} onClick={() => {
                                if(userStatus==1){
                                    return alert("팀원은 업무등록을 할 수 없습니다");
                                } else{navigate('/work/create')} // if
                                }}> 
                            <i 
                            className='fas fa-circle-plus' 
                            style={{ color: "white", backgroundColor: "#6C47FF" }}/> 업무 등록 </button>
                    </span>
                </span>
            </div>

            <div className={styles.pageBottom}>
                <span className={styles.pageBottom_Box}>
                    <div>진행 예정 <span className={styles.bottomNumber}>{status1List.length}</span><hr className={styles.hr}/></div>

                    <div className={styles.bottom_background}>
                        {loading ? (
                            <div className={styles.loadingText}>로딩중...</div>
                        ) : status1List.length === 0 ? (
                            <div className={styles.emptyText}>업무가 없습니다.</div>
                        ) : (
                            status1List.map(item => (
                                <WorkBox key={item.id} data={item} className={styles.WorkBox}/>
                            ))
                        )}
                    </div>
                </span>

                <span className={styles.pageBottom_Box}>
                    <div>진행중 <span className={styles.bottomNumber}>{status2List.length}</span><hr className={styles.hr}/></div>

                    <div className={styles.bottom_background}>
                        {loading ? (
                                <div className={styles.loadingText}>로딩중...</div>
                            ) : status2List.length === 0 ? (
                                <div className={styles.emptyText}>업무가 없습니다.</div>
                            ) : (
                                status2List.map(item => (
                                    <WorkBox key={item.id} data={item} className={styles.WorkBox}/>
                                ))
                            )}
                    </div>
                </span>
                
                <span className={styles.pageBottom_Box}>
                    <div>완료 대기 <span className={styles.bottomNumber}>{status3List.length}</span><hr className={styles.hr}/></div>

                    <div className={styles.bottom_background}>
                        {loading ? (
                                <div className={styles.loadingText}>로딩중...</div>
                            ) : status3List.length === 0 ? (
                                <div className={styles.emptyText}>업무가 없습니다.</div>
                            ) : (
                                status3List.map(item => (
                                    <WorkBox key={item.id} data={item} className={styles.WorkBox}/>
                                ))
                            )}
                    </div>
                </span>

                <span className={styles.pageBottom_Box}>
                    <div>완료 <span className={styles.bottomNumber}>{status4List.length}</span><hr className={styles.hr}/></div>
                    
                    <div className={styles.bottom_background}>
                        {loading ? (
                                <div className={styles.loadingText}>로딩중...</div>
                            ) : status4List.length === 0 ? (
                                <div className={styles.emptyText}>업무가 없습니다.</div>
                            ) : (
                                status4List.map(item => (
                                    <WorkBox key={item.id} data={item} className={styles.WorkBox}/>
                                ))
                            )}
                    </div>
                </span>
            </div>
        </div>
    );

} // List

export default List;
