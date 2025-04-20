import React, { useState ,useEffect } from 'react';

import {AiSummary} from './Ai';
import {Chatting, Roomheader} from './chattingroom';
import {ChatList} from './chatList';
import {Invite, Organization2} from './invite';
import CreateChat from './createChatPopup/CreateChat';

import styles from './Chat_main.module.css';


const Chat_main = () => {

    const [showCreateChat, setShowCreateChat] = useState(false);
    const [showOrga, setShowOrga]=useState(false);                  // 조직도
    const [inviteList, setInviteList] = useState([]);               // 초대할 직원 id들 저장
    const [chatrooms, setChatrooms] = useState([]);                 // 채팅방 리스트
    ////////////////////////////////////////////////////////////////////
    const [selectedChatRoom, setSelectedChatRoom] = useState(null);  // 선택된 채팅방

    const handleChatRoomClick = async (chatId) => {
        try {
          const response = await fetch(`https://localhost:443/chat/${chatId}`);
            
          if (!response.ok) {
            throw new Error("서버 응답 오류");
          }
      
          const chatRoomDetail = await response.json();

          setSelectedChatRoom(chatRoomDetail); // 상태 업데이트
          console.log("selectedChatRoom");
        } catch (error) {
          console.error("채팅방 조회 실패:", error);
        }
    };

    useEffect(() => {
        if (!selectedChatRoom && chatrooms.length > 0) {
            handleChatRoomClick(chatrooms[0].id); // 첫 번째 채팅방 자동 선택
        }
    }, [chatrooms]);


    return (
        <div className={styles.main}>
            
            <div className={styles.leftbox}>      
                <Invite onOrgaClick={()=> {setShowOrga(true)}} id={selectedChatRoom?.id} inviteList={inviteList} onInviteChange={(newList) => setInviteList(newList)} 
                             setInviteList={setInviteList}/>
                <ChatList chatrooms={chatrooms} setChatrooms={setChatrooms} 
                        onCreateClick={() => setShowCreateChat(true)} onChatClick={(chatId) => handleChatRoomClick(chatId)} />
            </div>

            <div className={styles.centerbox}>
                <Roomheader selectedChatRoom={selectedChatRoom} />
                <Chatting selectedChatRoom={selectedChatRoom} id={selectedChatRoom?.id}/>
            </div>

            <div className={styles.rightbox}>
               <AiSummary id={selectedChatRoom?.id} setChatrooms={setChatrooms} selectedChatRoom={selectedChatRoom} setSelectedChatRoom={setSelectedChatRoom} />
            </div>

            {showOrga && <Organization2 onCloseOrgaClick={()=> {setShowOrga(false)}} inviteList={inviteList} onInviteChange={(newList) => setInviteList(newList)} 
                id={selectedChatRoom?.id}/>}
            {showCreateChat && <CreateChat onCloseClick={() => setShowCreateChat(false)} setChatrooms={setChatrooms}/>}
            
        </div>
    )
}

export default Chat_main;