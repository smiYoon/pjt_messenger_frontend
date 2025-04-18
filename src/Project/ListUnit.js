import { useState, useRef, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import { P_Modify } from ".";

import styles from "./ListUnit.module.css";

import { RxLapTimer } from "react-icons/rx";

console.groupCollapsed("src/Project/ListUnit.js");
console.groupEnd();

const ListUnit = ({ project, statusMapping, onDelete, infoAlert, handleGetUpComingList, handleGetList }) => {
  // console.group('ListUnit(', project, statusMapping, ') invoked.'); console.groupEnd();

  const statusColor = (status) => {
    switch (status) {
      case 1:
        return { backgroundColor: "#AADCFF" };
      case 2:
        return { backgroundColor: "#FFF5AA" };
      case 3:
        return { backgroundColor: "#4FC765" };
      default:
        return { backgroundColor: "#6c47ff" };
    }
  };

  // 모달 상태
  const [isOpen, setIsOpen] = useState(false);
  const openProjectModify = () => setIsOpen(true);
  const closeProjectModify = () => setIsOpen(false);

  // 수정/삭제 메뉴 관리
  const [showEditMenu, setShowEditMenu] = useState(null);
  const editMenuRef = useRef(null);

  // 수정/삭제 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editMenuRef.current && !editMenuRef.current.contains(event.target)) {
        setShowEditMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEditMenu]);

  const handleEditButton = (index) => {
    if (showEditMenu === index) {
      setShowEditMenu(null);
    } else {
      setShowEditMenu(index);
    }
  };

  function checkDeleteConfirm() {
    Swal.fire({
      title: "프로젝트를 삭제하시겠습니까?",
      text: " ",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#999",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      allowOutsideClick: false,
      draggable: true,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("checkDeleteConfirm() invoked => yes ");
        onDelete(project.id);
      }
    });
  }

  return (
    <div className={styles.body}>
      {isOpen && (
        <P_Modify
          closeModal={closeProjectModify}
          statusMapping={statusMapping}
          project={project}
          infoAlert={infoAlert}
          handleGetList={handleGetList}
          handleGetUpComingList={handleGetUpComingList}
        />
      )}

      <div className={styles.listUnit}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.pjtStatus}>
              <div
                className={`${styles.status}`}
                style={statusColor(project.status)}
              >
                {statusMapping[project.status]}
              </div>
            </div>

            <div className={styles.dotBox}>
              <div
                onClick={() => handleEditButton(project.id)}
                className={styles.dot}
              >
                ···
              </div>
              {showEditMenu === project.id && (
                <div ref={editMenuRef} className={styles.editMenu}>
                  <div
                    className={styles.dotBtnEdit}
                    onClick={openProjectModify}
                  >
                    수정
                  </div>
                  <hr></hr>
                  <div
                    className={styles.dotBtnDelete}
                    onClick={checkDeleteConfirm}
                  >
                    삭제
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={styles.pjtName}>{project.name}</div>

          <div className={styles.pjtDetail}>{project.detail}</div>

          <div className={styles.manager}>
            <label>담당자</label>
            {project.pjtManager.name} {project.pjtManager.position}
          </div>

          <div className={styles.timeline}>
            <label>기간</label> {project.startDate} ~ {project.endDate}
          </div>

          <hr />

          {project.endDday === 0 ? (
            <div className={styles.deadline} style={{ color: "red" }}>
              <RxLapTimer className={styles.icon} /> D-day
            </div>
          ) : project.endDday >= -3 && project.endDday < 0 ? (
            <div className={styles.deadline} style={{ color: "red" }}>
              <RxLapTimer className={styles.icon} /> D{project.endDday}
            </div>
          ) : project.endDday < -3 ? (
            <div className={styles.deadline} style={{ color: "#6c47ff" }}>
              <RxLapTimer className={styles.icon} /> D{project.endDday}
            </div>
          ) : project.endDday > 0 ? (
            <div className={styles.deadline} style={{ color: "#6c47ff" }}>
              <RxLapTimer className={styles.icon} /> D+{project.endDday}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ListUnit;
