import styles from './Chatting.module.css';
import React, { useState, useRef , useEffect} from 'react';
import { BsArrowUpCircleFill } from "react-icons/bs";


const Chatting = ({id}) => {

    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState([]);
    const socketRef = useRef(null);
    const messagesEndRef = useRef(null);
    
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`https://localhost:443/message?chatId=${id}`);
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error('초기 메시지 불러오기 실패:', error);
            }
        };
    
        if (id) {
            fetchMessages();
        }
    }, [id]);


    useEffect(() => {
        if (!id) return; // chatId가 undefined면 연결하지 않음

        const socket = new WebSocket(`wss://localhost:443/chatroom?chatId=${id}`);
        socketRef.current = socket;

        socket.onmessage = (event) => {
            setMessages((prev) => [...prev, event.data]);
        };

        socket.onopen = () => {
            console.log("WebSocket 연결됨");
        };

        socket.onclose = () => {
            console.log("WebSocket 연결 종료");
        };

        socket.onerror = (error) => {
            console.error("WebSocket 에러 발생:", error);
        };

        return () => {
            socket.close();
        };
    }, [id]);

    const sendMessage = (msg) => {
        
        const messageObj = {
            "detail": msg,
            "chatId": id,            // 현재 채팅방 ID
            "empno": "E2012004"            // 로그인한 사용자 ID, 실제 로그인 정보에서 가져와야 함
        };

        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(messageObj));
        }
        setInputValue("");
    };
    // E2005003
    const currentEmpno = "E2012004"; // 실제 로그인한 사용자 empno
    
    useEffect(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [messages]);

    return (         
            
            <div className={styles.mainchat}>

                <div className={styles.messagebox} ref={messagesEndRef}>

                    <div className={styles.chatMessages}>
                        {messages.map((msg, idx) => {
                            let parsedMsg = msg;
                            if (typeof msg === 'string') {
                                try {
                                    parsedMsg = JSON.parse(msg);
                                } catch (e) {
                                    console.warn("JSON 파싱 실패:", msg);
                                }
                            }

                            const isMine = parsedMsg?.employee?.empno === currentEmpno;

                            return (
                                <div
                                    key={idx}
                                    className={`${styles.messageBubble} ${isMine ? styles.myMessage : styles.otherMessage}`}
                                >
                                    {!isMine && (
                                        <div className={styles.senderName}>{parsedMsg.employee?.name || '알 수 없음'}</div>
                                    )}
                                    <div className={styles.messageText}>{parsedMsg.detail}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>      

                <div className={styles.MessageInputBox}>

                    <input className={styles.messageInput}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") sendMessage(inputValue);
                    }}/>
                    <BsArrowUpCircleFill className={styles.sendMessagIcon} onClick={() => {if(inputValue.trim() !== "") {sendMessage(inputValue);}}}/>

                </div>
                        

            </div>
            
    )
}

export default Chatting;