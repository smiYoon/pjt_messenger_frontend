import React, { useEffect} from "react";
import styles from './ChatList.module.css';

const ChatList = ({ onCreateClick,onChatClick, chatrooms}) => {

    return (

        <div className={styles.chatlist}>

            <div className={styles.topbox}>
                <div className={styles.listtitle}>채팅방 리스트</div>
                <button className={styles.createicon} onClick={onCreateClick}>+</button>
            </div>

            <div className={styles.roomboxes}>

                {chatrooms.map((room) => (
                    <div key={room.chat?.id} className={styles.chatroombox} onClick={() => {onChatClick(room.chat?.id); console.log("roomid", room.chat?.id)}}>
                        <div className={styles.empicon}></div>
                        <div className={styles.rightbox}>
                            <div className={styles.projecticon}>{room.chat?.project?.name || ""}</div>
                            <div className={styles.chatname}>{room?.chat?.name}</div>
                        </div>
                    </div>
                ))}

            </div>


        </div>

    )
}

export default ChatList;