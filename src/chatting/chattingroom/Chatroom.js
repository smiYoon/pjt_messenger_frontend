import React, { useEffect, useRef, useState } from 'react';

const ChatRoom = () => {
    const [messages, setMessages] = useState([]);            // 채팅방 문자 내역이 배열로 저장된 변수
    const [uuid, setUuid] = useState('');                    // 채팅 인원의 이름으로 변경해야함
    const [messageInput, setMessageInput] = useState('');    // 채팅방에 입력하는 문자
    const socketRef = useRef(null);                          // 소켓 연결을 위한 ref

    /*
    useEffect(() => {

        id가 바뀔 때 마다 해당 id에 채팅방 문자 내역을 가져와야함.    // 백엔드  => 채팅방 id에 해당하는 문자 리스트를 가져오는 api 필요

    },[id]);

    */ // id는 채팅방 id가 바뀔때마다 소켓을 새로연결


    useEffect(() => {
        const socket = new WebSocket("wss://localhost:443/chatroom/room1"); // room2가 채팅방 id로 바뀌어야 함.
        socketRef.current = socket;

        socket.onopen = () => {
            const newUuid = crypto.randomUUID().split('-')[0];
            setUuid(newUuid);                                               // 여긴 uuid가 아닌 해당 채팅인원의 이름이 들어가야함.
            console.log("Connected to /chatroom/1");
        };

        socket.onmessage = (e) => {
            setMessages(prevMessages => [...prevMessages, e.data]);
        };

        socket.onerror = (e) => {
            console.error('WebSocket error:', e);
        };

        socket.onclose = () => {
            console.log("Disconnected from /chatroom/1");
        };

        return () => socket.close();
    }, []);

    const sendMessage = () => {
        if (messageInput.trim() === '') return;
        socketRef.current.send(`${uuid}: ${messageInput}`);
        setMessageInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div>
            <h3>해당 채팅방 이름 받아오기</h3>   
            <hr />
            <ul>
                {messages.map((msg, idx) => (
                    <li key={idx}>{msg}</li>
                ))}
            </ul>
            <button>{uuid || 'UUID'}</button>
            <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter chat message ..."
                size="35"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatRoom;
