import styles from './ChatEmpList.module.css';

const ChatEmpList = ({ employees }) => {

    // 해당 채팅방 id로 데이터 받아오기 (채팅방 내 인원 리스트)

    return ( 
            
                <div className={styles.container}>
                    <div className={styles.chatname}>채팅방 인원</div>
                    
                    <div className={styles.emplist}>
                        {employees.map((emp, idx) => (
                            <div key={idx} className={styles.emp}>
                                <div className={styles.empimg}></div>
                                <div className={styles.empname}>{emp.employee.name || ""}</div>
                            </div>
                        ))}
                    </div>

                </div>  
            
    ) 
}

export default ChatEmpList;