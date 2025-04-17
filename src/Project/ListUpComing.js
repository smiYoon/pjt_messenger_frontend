import { useState, useRef, useEffect } from 'react';
import { P_Modify } from '.';

import styles from "./ListUpComing.module.css";
import { RxLapTimer } from "react-icons/rx";

console.groupCollapsed("src/Project/ListUpComing.js");console.groupEnd();

const ListUpComing = ({project, statusMapping}) => {
    // console.group("ListUpcommig(", project, statusMapping, ") invoked."); console.groupEnd();
    
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
            document.addEventListener('mousedown', handleClickOutside);
    
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [showEditMenu]);
    
        const handleEditButton = (index) => {
            if (showEditMenu === index) {
                setShowEditMenu(null);
            } else {
                setShowEditMenu(index);
            }
        };




    return (
        <div className={styles.body}>

            {isOpen && <P_Modify closeModal={closeProjectModify} />}
            
            <div className={styles.name}>{project.name}</div>

            <div className={styles.content}>

                <div className={styles.manager}>
                    <label>담당자</label>{project.pjtManager.name} {project.pjtManager.position}
                </div>

                <div className={styles.detail}>
                    <label>상세정보</label>{project.detail}
                </div>

            </div>

            <div className={styles.timeline}>

                <div className={styles.status}>{statusMapping[project.status]}</div>

                {
                    project.endDday === 0 ? (
                        <div className={styles.deadline} style={{color: 'red'}}><RxLapTimer className={styles.icon} /> D-day</div>
                    ) : project.endDday >= -3 && project.endDday < 0 ? (
                        <div className={styles.deadline} style={{color: 'red'}}><RxLapTimer className={styles.icon} /> D{project.endDday}</div>
                    ) : project.endDday < -3 ? (
                        <div className={styles.deadline} style={{color: 'blue'}}><RxLapTimer className={styles.icon} /> D{project.endDday}</div>
                    ) : project.endDday > 0 ? (
                        <div className={styles.deadline} style={{color: 'blue'}}><RxLapTimer className={styles.icon} /> D+{project.endDday}</div>
                    ) : null
                }

            </div>

            <div className={styles.dotBox}>
                
                <div onClick={() => handleEditButton(project.id)} className={styles.dot}>···</div>
                {showEditMenu === project.id && (
                    <div ref={editMenuRef} className={styles.editMenu}>
                        <div className={styles.dotBtnEdit} onClick={openProjectModify}>수정</div>
                        <hr></hr>
                        <div className={styles.dotBtnDelete}>삭제</div>
                    </div>
                )}

            </div>

        </div>
    );
};

export default ListUpComing;
