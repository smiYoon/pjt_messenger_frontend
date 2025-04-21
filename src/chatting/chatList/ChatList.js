import React, { useEffect } from "react";
import { useLoadScript } from "../../LoadScriptContext";
import styles from './ChatList.module.css';

const ChatList = ({ onCreateClick, onChatClick, chatrooms, setChatrooms }) => {
    const { decodedToken, token } = useLoadScript(); // ✅ token 추가
    const empno = decodedToken?.empno;

    // 채팅방 리스트 받아오기
    useEffect(() => {
        if (!empno || !token) return; // ✅ null-safe

        const fetchChatrooms = async () => {
            try {
                const response = await fetch(`https://localhost:443/chat/list/${empno}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();

                if (Array.isArray(data)) {
                    setChatrooms(data);
                } else {
                    console.warn("서버 응답이 배열이 아닙니다:", data);
                    setChatrooms([]);
                }
            } catch (err) {
                console.error("채팅방 리스트 불러오기 실패:", err);
                setChatrooms([]);
            }
        };

        fetchChatrooms();
    }, [empno, token, setChatrooms]);

    return (
        <div className={styles.chatlist}>
            <div className={styles.topbox}>
                <div className={styles.listtitle}>채팅방 리스트</div>
                <button className={styles.createicon} onClick={onCreateClick}>+</button>
            </div>

            <div className={styles.roomboxes}>
                {chatrooms.map((room) => (
                    <div key={room.chat.id} className={styles.chatroombox} onClick={() => {onChatClick(room.chat.id); console.log("roomid", room.chat.id)}}>
                        <div className={styles.empicon}></div>
                        <div className={styles.rightbox}>
                            <div className={styles.projecticon}>{room.chat.project?.name}</div>
                            <div className={styles.chatname}>{room.chat.name}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatList;
