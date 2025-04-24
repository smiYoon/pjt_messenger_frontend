import styles from './Chatting.module.css';
import React, { useState, useRef, useEffect } from 'react';
import { BsArrowUpCircleFill } from "react-icons/bs";
import { useLoadScript } from "../../../LoadScriptContext";

const Chatting = ({id, messages, setMessages, socket, socketError}) => {

    const [isComposing, setIsComposing] = useState(false);
    const { decodedToken, token } = useLoadScript(); // ✅ token 가져옴
    const empno = decodedToken?.empno;

    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`https://localhost/message?chatId=${id}`, {
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
    }, [id, setMessages, token]);

    useEffect(() => {
        if (!socket) return;
    
       
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log("[수신 메시지 RAW 데이터]", event.data); 
            console.log("[파싱된 메시지]", message); 
            
            setMessages(prev => [...prev, {
                empno: empno,
                detail: message.detail,
                employee: message.employee,
                crtDate: new Date().toISOString(),
            }]);
        }

    
        return () => {
            socket.onmessage = null;
        };
    }, [socket, empno, setMessages]);
    
    const sendMessage = (msg) => {
        const messageObj = {
            detail: msg,
            chatId: id,
            empno: empno,
            type: "MESSAGE",
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

    const formatTime = (isoString) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // 예: 03:30 PM
    };

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
                    
                        return (
                            <div key={idx} className={`${styles.messageItem} ${isMine ? styles.myItem : styles.otherItem}`}>
                                {!isMine && (
                                    <div className={styles.senderName}>{parsedMsg.employee?.name || '알 수 없음'}</div>
                                )}

                                <div >
                                    <div className={`${styles.messageBubble} ${isMine ? styles.myMessage : styles.otherMessage}`}>
                                        <div className={styles.messageText}>{parsedMsg.detail}</div>
                                    </div>
                                    <div className={styles.messageTime}>{formatTime(parsedMsg.crtDate)}</div>
                                </div>
                            </div>
                        );
                    })}
                    {socketError && (
                        <div className={styles.socketError}>
                            {socketError}
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.MessageInputBox}>
                <input
                    className={styles.messageInput}
                    type="text"
                    value={inputValue}
                    
                    onChange={(e) => setInputValue(e.target.value)}
                    onCompositionStart={() => setIsComposing(true)}
                    onCompositionEnd={() => setIsComposing(false)}
                    onKeyDown={(e) => {
                        if (!isComposing && (e.key === 'Enter' || e.key === 'NumpadEnter')) {
                          sendMessage(inputValue);
                        }
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
