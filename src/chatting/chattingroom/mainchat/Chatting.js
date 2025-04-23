import styles from './Chatting.module.css';
import React, { useState, useRef, useEffect } from 'react';
import { BsArrowUpCircleFill } from "react-icons/bs";
import { useLoadScript } from "../../../LoadScriptContext";

const Chatting = ({id, messages, setMessages, socket, fetchChatrooms}) => {

    const { decodedToken, token } = useLoadScript(); // ✅ token 가져옴
    const empno = decodedToken?.empno;

    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`https://localhost:443/message?chatId=${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // 토큰 추가
                    },
                });
                const data = await response.json();
                console.log("초기 메시지:", data);
                setMessages(data);
            } catch (error) {
                console.error('초기 메시지 불러오기 실패:', error);
            }
        };

        if (id) fetchMessages();
    }, [id]);

    useEffect(() => {
        if (!socket) return;
    
       
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log("[수신 메시지 RAW 데이터]", event.data); 
            console.log("[파싱된 메시지]", message); 
            
    
            switch(message.type) {
                case 'INVITE':
                    fetchChatrooms();
                    setMessages(prev => [...prev, {
                        empno: empno,
                        detail: message.detail,
                        isSystemMessage: true,
                        employee: message.employee
                    }]);
                    break;
                    
                case 'SYSTEM':
                    setMessages(prev => [...prev, {
                        empno: empno,
                        detail: message.detail,
                        isSystemMessage: true,
                        employee: message.employee
                    }]);
                    break;
                    
                default:
                    setMessages(prev => [...prev, {
                        empno: empno,
                        detail: message.detail,
                        isSystemMessage: false,
                        employee: message.employee
                    }]);
            }
        };
    
        return () => {
            socket.onmessage = null;
        };
    }, [socket]);
    
    const sendMessage = (msg) => {
        const messageObj = {
            detail: msg,
            chatId: id,
            empno: empno,
            type: "MESSAGE"
        };

        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(messageObj));
        }

        setInputValue("");
    };

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

                        const isMine = parsedMsg?.employee?.empno === empno;
                        const isSystemMessage = parsedMsg?.isSystemMessage;

                        if (isSystemMessage) {
                            let systemText = "";
                            switch (parsedMsg.type) {
                                case "INVITE":
                                    systemText = `${parsedMsg.employee?.name}님이 초대하셨습니다.`;
                                    break;
                                case "join":
                                    systemText = `${parsedMsg.employee?.name}님이 입장하셨습니다.`;
                                    break;
                                case "leave":
                                    systemText = `${parsedMsg.employee?.name}님이 퇴장하셨습니다.`;
                                    break;
                                default:
                                    systemText = parsedMsg.detail;
                            }
                    
                            return (
                                <div key={idx} className={styles.centerSystemMessage}>
                                    {systemText}
                                </div>
                            );
                        }
                    
                        return (
                            <div key={idx} className={`${styles.messageItem} ${isMine ? styles.myItem : styles.otherItem}`}>
                                {!isMine && (
                                    <div className={styles.senderName}>{parsedMsg.employee?.name || '알 수 없음'}</div>
                                )}
                                <div
                                    className={`${styles.messageBubble} ${isMine ? styles.myMessage : styles.otherMessage}`}
                                >
                                    <div className={styles.messageText}>{parsedMsg.detail}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className={styles.MessageInputBox}>
                <input
                    className={styles.messageInput}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") sendMessage(inputValue);
                    }}
                />
                <BsArrowUpCircleFill
                    className={styles.sendMessagIcon}
                    onClick={() => {
                        if (inputValue.trim() !== "") sendMessage(inputValue);
                    }}
                />
            </div>
        </div>
    );
};

export default Chatting;
