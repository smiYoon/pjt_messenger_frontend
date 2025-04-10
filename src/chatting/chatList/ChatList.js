import React, { useEffect, useState } from "react";

import styles from './ChatList.module.css';

const ChatList = ({ onCreateClick }) => {

    const [chatrooms, setChatrooms] = useState([]);

    // 채팅방 리스트 받아오기 (채팅방이름, 등록한사람 아이콘, 프로젝트 유무)
    useEffect(() => {
        fetch("https://localhost:443/chat")
            .then(res => res.json())
            .then(data => {
                setChatrooms(data);
                console.log("data", data);
            })
            .catch(err => {
                console.error("채팅방 리스트 불러오기 실패:", err);
                });
      }, []);
    

    return (

        <div className={styles.chatlist}>

            <div className={styles.topbox}>
                <div className={styles.listtitle}>채팅방 리스트</div>
                <button className={styles.createicon} onClick={onCreateClick}>+</button>
            </div>

            <div className={styles.roomboxes}>

                {chatrooms.map((room, index) => (
                <div key={index} className={styles.chatroombox}>
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