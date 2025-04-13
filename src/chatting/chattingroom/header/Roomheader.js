import { useState,useRef, useEffect } from 'react';
import styles from './Roomheader.module.css';
import ChatEmpList from '../ChatEmpList';

const Roomheader = ({ selectedChatRoom }) => {
    const empListRef = useRef(null);

    // 해당 채팅방 id로 데이터 받아오기 (채팅방 이름, 아이콘, 프로젝트 배지)


    // 채팅방 인원 리스트
    const [showEmpList, setShowEmpList] = useState(false);

    const onEmplist = () => {
        setShowEmpList(prev => !prev);
    }

    // 바깥 클릭 감지
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (empListRef.current && !empListRef.current.contains(event.target)) {
                setShowEmpList(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (         
            <>
                <div className={styles.header}>
                    <div className={styles.chatname}>{selectedChatRoom?.name || "채팅방 이름"}</div>

                        <div className={styles.iconbox}>
                            <div className={styles.empicon}></div>
                            <div className={styles.empicon}></div>
                            <div className={styles.empicon}></div>
                            <div className={styles.empicon} onClick={onEmplist}></div>
                        </div>

                        <div className={styles.projecticon}>{selectedChatRoom?.project?.name || "프로젝트 이름"}</div>
                </div>

                {showEmpList && (
                    <div ref={empListRef}>
                        <ChatEmpList employees={selectedChatRoom.chatEmployees}/>
                    </div>
                )}
            </>
    )
}

export default Roomheader;