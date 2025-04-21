import styles from './Chatting.module.css';
import React, { useState, useRef, useEffect } from 'react';
import { BsArrowUpCircleFill } from "react-icons/bs";
import { useLoadScript } from "../../../LoadScriptContext";

const Chatting = ({id, messages, setMessages}) => {

    const { decodedToken, token } = useLoadScript(); // ✅ token 가져옴
    const empno = decodedToken?.empno;

    const [inputValue, setInputValue] = useState("");
    const socketRef = useRef(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`https://localhost:443/message?chatId=${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // ✅ 토큰 추가
                    },
                });
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error('초기 메시지 불러오기 실패:', error);
            }
        };

        if (id) fetchMessages();
    }, [id, token]); // ✅ token 의존성 추가

    useEffect(() => {
        if (!id) return;

        const socket = new WebSocket(`wss://192.168.0.83/chatroom?chatId=${id}`);
        socketRef.current = socket;

        socket.onmessage = (event) => {
            setMessages((prev) => [...prev, event.data]);
        };

        socket.onopen = () => console.log("WebSocket 연결됨");
        socket.onclose = () => console.log("WebSocket 연결 종료");
        socket.onerror = (error) => console.error("WebSocket 에러 발생:", error);

        socket.onclose = (event) => {
            console.log("WebSocket 연결 종료", event.code, event.reason);
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
            detail: msg,
            chatId: id,
            empno: empno,
        };

        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(messageObj));
        }
        console.log("보낼 메시지:", JSON.stringify(messageObj))
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
