import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import { P_Modify } from ".";

import styles from "./ListUpComing.module.css";
import { RxLapTimer } from "react-icons/rx";
import { useLoadScript } from '../LoadScriptContext';

// console.groupCollapsed("src/Project/ListUpComing.js");console.groupEnd();

const ListUpComing = ({ project, onDelete, infoAlert, handleGetUpComingList, handleGetList }) => {
  // console.group("ListUpcommig(", project, statusMapping, ") invoked."); console.groupEnd();

  const { decodedToken, isTopLevel, empPositionMapping, pjtStatusMapping } = useLoadScript();

  // 모달 상태
  const [isOpen, setIsOpen] = useState(false);
  const openProjectModify = () => {
    setIsOpen(true);
    setShowEditMenu(null);
  }
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
          project={project}
          infoAlert={infoAlert}
          handleGetList={handleGetList}
          handleGetUpComingList={handleGetUpComingList}
        />
      )}

      <div className={styles.name}>
        <div className={styles.nameBox}>
          {project.name}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.manager}>
          <label>담당자</label>
          {empPositionMapping[project.pjtManager.position]} {project.pjtManager.name}
        </div>

        <div className={styles.detail}>
          <label>상세정보</label>
          {project.detail}
        </div>
      </div>

      <div className={styles.timeline}>
        <div className={styles.status}>{pjtStatusMapping[project.status]}</div>

        {project.endDday === 0 ? (
          <div className={styles.deadline} style={{ color: "#f54336" }}>
            <RxLapTimer className={styles.icon} /> D-day
          </div>
        ) : project.endDday >= -5 && project.endDday < 0 ? (
          <div className={styles.deadline} style={{ color: "#f54336" }}>
            <RxLapTimer className={styles.icon} /> D{project.endDday}
          </div>
        ) : project.endDday < -5 ? (
          <div className={styles.deadline} style={{ color: "#2b7eb6" }}>
            <RxLapTimer className={styles.icon} /> D{project.endDday}
          </div>
        ) : project.endDday > 0 ? (
          <div className={styles.deadline} style={{ color: "#2b7eb6" }}>
            <RxLapTimer className={styles.icon} /> D+{project.endDday}
          </div>
        ) : null}
      </div>

      <div className={styles.dotBox}>
        <div
          onClick={() => handleEditButton(project.id)}
          className={styles.dot}
        >
          ···
        </div>

        {showEditMenu === project.id  
          && (
            (decodedToken.empno === project.pjtCreator.empno || decodedToken.empno === project.pjtManager.empno || isTopLevel) ? (
                  <div ref={editMenuRef} className={styles.editMenu}>
                    <div className={styles.dotBtnEdit} onClick={openProjectModify}>
                      수정
                    </div>
                    <hr></hr>
                    <div className={styles.dotBtnDelete} onClick={checkDeleteConfirm}>
                      삭제
                    </div>
                  </div>
              ) : ( 
                <div ref={editMenuRef} className={styles.editMenu}>
                  <div className={styles.dotBtnNone}>권한없음</div>
                </div> 
              )
          )
        }



      </div>
    </div>
  );
};

export default ListUpComing;
