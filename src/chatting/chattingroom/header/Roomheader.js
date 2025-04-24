import { useState,useRef, useEffect } from 'react';
import styles from './Roomheader.module.css';
import ChatEmpList from '../ChatEmpList';
import profile from '../../../Member/img/Default.png';

const Roomheader = ({ selectedChatRoom }) => {
    const empListRef = useRef(null);
    const toggleBtnRef = useRef(null); // 토글 버튼용 ref

    const [showTooltip, setShowTooltip] = useState(false);
    // 채팅방 인원 리스트
    const [showEmpList, setShowEmpList] = useState(null);

    const onToggleEmpList = () => {
        setShowEmpList(prev => !prev);
    }

    // 바깥 클릭 감지
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (
            empListRef.current &&
            !empListRef.current.contains(event.target) &&
            toggleBtnRef.current &&
            !toggleBtnRef.current.contains(event.target)
          ) {
            setShowEmpList(false);
          }
    };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const MAX_ICONS = 3; // 표시할 인원 수 제한 (리스트 아이콘 전까지)
    const employees = (selectedChatRoom?.chatEmployees || []).filter(emp => emp.enabled);
    // 아이콘으로 표시할 사람들 (항상 MAX_ICONS 명만 보여줌)
    const displayEmps = employees.slice(0, MAX_ICONS);
    // 나머지 인원 수 (아이콘으로 표시되지 않은 사람 수)
    const remainingCount = employees.length - MAX_ICONS;

    const statusColor = (status) => {
        switch (status) {
          case 1:
            return { backgroundColor: "#5bc0de", color: "#fff"};
          case 2:
            return { backgroundColor: "#337ab7", color: "#fff" };
          case 3:
            return { backgroundColor: "#5cb85c", color: "#fff" };
          default:
            return { backgroundColor: "#6c47ff" };
        }
    };


    return (         
            <>
                <div className={styles.header}>
                    <div className={styles.chatname}>{selectedChatRoom?.name || "채팅방 이름"}</div>

                    <div className={styles.iconbox}>
                        {displayEmps.map((emp, idx) => (
                            <div key={idx} className={styles.empicon} title={emp.name}>
                                <img src= {`https://localhost/${emp?.employee?.empno}.png`} onError={e => { e.currentTarget.src = profile; }} alt={emp.name} className={styles.empImg} />
                            </div>
                        ))}

                        {selectedChatRoom ?
                        <div className={styles.list} onClick={onToggleEmpList} ref={toggleBtnRef}>
                            +{remainingCount > 0 ? remainingCount : ""}
                        </div> : ""}
                    </div>

                    <div  className={`${styles.projectBadgeWrapper} ${selectedChatRoom?.project?.name ? '' :  styles.disabled}`} style={statusColor(selectedChatRoom?.project?.status)}>
                        <div
                            className={styles.colorDot}
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                        />

                        {showTooltip && (
                        <div className={styles.tooltip}>
                            {selectedChatRoom.project.name}
                        </div>
                        )}
                    
                    </div>

                </div>
                {showEmpList && (
                    <div ref={empListRef} className={styles.empListBox}>
                        <ChatEmpList employees={Array.isArray(selectedChatRoom?.chatEmployees) ? employees : []} />
                    </div>
                )}
                
            </>
    )
}

export default Roomheader;