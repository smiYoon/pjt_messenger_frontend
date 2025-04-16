import styles from './Chatting.module.css';
import React, { useState, useRef , useEffect} from 'react';
import { IoSearch } from "react-icons/io5";
import { MdOutlineAttachFile } from "react-icons/md";
import { BsArrowUpCircleFill } from "react-icons/bs";


const Chatting = ({id}) => {

        
    const fileInputRef = useRef(null);
    
    const handleFileRef = () => {
        fileInputRef.current.click();
    };
    
    const hadleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log('전송 파일 : ', file.name);
        }
    }
    
    //  const [ serchTerm, setSearchTerm ] = useState('');
    //  const item = []

    const [messages, setMessages] = useState([]);
    const socketRef = useRef(null);

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
            console.error("❌ WebSocket 에러 발생:", error);
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
    };

    return (         
            
            <div className={styles.mainchat}>

                <div className={styles.SearchBar}>
                    <IoSearch className={styles.IoSearch}/>
                    <input className={styles.searchInput}
                        placeholder='검색 키워드를 입력해주세요.'
                        // value={search}
                        // onChange={e => setSearch(e.target.value)}
                    />
                </div>

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

                        return (
                            <div key={idx} className={styles.messageBubble}>
                                <div className={styles.senderName}>{parsedMsg.employee?.name || '알 수 없음'}</div>
                                <div className={styles.messageText}>{parsedMsg.detail}</div>
                            </div>
                        );
                    })}
                </div>

                <div className={styles.MessageInputBox}>
                    <input
                    type="file"
                    ref={fileInputRef}
                    onChange={hadleFileChange}
                    style={{ display: 'none' }}
                    />
                    {/* <MdOutlineAttachFile className={styles.fileIcon} onClick={handleFileRef}/> */}

                    <input className={styles.messageInput}
                        type="text"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") sendMessage(e.target.value);
                    }}/>
                    {/* <BsArrowUpCircleFill className={styles.sendMessagIcon}/> */}
                 </div>


            </div>
            
    )
}

export default Chatting;