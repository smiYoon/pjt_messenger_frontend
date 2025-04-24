import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from "./List.module.css";
import { WorkBox } from "./index.js";
import { useLoadScript } from "../LoadScriptContext.js";

console.groupCollapsed("src/Work/List.js");
console.groupEnd();

const List = () => {
    console.debug("List() invoked.");

    const navigate = useNavigate();
    const { decodedToken, token } = useLoadScript();
    const [work, setWork] = useState("requested"); // 담당업무 = managed, 요청업무 = requested
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
        }
    }, [decodedToken]); // 로그인한 사람

    useEffect(() => {
        if (loginEmpData.userId && loginEmpData.userName) {
            setPickedEmployee({
                empno: loginEmpData.userId,
                name: loginEmpData.userName,
            });
        }
    }, [loginEmpData]);

    const [loading, setLoading] = useState(false);
    const [pickedEmployee, setPickedEmployee] = useState({
        empno: "",
        name: "",
    }); // 현재 선택된 사원
    const [employeeData, setEmployeeData] = useState([]);
    const [departmentMembers, setDepartmentMembers] = useState([]); // 부서원들
    const [isEmpModalOpen, setIsEmpModalOpen] = useState(false);

    const handleToggle = () => {
        setWork(work === "managed" ? "requested" : "managed");
    }; // handleToggle

    const handleChangePickedEmployee = (empno, name) => {
        setPickedEmployee({ empno, name });
        if (empno !== loginEmpData.userId) {
            setWork("managed");
        } else {
            setWork("requested");
        }// if-else

        const fetchData = async () => {
            try {
                console.log("handleChangePickedEmployee() invoked.");
                setLoading(true); // 로딩 시작
                setEmployeeData([]); // 초기화
                const params = new URLSearchParams({
                    work: (empno !== loginEmpData.userId) ? "managed" : "requested",
                    employee: empno,
                });

                // 서버에 데이터 전송
                const response = await fetch(`https://localhost/work?${params}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                } // if
                const data = await response.json();
                setEmployeeData(data);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false); // 로딩 종료
            } // try-catch-finally
        };
        fetchData();
    }; // handleClick

    useEffect(() => {
        const fetchUserData = async () => {
            if (!loginEmpData.userDeptId) return; // 값 없으면 실행 안함
            try {
                setLoading(true); // 로딩 시작
                setPickedEmployee({
                    empno: loginEmpData.userId,
                    name: loginEmpData.userName,
                }); // 현재 선택된 사원

                const response = await fetch(
                    `https://localhost/department/${loginEmpData.userPosition === 9 ? 1 : loginEmpData.userDeptId
                    }`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                } // if
                const data = await response.json();

                console.log("data is:", data);

                // 부서원 정보 추출 (empno, name만)
                if (loginEmpData.userPosition === 9) {
                    // 모든 부서의 사원 수집
                    const allEmployees = [];
                    const collectEmployees = (departments) => {
                        departments.forEach((dept) => {
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
                        new Map(allEmployees.map((emp) => [emp.empno, emp])).values()
                    ); // uniqueEmployees

                    setDepartmentMembers(
                        uniqueEmployees.map((emp) => ({
                            empno: emp.empno,
                            name: emp.name,
                        })) // map
                    ); // setDepartmentMembers
                } else if (data.children?.length > 0) {
                    const topMembers = data.children.map((dept) => {
                        if (Array.isArray(dept.employees) && dept.employees.length > 0) {
                            const topEmp = dept.employees.reduce(
                                (max, emp) => (emp.position > max.position ? emp : max),
                                dept.employees[0]
                            );
                            return {
                                empno: topEmp.empno,
                                name: topEmp.name,
                            };
                        } else {
                            return {
                                empno: null,
                                name: null,
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
                    const maxPosition = Math.max(
                        ...allEmployees.map((emp) => emp.position)
                    );

                    // 최고 position 제외 + empno, name만 추출
                    const filteredEmployees = allEmployees
                        .filter((emp) => emp.position !== maxPosition)
                        .map((emp) => ({ empno: emp.empno, name: emp.name }));

                    setDepartmentMembers(filteredEmployees);
                } // if-else
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false); // 로딩 종료
            } // try-catch-finally
        };
        fetchUserData();
    }, [loginEmpData.userDeptId, loginEmpData.userId, loginEmpData.userName, loginEmpData.userPosition, token]); // useEffect

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("fetchData() invoked.");
                setEmployeeData([]); // 초기화
                setLoading(true); // 로딩 시작
                // 서버에 데이터 전송
                const params = new URLSearchParams({
                    work: work,
                    employee: pickedEmployee.empno, // 항상 최신 pickedEmployee 사용
                });

                const response = await fetch(`https://localhost/work?${params}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                } // if
                const data = await response.json();
                setEmployeeData(data);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false); // 로딩 종료
            } // try-catch-finally
        };
        // pickedEmployee.empno가 있을 때만 fetch 실행
        if (pickedEmployee.empno) fetchData();
    }, [work, pickedEmployee, token]); // useEffect

    const [draggedWork, setDraggedWork] = useState(null);

    const handleDragStart = (e, item) => {
        if (item.status === 4) {
            alert("완료된 업무는 상세 화면에서 수정해주십시오.");
            e.preventDefault();
            return;
        } // if
        setDraggedWork(item);
    }; // handleDragStart

    const handleDragOver = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add(styles.dragover);
        e.dataTransfer.dropEffect = "move";
    }; // handleDragOver

    const handleDragLeave = (e) => {
        e.currentTarget.classList.remove(styles.dragover);
    }; // handleDragLeave

    const handleDrop = (newStatus) => async (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove(styles.dragover);

        if (!draggedWork) return;

        // 완료로 드롭하는데, 팀원(position=1)인 경우
        if (newStatus === 4 && loginEmpData.userPosition === 1) {
            alert("팀원은 업무완료를 할 수 없습니다");
            setDraggedWork(null);
            return;
        } // if

        // 임시 데이터 저장 (롤백용)
        const originalData = employeeData;

        try {
            // 1. 기존 데이터 조회
            const currentDataResponse = await fetch(
                `https://localhost/work/${draggedWork.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!currentDataResponse.ok) throw new Error("데이터 조회 실패");
            const currentData = await currentDataResponse.json();

            // 2. status만 변경된 새 데이터 생성
            const updatedData = {
                ...currentData,
                status: newStatus,
            };

            const params = new URLSearchParams();
            // 원시값 필드
            params.append("id", updatedData.id);
            params.append("name", updatedData.name);
            params.append("detail", updatedData.detail);
            params.append("memo", updatedData.memo);
            params.append("status", updatedData.status);
            params.append("type", updatedData.type);
            params.append("startDate", updatedData.startDate);
            params.append("endDate", updatedData.endDate);
            params.append("enabled", updatedData.enabled);

            // employee: empno만 전송
            if (updatedData.employee && updatedData.employee.empno) {
                params.append("employee", updatedData.employee.empno);
            }

            // workEmployees: empno만 여러 번 append
            if (Array.isArray(updatedData.workEmployees)) {
                updatedData.workEmployees.forEach((empObj) => {
                    if (empObj.employee && empObj.employee.empno) {
                        params.append("empnos", empObj.employee.empno);
                    } else if (empObj.empno) {
                        params.append("empnos", empObj.empno);
                    }
                });
            }

            console.log("params is :", params.toString());

            // 서버 동기화
            const response = await fetch(
                `https://localhost/work/${draggedWork.id}?${params.toString()}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            ); // response
            if (!response.ok) throw new Error("서버 업데이트 실패");

            // 성공 시 상태 업데이트
            setEmployeeData((prev) =>
                prev.map((work) =>
                    work.id === draggedWork.id ? { ...work, status: newStatus } : work
                )
            ); // setEmployeeData
        } catch (error) {
            console.error("업데이트 실패:", error);
            setEmployeeData(originalData); // 롤백
            alert("상태 변경에 실패했습니다.");
        } // try-catch
        setDraggedWork(null);
    }; // handleDrop

    const status1List = employeeData.filter((item) => item.status === 1);
    const status2List = employeeData.filter((item) => item.status === 2);
    const status3List = employeeData.filter((item) => item.status === 3);
    const status4List = employeeData.filter((item) => item.status === 4);

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.pageTitle}>
                    {loading ? null : pickedEmployee.name}의 업무 리스트
                </div>

                <div className={styles.pageMiddle}>
                    <span className={styles.middleLeft}>
                        <span
                            onClick={() =>
                                handleChangePickedEmployee(
                                    loginEmpData.userId,
                                    loginEmpData.userName
                                )
                            }
                            className={`${styles.nameCircle} ${pickedEmployee.empno === loginEmpData.userId
                                    ? styles.selected
                                    : ""
                                }`}
                        >
                            {loginEmpData.userName}
                        </span>
                        {loading ? null : (
                            <>
                                {/* 최대 4개만 출력 */}
                                {departmentMembers
                                    .sort((a, b) => a.name.localeCompare(b.name))
                                    .filter((emp) => emp.empno !== loginEmpData.userId && emp.empno)
                                    .slice(0, 4)
                                    .map((child, idx) => (
                                        <span
                                            onClick={() =>
                                                handleChangePickedEmployee(child.empno, child.name)
                                            }
                                            className={`${styles.nameCircle} ${pickedEmployee.empno === child.empno
                                                    ? styles.selected
                                                    : ""
                                                }`}
                                            key={child.id || idx}
                                        >
                                            {child.name}
                                        </span>
                                    ))}

                                {/* 5개 이상일 때 추가 버튼 */}
                                {departmentMembers.length > 4 && (
                                    <button
                                        style={{ cursor: "pointer" }}
                                        className={styles.empPlusButton}
                                        onClick={() => setIsEmpModalOpen(true)}
                                    >
                                        <i className="fas fa-plus" />
                                        {departmentMembers.length - 4}
                                    </button>
                                )}

                                {isEmpModalOpen && (
                                    <div className={styles.modalBackdrop}>
                                        <div className={styles.empModal}>
                                            <div className={styles.modalActions}>
                                                <h3>사원 리스트</h3>
                                                <button
                                                    className={styles.cancelButton}
                                                    onClick={() => setIsEmpModalOpen(false)}
                                                >
                                                    닫기
                                                </button>
                                            </div>
                                            <div className={styles.modalContent}>
                                                <div
                                                    className={`${styles.empItem} ${pickedEmployee.empno === loginEmpData.userId
                                                            ? styles.selected
                                                            : ""
                                                        }`}
                                                    onClick={() => {
                                                        handleChangePickedEmployee(
                                                            loginEmpData.userId,
                                                            loginEmpData.userName
                                                        );
                                                        setIsEmpModalOpen(false);
                                                    }}
                                                >
                                                    {loginEmpData.userName}
                                                </div>
                                                {departmentMembers
                                                    .sort((a, b) => a.name.localeCompare(b.name)) // 이름 기준 정렬
                                                    .filter((emp) => emp.empno !== loginEmpData.userId && emp.empno)
                                                    .map((emp, idx) => (
                                                        <div
                                                            key={emp.empno || idx}
                                                            className={`${styles.empItem} ${pickedEmployee.empno === emp.empno
                                                                    ? styles.selected
                                                                    : ""
                                                                }`}
                                                            onClick={() => {
                                                                handleChangePickedEmployee(emp.empno, emp.name);
                                                                setIsEmpModalOpen(false);
                                                            }}
                                                        >
                                                            {emp.name}
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </span>

                    <span className={styles.middleRight}>
                        <div className={styles.toggleWrapper}>
                            <span style={{fontSize: '1.2rem'}}>담당업무 </span>
                            <span className={styles.toggle_container} onClick={handleToggle}>
                                <span
                                    className={`${styles.toggle_button} ${work === "managed" ? styles.managed : styles.requested
                                        }`}
                                />
                            </span>
                            <span style={{fontSize: '1.2rem'}} >요청업무 </span>
                        </div>

                        <span>
                            <button
                                className={styles.addButton}
                                onClick={() => {
                                    if ((loginEmpData.userPosition || 0) === 1) {
                                        return alert("팀원은 업무등록을 할 수 없습니다");
                                    } else {
                                        navigate("/work/create");
                                    } // if
                                }}
                            >
                                <i
                                    className="fas fa-circle-plus"
                                    style={{ color: "white", backgroundColor: "#6C47FF" }}
                                />{" "}
                                업무 등록{" "}
                            </button>
                        </span>
                    </span>
                </div>

                <div className={styles.pageBottom}>
                    <span className={styles.pageBottom_Box}>
                        <div>
                            진행 예정{" "}
                            <span className={styles.bottomNumber}>{status1List.length}</span>
                            <hr className={styles.hr} />
                        </div>

                        <div
                            className={styles.bottom_background}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop(1)}
                        >
                            {loading ? (
                                <div className={styles.loadingText}>로딩중...</div>
                            ) : status1List.length === 0 ? (
                                <div className={styles.emptyText}>업무가 없습니다.</div>
                            ) : (
                                status1List.map((item) => (
                                    <WorkBox
                                        key={item.id}
                                        data={item}
                                        loginEmpData={loginEmpData}
                                        token={token}
                                        className={styles.WorkBox}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, item)}
                                    />
                                ))
                            )}
                        </div>
                    </span>

                    <span className={styles.pageBottom_Box}>
                        <div>
                            진행중{" "}
                            <span className={styles.bottomNumber}>{status2List.length}</span>
                            <hr className={styles.hr} />
                        </div>

                        <div
                            className={styles.bottom_background}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop(2)}
                        >
                            {loading ? (
                                <div className={styles.loadingText}>로딩중...</div>
                            ) : status2List.length === 0 ? (
                                <div className={styles.emptyText}>업무가 없습니다.</div>
                            ) : (
                                status2List.map((item) => (
                                    <WorkBox
                                        key={item.id}
                                        data={item}
                                        loginEmpData={loginEmpData}
                                        token={token}
                                        className={styles.WorkBox}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, item)}
                                    />
                                ))
                            )}
                        </div>
                    </span>

                    <span className={styles.pageBottom_Box}>
                        <div>
                            완료 대기{" "}
                            <span className={styles.bottomNumber}>{status3List.length}</span>
                            <hr className={styles.hr} />
                        </div>

                        <div
                            className={styles.bottom_background}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop(3)}
                        >
                            {loading ? (
                                <div className={styles.loadingText}>로딩중...</div>
                            ) : status3List.length === 0 ? (
                                <div className={styles.emptyText}>업무가 없습니다.</div>
                            ) : (
                                status3List.map((item) => (
                                    <WorkBox
                                        key={item.id}
                                        data={item}
                                        loginEmpData={loginEmpData}
                                        token={token}
                                        className={styles.WorkBox}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, item)}
                                    />
                                ))
                            )}
                        </div>
                    </span>

                    <span className={styles.pageBottom_Box}>
                        <div>
                            완료{" "}
                            <span className={styles.bottomNumber}>{status4List.length}</span>
                            <hr className={styles.hr} />
                        </div>

                        <div
                            className={styles.bottom_background}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop(4)}
                        >
                            {loading ? (
                                <div className={styles.loadingText}>로딩중...</div>
                            ) : status4List.length === 0 ? (
                                <div className={styles.emptyText}>업무가 없습니다.</div>
                            ) : (
                                status4List.map((item) => (
                                    <WorkBox
                                        key={item.id}
                                        data={item}
                                        loginEmpData={loginEmpData}
                                        token={token}
                                        className={styles.WorkBox}
                                        draggable={item.status < 4}
                                        onDragStart={(e) => handleDragStart(e, item)}
                                    />
                                ))
                            )}
                        </div>
                    </span>
                </div>
            </div>
        </div>
    );
}; // List

export default List;
