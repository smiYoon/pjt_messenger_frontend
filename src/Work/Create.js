import React, { useEffect, useState, useRef  } from "react";
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import Swal from "sweetalert2";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useLoadScript } from '../LoadScriptContext.js';

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";

import styles from "./Create.module.css";

registerLocale("ko", ko);

console.groupCollapsed("src/Work/Create.js");console.groupEnd();



const Create = () => {
    console.debug("Create() invoked.");

    const navigate = useNavigate();
    const nameRef = useRef();
    const detailRef = useRef();
    const memoRef = useRef();

    const { decodedToken, token } = useLoadScript();
    const [isTokenLoaded, setIsTokenLoaded] = useState(false);
    const [loginEmpData, setLoginEmpData] = useState({
            userId: "",
            userName: "",
            userPosition: "",
            userDeptId: "",
    }); // 로그인한 사람

    useEffect(() => {
        if (decodedToken) {
          setLoginEmpData({
            userId: decodedToken.empno,
            userName: decodedToken.name,
            userPosition: decodedToken.position,
            userDeptId: decodedToken.department,
          });
          setIsTokenLoaded(true);
        }
    }, [decodedToken]);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [uploadData, setUploadData] = useState({
        name: "",
        detail: "",
        memo: "",
        status: 1,
        type: 1,
        startDate: "",
        endDate: "",
        employee: loginEmpData.userId,
    });
    const [empnos, setEmpnos] = useState(["E2406002", "E2005003"]);

    const [isEmpModalOpen, setIsEmpModalOpen] = useState(false);
    const [departmentMembers, setDepartmentMembers] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);

    // 부서원 목록 가져오기
    useEffect(() => {
        const fetchDepartmentMembers = async () => {
            if (!loginEmpData.userDeptId) return;
            
            try {
                const response = await fetch(`https://localhost/department/${(loginEmpData.userPosition === 9) ? 1 : loginEmpData.userDeptId}`,
                    {headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json", 
                        },
                    }
                );
                const data = await response.json();

                let members = [];
                
                // 부서원 정보 추출 (empno, name만)
                if(loginEmpData.userPosition === 9){
                    // 모든 부서의 사원 수집
                    const allEmployees = [];
                    const collectEmployees = (departments) => {
                        departments.forEach(dept => {
                            if (dept.employees?.length > 0) {
                                allEmployees.push(...dept.employees);
                            } // if
                            if (dept.children?.length > 0) {
                                collectEmployees(dept.children);
                            } // if
                        }); // forEach
                    }; // collectEmployees
                    collectEmployees(data.children || []);

                    // 중복 제거 및 포맷팅
                    const uniqueEmployees = Array.from(
                        new Map(allEmployees.map(emp => [emp.empno, emp])).values()
                    ); // uniqueEmployees

                    setDepartmentMembers(
                        uniqueEmployees.map(emp => ({
                            empno: emp.empno,
                            name: emp.name,
                        })) // map
                    ); // setDepartmentMembers
                    return;
                } else if (data.children?.length > 0) {
                    const topMembers = data.children.map(dept => {
                        if (dept.employees?.length > 0) {
                            const topEmp = dept.employees.reduce((max, emp) => 
                                emp.position > max.position ? emp : max, 
                                dept.employees[0]
                            );
                            return { empno: topEmp.empno, name: topEmp.name };
                        } else {
                            return null;
                        } // if-else
                    }).filter(m => m !== null);
                    members = topMembers;
                } else {
                    const allEmployees = data.employees || [];
                    const maxPosition = Math.max(...allEmployees.map(emp => emp.position));
                    members = allEmployees
                        .filter(emp => emp.position !== maxPosition)
                        .map(emp => ({ empno: emp.empno, name: emp.name }));
                } // if-else

                const loggedInUser = { 
                    empno: loginEmpData.userId, 
                    name: loginEmpData.userName 
                };
                const filtered = members.filter(m => m.empno !== loggedInUser.empno);
                setDepartmentMembers([loggedInUser, ...filtered]);
            } catch (error) {
                console.error("부서원 조회 오류:", error);
            } // try-catch
        }; // fetchDepartmentMembers
        fetchDepartmentMembers();
    }, [loginEmpData.userDeptId, loginEmpData.userPosition, loginEmpData.userId, loginEmpData.userName, loginEmpData.userPosition, token]); // useEffect

    // 담당자 선택 모달 핸들러
    const handleEmployeeSelect = (emp) => {
        setSelectedEmployees(prev => {
            const exists = prev.some(e => e.empno === emp.empno);
            return exists 
                ? prev.filter(e => e.empno !== emp.empno)
                : [...prev, emp];
        }); // setSelectedEmployees
    }; // handleEmployeeSelect

    // 선택 완료 시
    const handleConfirmSelection = () => {
        setEmpnos(selectedEmployees.map(e => e.empno));
        setIsEmpModalOpen(false);
    }; // handleConfirmSelection

    useEffect(() => {
        console.info("uploadData: ", uploadData);
    }, [uploadData]);

    const handleStatusClick = (value) => {
        // 1: 진행예정, 2: 진행중, 3: 완료 대기, 4: 완료
        setUploadData((prevData) => ({
            ...prevData,
            status: value,
        }));
    };

    const handleTypeClick = (value) => {
        // 1: 개발, 2: 운영, 3: 인사, 4: 회계, 5: 마케팅
        setUploadData((prevData) => ({
            ...prevData,
            type: value,
        }));
    };    


    useEffect(() => {
        if(endDate && startDate > endDate) {
            Swal.fire({
                text: "종료일은 시작일 이후로 선택해주세요.",
                icon: "warning",
                confirmButtonText: "확인",
                confirmButtonColor: "#6C47FF",
            }); // Swal.fire
            setEndDate(null);
        } // if
    }, [startDate, endDate]);

    const formatDate = (date) => date ? date.toISOString().slice(0, 10) : "";

    const handleCreate = () => {
        Swal.fire({
            text: "등록하시겠습니까?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "등록",
            cancelButtonText: "취소",
            confirmButtonColor: "#6C47FF",
            cancelButtonColor: "#FFFFFF",
            customClass: {
                cancelButton: styles.createCancelButton,
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                if(startDate == null || endDate == null || startDate.length === 0 || endDate.length === 0) {
                    Swal.fire({
                        text: "진행 기간을 선택해주세요.",
                        icon: "warning",
                        confirmButtonText: "확인",
                        confirmButtonColor: "#6C47FF",
                    }); // Swal.fire
                    return;
                } // if

                // 등록 버튼을 눌렀을 때 input/textarea 값 읽기
                const name = nameRef.current.value;
                const detail = detailRef.current.value;
                const memo = memoRef.current.value;

                if(name === "") {
                    Swal.fire({
                        text: "업무명을 입력해주세요.",
                        icon: "warning",
                        confirmButtonText: "확인",
                        confirmButtonColor: "#6C47FF",
                    }); // Swal.fire
                    return;
                } // if

                // 기존 uploadData를 복사해서 값만 덮어쓰기
                const sendData = {
                    ...uploadData,
                    name: name,
                    detail: detail,
                    memo: memo,
                    startDate: formatDate(startDate),
                    endDate: formatDate(endDate),
                    employee: loginEmpData.userId,
                };
                
                // 서버에 데이터 전송
                const params = new URLSearchParams(sendData);

                // empnos가 배열이면 여러 번 append
                if (Array.isArray(empnos) && empnos.length > 0) {
                    empnos.forEach(empno => {
                        params.append("empnos", empno);
                    }); // forEach
                } // if

                console.info("params: ", params.toString());
                
                const response = await fetch(`https://localhost/work?${params.toString()}`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json", 
                        },
                });

                if (!response.ok) {
                    Swal.fire("등록 실패", "서버 오류가 발생했습니다.", "error");
                    return;
                }

                // Content-Type 확인
                const contentType = response.headers.get('content-type');
                let result;

                if (contentType?.includes('application/json')) {
                    result = await response.json(); // ✅ 한 번만 호출
                } else {
                    const text = await response.text();
                    result = text === "true"; // 텍스트 처리
                }

                console.info("result: ", result);

                if (result === true) {
                    Swal.fire("등록 완료", "업무가 등록되었습니다.", "success");
                    navigate('/work');
                } else {
                    Swal.fire("등록 실패", "업무 등록에 실패했습니다.", "error");
                    // 실패 시 화면에 머무름
                } // if-else

            } // if
        }); // Swal.fire
    }; // handleCreate

    const handleCancel = () => {
        Swal.fire({
            title: "정말 취소하시겠습니까?",
            text: "취소하시면 변경사항이 저장되지 않습니다.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "예",
            cancelButtonText: "아니오",
            confirmButtonColor: "#6C47FF",
            cancelButtonColor: "#FFFFFF",
            customClass: {
                cancelButton: styles.backCancelButton,
            },
        }).then((result) => {
            if (result.isConfirmed) {
            navigate('/work');
            } // if
        }); // Swal.fire
    }; // handleCancel

    const handleBack = () => {
        Swal.fire({
            title: "뒤로 이동하시겠습니까?",
            text: "페이지를 벗어나면 변경사항이 저장되지 않습니다.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "예",
            cancelButtonText: "아니오",
            confirmButtonColor: "#6C47FF",
            cancelButtonColor: "#FFFFFF",
            customClass: {
                cancelButton: styles.backCancelButton,
            },
        }).then((result) => {
            if (result.isConfirmed) {
            navigate('/work');
            } // if
        }); // Swal.fire
    }; // handleCancel

    if (!isTokenLoaded) return <div>사용자 정보 로딩 중...</div>; 

    return(
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <div className={styles.leftBox}>
                    <div style={{display: "flex", position: "relative"}}>
                        <i style={{cursor: "pointer"}} className='fas fa-arrow-left' onClick={handleBack}/>
                        <span className={styles.pageDetail}>업무 등록</span>
                    </div>

                    <div className={styles.leftContent}>
                        <div>
                            <input ref={nameRef} className={styles.nameInputBox} type="text" placeholder="업무명을 입력하세요." />
                        </div>
                        <div/>

                        <div style={{display: "flex"}}>
                            <span className={styles.contentLeft}>상태</span>
                            <span className={styles.contentRight}>
                                <span className={`${styles.status1} ${uploadData.status === 1 ? styles.on : ""}`} onClick={() => handleStatusClick(1)}>진행예정</span>
                                <span className={`${styles.status2} ${uploadData.status === 2 ? styles.on : ""}`} onClick={() => handleStatusClick(2)}>진행중</span>
                                <span className={`${styles.status3} ${uploadData.status === 3 ? styles.on : ""}`} onClick={() => handleStatusClick(3)}>완료 대기</span>
                                <span className={`${styles.status4} ${uploadData.status === 4 ? styles.on : ""}`} onClick={() => handleStatusClick(4)}>완료</span>
                            </span>
                        </div>

                        <div style={{display: "flex"}}>
                            <span className={styles.contentLeft}>분류</span>
                            <span className={styles.contentRight}>
                                <span className={`${styles.type} ${uploadData.type === 1 ? styles.on : ""}`} onClick={() => handleTypeClick(1)}>개발</span>
                                <span className={`${styles.type} ${uploadData.type === 2 ? styles.on : ""}`} onClick={() => handleTypeClick(2)}>운영</span>
                                <span className={`${styles.type} ${uploadData.type === 3 ? styles.on : ""}`} onClick={() => handleTypeClick(3)}>인사</span>
                                <span className={`${styles.type} ${uploadData.type === 4 ? styles.on : ""}`} onClick={() => handleTypeClick(4)}>회계</span>
                                <span className={`${styles.type} ${uploadData.type === 5 ? styles.on : ""}`} onClick={() => handleTypeClick(5)}>마케팅</span>
                            </span>
                        </div>

                        <div style={{display: "flex"}}>
                            <span className={styles.contentLeft}>진행 기간</span>
                            <span className={styles.contentRight}>
                                <DatePicker
                                    className={styles.reactDatepicker}
                                    filterDate={(date) => date >= new Date()}
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText="시작일"
                                    popperContainer={({ children }) => createPortal(children, document.body)}
                                />
                                <span>~</span>
                                <DatePicker
                                    className={styles.reactDatepicker}
                                    filterDate={(date) => date >= new Date()}
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText="종료일"
                                    popperContainer={({ children }) => createPortal(children, document.body)}
                                />
                            </span>
                        </div>

                        <div style={{display: "flex"}}>
                            <span className={styles.contentLeft}>담당자 </span>
                            <span className={styles.contentRight}>
                                <i 
                                    style={{cursor: "pointer"}} 
                                    className='fas fa-circle-plus'
                                    onClick={() => setIsEmpModalOpen(true)}
                                />
                                <span className={`${styles.selectedEmployeeWrap} ${selectedEmployees.length > 0 ? styles.hasEmployee : ''}`}>
                                    <div className={styles.selectedEmployeeScroller}>
                                        {selectedEmployees.map(emp => (
                                            <span 
                                                key={emp.empno} 
                                                className={styles.selectedEmployee}
                                                onClick={() => handleEmployeeSelect(emp)} // 클릭 시 제거
                                            >
                                                {emp.name}
                                            </span>
                                        ))}
                                    </div>
                                </span>
                            </span>
                        </div>
                        
                        {isEmpModalOpen && (
                            <div className={styles.modalBackdrop}>
                                <div className={styles.empModal}>
                                    <h3>담당자 선택 ({selectedEmployees.length}명 선택됨)</h3>
                                    <div className={styles.cancelButton}><i className='fas fa-xmark' onClick={() => setIsEmpModalOpen(false)}/></div>
                                    <div className={styles.modalContent}>
                                        {departmentMembers
                                        .sort((a, b) => a.name.localeCompare(b.name))
                                        .filter((emp) => emp.empno !== loginEmpData.userId && emp.empno)
                                        .map(emp => (
                                            <div 
                                                key={emp.empno}
                                                className={`${styles.empItem} ${
                                                    selectedEmployees.some(e => e.empno === emp.empno) ? styles.selected : ''
                                                }`}
                                                onClick={() => handleEmployeeSelect(emp)}
                                            >
                                                <input 
                                                    className={styles.checkbox}
                                                    type="checkbox"
                                                    checked={selectedEmployees.some(e => e.empno === emp.empno)}
                                                    readOnly
                                                />
                                                {emp.name}
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.modalActions}>
                                        <button className={styles.confirmButton} onClick={handleConfirmSelection}>선택 완료</button>
                                        <button className={styles.modalCancelButton} onClick={() => setIsEmpModalOpen(false)}>취소</button>
                                    </div>
                                </div>
                            </div>
                        )}


                        <div style={{display: "flex"}}>
                            <span className={styles.contentLeft}>요청자</span>
                            <span className={styles.contentRight}>{loginEmpData.userName}</span>
                        </div>

                        <div className={styles.contentLeft}>상세정보</div>
                        <div>
                            <textarea ref={detailRef} className={styles.detailInputBox} type="text" placeholder="상세정보를 입력하세요." />
                        </div>
                    </div>
                </div>

                <div className={styles.rightBox}>
                    <div className={styles.dateBox}>
                        <div>업무 종료일까지</div>
                        <div style={{textAlign: "right"}}>-</div>    
                    </div>

                    <div className={styles.memoBox}>
                        메모
                        <textarea ref={memoRef} className={styles.memoInputBox} type="text" placeholder="메모를 입력하세요." />
                    </div>

                    <div className={styles.buttonBox}>
                        <span className={styles.buttonBoxLeft} onClick={handleCreate}>등록</span>
                        <span className={styles.buttonBoxRight} onClick={handleCancel}>취소</span>
                    </div>
                </div>
            </div>
        </div>
    );

} // Create

export default Create;
