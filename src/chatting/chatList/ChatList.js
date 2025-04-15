import React, { useEffect, useState } from "react";

import styles from './ChatList.module.css';

const ChatList = ({ onCreateClick,onChatClick }) => {

    const [chatrooms, setChatrooms] = useState([]);

    // 채팅방 리스트 받아오기 (채팅방이름, 등록한사람 아이콘, 프로젝트 유무)
    useEffect(() => {
        const fetchChatrooms = async () => {
            try {
                const response = await fetch("https://localhost:443/chat");
                const data = await response.json();
                setChatrooms(data);
                console.log("data", data);
            } catch (err) {
                console.error("채팅방 리스트 불러오기 실패:", err);
            }
        };
    
        fetchChatrooms();
    }, []);
    

    return (

        <div className={styles.chatlist}>

            <div className={styles.topbox}>
                <div className={styles.listtitle}>채팅방 리스트</div>
                <button className={styles.createicon} onClick={onCreateClick}>+</button>
            </div>

            <div className={styles.roomboxes}>

                {chatrooms.map((room, index) => (
                <div key={room.id} className={styles.chatroombox} onClick={() => {onChatClick(room.id); console.log("roomid", room.id)}}>
                    <div className={styles.empicon}></div>
                    <div className={styles.rightbox}>
                        <div className={styles.projecticon}>{room.projectBadge}</div>
                        <div className={styles.chatname}>{room.name}</div>
                    </div>
                </div>
                ))}

            </div>


        </div>

    )
}

export default ChatList;