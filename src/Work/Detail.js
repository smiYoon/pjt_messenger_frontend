import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useLoadScript } from '../LoadScriptContext.js';

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";

import styles from "./Detail.module.css";

registerLocale("ko", ko);

console.groupCollapsed("src/Work/Detail.js");console.groupEnd();


const Detail = () => {
    console.debug("Detail() invoked.");

    const navigate = useNavigate();

    const nameRef = useRef();
    const detailRef = useRef();
    const memoRef = useRef();
    const { workId } = useParams();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [employeeData, setEmployeeData] = useState([]);
    var userId = "E2405001";
    var userId = "E2005003";
    // E2405001
    // E2406002 , E2005003
    var userDeptId = "27"; // 8 , 27
    // var userDeptId = "8"; // 8 , 27
    // var userDeptId = "1"; // 8 , 27
    var userName = "홍시리";
    var userStatus = 1; // 1, 2, 3, 4, 5, 9
    const [userData, setUserDate] = useState(); // 로그인한 사람의 정보
    const [uploadData, setUploadData] = useState({
            name: "",
            detail: "",
            memo: "",
            status: 1,
            type: 1,
            startDate: "",
            endDate: "",
            employee: userData,
    });
    const [empnos, setEmpnos] = useState([]);

    const handleRemoveEmpno = (empnoToRemove) => {
        setEmpnos(prevEmpnos => prevEmpnos.filter(empno => empno !== empnoToRemove));
        console.log("delete complete : ", empnoToRemove);
    }; // handleRemoveEmpno
    


    useEffect(() => {
        setUploadData(prev => ({
            ...prev,
            startDate: startDate,
            endDate: endDate,
        }));
    }, [startDate, endDate]);
    

    useEffect(() => {
        console.log("employeeData is :", employeeData);
        console.log("uploadData is :", uploadData);
    }, [uploadData]);

    useEffect(() => {       
            const fetchData = async () => {
                try {
                    setEmployeeData([]); // 초기화
                    setLoading(true); // 로딩 시작
    
                    const response = await fetch(`https://localhost:443/work/${workId}`);
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    } // if
                    const data = await response.json();
                    setEmployeeData(data);
                    setEmpnos(data.workEmployees.map(emp => emp.employee.empno));
                    setUploadData({
                        name: data.name,
                        detail: data.detail,
                        memo: data.memo,
                        status: data.status,
                        type: data.type,
                        startDate: data.startDate,
                        endDate: data.endDate,
                        employee: userId,
                    });
                } catch (error) {
                    console.error("Fetch error:", error);
                } finally{
                    setLoading(false); // 로딩 종료
                }// try-catch-finally
              };
              fetchData();
    }, []);

    const getDiffDays = (startDateStr, endDateStr) => {
        const start = new Date(startDateStr);
        const end = new Date(endDateStr);
        const diffMillis = end.getTime() - start.getTime();
        return diffMillis / (1000 * 60 * 60 * 24);
    } // getDiffDays


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
    }, [startDate]);

    const formatDate = (date) => {
        if (typeof date === "string") return date;
        return date ? date.toISOString().slice(0, 10) : "";
    };

    const handleUpdate = () => {
        Swal.fire({
            text: "수정하시겠습니까?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "수정",
            cancelButtonText: "취소",
            confirmButtonColor: "#6C47FF",
            cancelButtonColor: "#FFFFFF",
            customClass: {
                cancelButton: styles.updateCancelButton,
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                if(uploadData.startDate == null || uploadData.endDate == null || uploadData.startDate.length === 0 || uploadData.endDate.length === 0) {
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
                    startDate: formatDate(uploadData.startDate),
                    endDate: formatDate(uploadData.endDate),
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
                
                const response = await fetch(`https://localhost:443/work/${employeeData.id}?${params.toString()}`, {
                    method: "PUT"
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
                    Swal.fire("수정 완료", "업무가 수정되었습니다.", "success");
                    navigate('/work');
                } else {
                    Swal.fire("수정 실패", "업무 수정에 실패했습니다.", "error");
                    // 실패 시 화면에 머무름
                } // if-else

            } // if
        }); // Swal.fire
    }; // handleCreate


    const handleDelete = () => {
        Swal.fire({
            text: "정말 삭제하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "삭제",
            cancelButtonText: "취소",
            confirmButtonColor: "#6C47FF",
            cancelButtonColor: "#FFFFFF",
            customClass: {
                cancelButton: styles.deleteCancelButton,
            },
        }).then((result) => {
            if (result.isConfirmed) {
                // 서버에 데이터 전송
                const fetchData = async () => {
                    try {
                        const response = await fetch(`https://localhost:443/work/${employeeData.id}`, {
                            method: "DELETE"
                        });
                        if (response.ok) {
                        Swal.fire("삭제 완료", "업무가 삭제되었습니다.", "success");
                        navigate('/work');
                        } // if
                    } catch (error) { 
                        console.error("Fetch error:", error);
                    } // try-catch
                }
                fetchData();
            } // if
        }); // Swal.fire
    }; // handleDelete  

    const handleCancel = () => {
        Swal.fire({
            text: "리스트 화면으로 이동하시겠습니까? 이동하시면 변경사항이 저장되지 않습니다.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "예",
            cancelButtonText: "아니오",
            confirmButtonColor: "#6C47FF",
            cancelButtonColor: "#FFFFFF",
            customClass: {
                cancelButton: styles.cancelButton,
            },
        }).then((result) => {
            if (result.isConfirmed) {
            navigate('/work');
            } // if
        }); // Swal.fire
    }; // handleCancel

    // {loading? "로딩중..." : employeeData?.employee?.name || "-"}

    return(
        <div className={styles.container}>
            <span className={styles.leftBox}>
                <div style={{display: "flex", position: "relative"}}>
                    <i style={{cursor: "pointer"}} className='fas fa-arrow-left' onClick={handleCancel}/>
                    <span className={styles.pageDetail}>업무 상세/수정</span>
                </div>

                <div className={styles.leftContent}>
                    <div>
                        <input ref={nameRef} className={styles.nameInputBox} type="text" placeholder="업무명을 입력하세요." defaultValue={uploadData.name}/>
                    </div>
                    <div/>

                    <div style={{display: "flex"}}>
                        <span className={styles.contentLeft}>상태</span>
                        <span className={styles.contentRight}>
                            <span className={`${styles.status1} ${uploadData.status === 1 ? styles.on : ""}`} onClick={() => {
                                if(userStatus == 1 && uploadData.status == 4) {
                                    alert("팀원은 완료된 업무를 변경 할 수 없습니다");
                                } else {handleStatusClick(1)} // if-else
                                }}>진행예정</span>
                            <span className={`${styles.status2} ${uploadData.status === 2 ? styles.on : ""}`} onClick={() => {
                                if(userStatus == 1 && uploadData.status == 4) {
                                    alert("팀원은 완료된 업무를 변경 할 수 없습니다");
                                } else {handleStatusClick(2)} // if-else
                                }}>진행중</span>
                            <span className={`${styles.status3} ${uploadData.status === 3 ? styles.on : ""}`} onClick={() => {
                                if(userStatus == 1 && uploadData.status == 4) {
                                    alert("팀원은 완료된 업무를 변경 할 수 없습니다");
                                } else {handleStatusClick(3)} // if-else
                                }}>완료 대기</span>
                            <span className={`${styles.status4} ${uploadData.status === 4 ? styles.on : ""}`} onClick={() => {
                                if(userStatus == 1) {
                                    alert("팀원은 업무완료를 할 수 없습니다");
                                } else {handleStatusClick(4)} // if-else
                                }}>완료</span>
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
                                selected={uploadData.startDate}
                                onChange={(date) => setStartDate(date)}
                                selectsStart
                                startDate={uploadData.startDate}
                                endDate={uploadData.endDate}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="시작일"
                            />
                            <span>~</span>
                            <DatePicker
                                className={styles.reactDatepicker}
                                filterDate={(date) => date >= new Date()}
                                selected={uploadData.endDate}
                                onChange={(date) => setEndDate(date)}
                                selectsEnd
                                startDate={uploadData.startDate}
                                endDate={uploadData.endDate}
                                minDate={uploadData.startDate} 
                                dateFormat="yyyy-MM-dd"
                                placeholderText="종료일"
                            />
                        </span>
                    </div>

                    <div style={{display: "flex"}}>
                        <span className={styles.contentLeft}>담당자 </span>
                        <span className={styles.contentRight}>
                            {loading
                                ? "로딩중..."
                                : (employeeData?.workEmployees?.length > 0
                                    ? employeeData.workEmployees
                                    .filter(data => empnos.includes(data.employee.empno))
                                    .map((data, idx) => (
                                        <span className={styles.nameCircle} onClick={() => handleRemoveEmpno(data.employee.empno)} key={data.employee?.empno || idx} >
                                            {data.employee?.name}
                                            {idx < employeeData.workEmployees.length - 1 ? ", " : ""}
                                        </span>
                                    ))
                                    : "-")
                            }
                            {" "}<i style={{cursor: "pointer"}} className='fas fa-circle-plus'/>
                        </span>
                    </div>

                    <div style={{display: "flex"}}>
                        <span className={styles.contentLeft}>요청자</span>
                        <span className={styles.contentRight}>{loading? "로딩중..." : employeeData?.employee?.name || "-"}</span>
                    </div>

                    <div className={styles.contentLeft}>상세정보</div>
                    <div>
                        <textarea ref={detailRef} className={styles.detailInputBox} type="text" placeholder="상세정보를 입력하세요." defaultValue={uploadData.detail}/>
                    </div>
                </div>
            </span>

            <span className={styles.rightBox}>
                <div className={styles.dateBox}>
                    <div>업무 종료일까지</div>
                    <div style={{textAlign: "right"}}>
                        {loading? "로딩중..." : (`D-${getDiffDays(employeeData.startDate, employeeData.endDate)}`) || "-"}
                    </div>    
                </div>

                <div className={styles.memoBox}>
                    메모
                    <textarea ref={memoRef} className={styles.memoInputBox} type="text" placeholder="메모를 입력하세요." defaultValue={uploadData.memo}/>
                </div>

                <div className={styles.buttonBox}>
                    <span className={styles.buttonBoxLeft} onClick={() => {
                        if(uploadData.status == 4) {
                            alert("완료된 업무는 수정할 수 없습니다.");
                        } else {handleUpdate()} // if-else
                        }}>수정</span>
                    <span className={styles.buttonBoxRight} onClick={handleDelete}>삭제</span>
                </div>
            </span>
        </div>
    );

} // Detail

export default Detail;
