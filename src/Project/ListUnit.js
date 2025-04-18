import { useState, useRef, useEffect } from 'react';
import { P_Modify } from '.';

import styles from './ListUnit.module.css';

import { RxLapTimer } from "react-icons/rx";

console.groupCollapsed('src/Project/ListUnit.js'); console.groupEnd();

const ListUnit = (project) => {
    console.group('ListUnit() invoked.'); console.groupEnd();

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

            <div className={styles.listUnit}>

                <div className={styles.content}>

                    <div className={styles.header}>

                        <div className={styles.pjtStatus}>
                            <div className={`${styles.status} ${styles.status1}`}>진행예정</div>
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

                    

                    <div className={styles.pjtName}>프로젝트명</div>

                    <div className={styles.pjtDetail}>
                        상세정보 상세정보 상세정보 상세정보 상세정보 상세정보 상세정보 상세정보 상세정보 상세정보 상세정보 상세정보 상세정보111 상세정보1111111111112222222222222222 
                    </div>

                    <div className={styles.manager}>
                        <label>담당자</label>김태영 팀장
                    </div>


                    <div className={styles.timeline}>
                        <label>기간</label> 2023.10.01 ~ 2023.10.31
                    </div>

                    <hr/>

                    <div className={styles.deadline}>
                        <RxLapTimer className={styles.icon} /> D-2
                    </div>

                </div>

            </div>

        </div>
    );
}


export default ListUnit;