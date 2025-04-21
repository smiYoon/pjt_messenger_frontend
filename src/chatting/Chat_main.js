import React, { useState ,useEffect } from 'react';

import { AiSummary } from './Ai';
import { Chatting, Roomheader } from './chattingroom';
import { ChatList } from './chatList';
import { Invite, Organization2 } from './invite';
import CreateChat from './createChatPopup/CreateChat';
import { useLoadScript } from "../LoadScriptContext";

import styles from './Chat_main.module.css';

const Chat_main = () => {

    const { decodedToken, token } = useLoadScript();
    const empno = decodedToken?.empno;

    const [showCreateChat, setShowCreateChat] = useState(false);    // 채팅방 생성 팝업
    const [showOrga, setShowOrga]=useState(false);                  // 조직도 초대 팝업
    const [chatrooms, setChatrooms] = useState([]);                 // 채팅방 리스트
    ////////////////////////////////////////////////////////////////////
    const [selectedChatRoom, setSelectedChatRoom] = useState(null);  // 선택된 채팅방
    const [messages, setMessages] = useState([]); // 메시지 리스트

    const handleChatRoomClick = async (chatId) => {
        try {
            const response = await fetch(`https://localhost:443/chat/${chatId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`, // ✅ 토큰 추가
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error("서버 응답 오류");
            }

            const chatRoomDetail = await response.json();
            setSelectedChatRoom(chatRoomDetail);
            console.log("selectedChatRoom");
        } catch (error) {
            console.error("채팅방 조회 실패:", error);
        }
    };

    // 채팅방 리스트 받아오기 (채팅방이름, 등록한사람 아이콘, 프로젝트 유무)
    // 공통 fetch 로직
    const fetchChatrooms = async () => {
        try {
            const response = await fetch(`https://localhost:443/chat/list/${empno}`,{
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`, // ✅ 토큰 추가
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setChatrooms(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("채팅방 목록 불러오기 실패:", error);
            setChatrooms([]);
        }
    };

    // 처음 한 번 불러오기
    useEffect(() => {
        if (empno) {
            fetchChatrooms();
        }
    }, [empno]);


    useEffect(() => {
        if (!selectedChatRoom && chatrooms.length > 0) {
            handleChatRoomClick(chatrooms[0].chat?.id); // 첫 번째 채팅방 자동 선택
        }
    }, [chatrooms]);

    return (
        <div className={styles.main}>
            <div className={styles.leftbox}>
                <Invite onOrgaClick={() => { setShowOrga(true) }} />
                <ChatList
                    chatrooms={chatrooms}
                    setChatrooms={setChatrooms}
                    onCreateClick={() => setShowCreateChat(true)}
                    onChatClick={(chatId) => handleChatRoomClick(chatId)}
                />
            </div>

            <div className={styles.centerbox}>
                <Roomheader selectedChatRoom={selectedChatRoom} />
                <Chatting selectedChatRoom={selectedChatRoom} id={selectedChatRoom?.id} messages={messages} setMessages={setMessages}/>
            </div>

            <div className={styles.rightbox}>
               <AiSummary id={selectedChatRoom?.id} setChatrooms={setChatrooms} selectedChatRoom={selectedChatRoom} 
                        setSelectedChatRoom={setSelectedChatRoom} fetchChatrooms={fetchChatrooms} chatrooms={chatrooms} setMessages={setMessages}/>
            </div>

            {showOrga && <Organization2 onCloseOrgaClick={()=> {setShowOrga(false)}} id={selectedChatRoom?.id} handleChatRoomClick={handleChatRoomClick}/>}
            {showCreateChat && <CreateChat onCloseClick={() => setShowCreateChat(false)} setChatrooms={setChatrooms} fetchChatrooms={fetchChatrooms}/>}
            
        </div>
    );
};

export default Chat_main;
