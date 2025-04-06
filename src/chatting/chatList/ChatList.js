import styles from './ChatList.module.css';

const ChatList = () => {

    // 채팅방 리스트 받아오기 (채팅방이름, 등록한사람 아이콘, 프로젝트 유무)
    
    // 버튼 클릭 시 채팅방 생성 화면
    const CreateChat = () =>{
         
    }

    return (

                <div className={styles.chatlist}>

                    <div className={styles.topbox}>
                        <div className={styles.listtitle}>채팅방 리스트</div>
                        <button className={styles.createicon} onClick={CreateChat}>+</button>
                    </div>

                    <div className={styles.chatroombox}>

                    <div className={styles.empicon}></div>

                    <div className={styles.rightbox}>
                        <div className={styles.projecticon}>프로젝트 뱃지</div>
                        <div className={styles.chatname}>채팅방 이름</div>
                    </div>

                    </div>

                    <div className={styles.chatroombox}>

                    <div className={styles.empicon}></div>

                    <div className={styles.rightbox}>
                        <div className={styles.projecticon}>프로젝트 뱃지</div>
                        <div className={styles.chatname}>채팅방 이름</div>
                    </div>

                    </div>

                    
                     

                </div>

    )
}

export default ChatList;