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
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(msg);
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

                <ul>
                    {messages.map((msg, idx) => (
                        <li key={idx}>{msg}</li>
                    ))}
                </ul>

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