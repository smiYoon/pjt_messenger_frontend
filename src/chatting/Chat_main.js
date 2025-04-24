import React, { useState, useEffect } from 'react';

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
    const [showOrga, setShowOrga] = useState(false);                  // 조직도 초대 팝업
    const [chatrooms, setChatrooms] = useState([]);                 // 채팅방 리스트
    ////////////////////////////////////////////////////////////////////
    const [selectedChatRoom, setSelectedChatRoom] = useState(null);  // 선택된 채팅방
    const [messages, setMessages] = useState([]); // 메시지 리스트

    const [socket, setSocket] = useState(null);
    const [socketError, setSocketError] = useState(null); // 에러 메시지 상태

    useEffect(() => {
        if (!selectedChatRoom?.id) return;

        const newSocket = new WebSocket(`wss://192.168.0.83/chatroom?chatId=${selectedChatRoom?.id}&empno=${empno}`);
        setSocket(newSocket);

        newSocket.onopen = () => {
            console.log("WebSocket 연결됨");
        };

        newSocket.onclose = (event) => {
            console.log("WebSocket 연결 종료", event.code, event.reason);
            if (event.code !== 1000) {
                setSocketError("채팅 서버와의 연결이 끊겼습니다.");
            }
        };

        newSocket.onerror = (error) => {
            console.error("WebSocket 에러 발생:", error);
            setSocketError("채팅 서버와 연결에 실패했습니다. 다시 시도해 주세요.");
        };


        return () => {
            console.log("🧹 기존 소켓 연결 해제");
            newSocket.close();
        };
    }, [selectedChatRoom?.id, empno]);


    const handleChatRoomClick = async (chatId) => {
        try {
            const response = await fetch(`https://localhost:443/chat/${chatId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`, // 토큰 추가
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

    useEffect(() => { // 참여자들 정보도 갱신
        if (!selectedChatRoom?.id) return;

        const fetchChatRoomDetail = async () => {
            const res = await fetch(`https://localhost:443/chat/${selectedChatRoom.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            console.log("채팅방 상세정보:", data);
            setSelectedChatRoom(data);
        };

        const intervalId = setInterval(fetchChatRoomDetail, 10000); // 10초마다 갱신

        return () => clearInterval(intervalId);
    }, [selectedChatRoom?.id, token]);


    // 채팅방 리스트 받아오기 (채팅방이름, 등록한사람 아이콘, 프로젝트 유무)
    // 공통 fetch 로직
    const fetchChatrooms = async () => {
        try {
            const response = await fetch(`https://localhost:443/chat/list/${empno}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setChatrooms(Array.isArray(data) ? data : []);
            console.log("채팅방 리스트:", data);
        } catch (error) {
            console.error("채팅방 목록 불러오기 실패:", error);
            setChatrooms([]);
        }
    };

    // 처음 한 번 불러오기
    useEffect(() => {
        if (!empno) return;

        fetchChatrooms(); // 처음 한 번 호출

        const intervalId = setInterval(() => {
            fetchChatrooms();
        }, 10000); // 5000ms = 5초

        return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 clear
    }, [empno]);


    useEffect(() => {
        if (!selectedChatRoom && chatrooms.length > 0) {
            handleChatRoomClick(chatrooms[0].chat?.id); // 첫 번째 채팅방 자동 선택
        }
    }, [chatrooms, selectedChatRoom, handleChatRoomClick]);

    return (
        <div className={styles.body}>
            <div className={styles.main}>
                <div className={styles.leftbox}>
                    <Invite onOrgaClick={() => { setShowOrga(true) }} selectedChatRoom={selectedChatRoom} />
                    <ChatList
                        chatrooms={chatrooms}
                        setChatrooms={setChatrooms}
                        onCreateClick={() => setShowCreateChat(true)}
                        onChatClick={(chatId) => handleChatRoomClick(chatId)}
                    />
                </div>

                <div className={styles.centerbox}>
                    <Roomheader selectedChatRoom={selectedChatRoom} />
                    <Chatting selectedChatRoom={selectedChatRoom} id={selectedChatRoom?.id} messages={messages} 
                    setMessages={setMessages} socket={socket} fetchChatrooms={fetchChatrooms} socketError={socketError}/>
                </div>

                <div className={styles.rightbox}>
                    <AiSummary id={selectedChatRoom?.id} setChatrooms={setChatrooms} selectedChatRoom={selectedChatRoom}
                        setSelectedChatRoom={setSelectedChatRoom} fetchChatrooms={fetchChatrooms} chatrooms={chatrooms} setMessages={setMessages} />
                </div>

                {showOrga && <Organization2 onCloseOrgaClick={() => { setShowOrga(false) }} id={selectedChatRoom?.id} handleChatRoomClick={handleChatRoomClick} socket={socket} />}
                {showCreateChat && <CreateChat onCloseClick={() => setShowCreateChat(false)} setChatrooms={setChatrooms} fetchChatrooms={fetchChatrooms} />}

            </div>
        </div>
    );
};

export default Chat_main;
