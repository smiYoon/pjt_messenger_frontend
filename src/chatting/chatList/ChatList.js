import React, { useEffect, useState ,useContext} from "react";
// import { AuthContext } from "../../AuthContext";
import { useLoadScript } from '../../LoadScriptContext';

import styles from './ChatList.module.css';

const ChatList = ({ onCreateClick,onChatClick, chatrooms, setChatrooms, }) => {

    // const { empno } = useContext(AuthContext);
    const { decodedToken } = useLoadScript();
    const empno = decodedToken.empno;

    // 채팅방 리스트 받아오기 (채팅방이름, 등록한사람 아이콘, 프로젝트 유무)
    useEffect(() => {
        if (!empno) return;
    
        const fetchChatrooms = async () => {
            try {
                const response = await fetch(`https://localhost:443/chat/list/${empno}`);
                const data = await response.json();

                if (Array.isArray(data)) {
                    setChatrooms(data);
                } else {
                    console.warn("서버 응답이 배열이 아닙니다:", data);
                    setChatrooms([]);  // fallback
                }
            } catch (err) {
                console.error("채팅방 리스트 불러오기 실패:", err);
                setChatrooms([]);  // 실패 시에도 기본값 세팅
            }
        };
    
        fetchChatrooms();
    }, [empno]);
    

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