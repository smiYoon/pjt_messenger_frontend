import styles from './ChatList.module.css';

const ChatList = ({onCreateClick }) => {

    // 채팅방 리스트 받아오기 (채팅방이름, 등록한사람 아이콘, 프로젝트 유무)
    
    
    return (

                <div className={styles.chatlist}>

                    <div className={styles.topbox}>
                        <div className={styles.listtitle}>채팅방 리스트</div>
                        <button className={styles.createicon} onClick={onCreateClick}>+</button>
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