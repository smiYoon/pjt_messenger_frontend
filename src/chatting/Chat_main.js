import React, { useState ,useEffect } from 'react';

import {AiSummary} from './Ai';
import {Chatting, Roomheader} from './chattingroom';
import {ChatList} from './chatList';
import {Invite, Organization2} from './invite';
import CreateChat from './createChatPopup/CreateChat';

import styles from './Chat_main.module.css';


const Chat_main = () => {

    const [showCreateChat, setShowCreateChat] = useState(false);
    const [showOrga, setShowOrga]=useState(false);      //조직도
    const [inviteList, setInviteList] = useState([]); // 초대할 직원 id들 저장
    
    ////////////////////////////////////////////////////////////////////
    const [selectedChatRoom, setSelectedChatRoom] = useState(null);  // 선택된 채팅방

    useEffect(() => {
        console.log("select", selectedChatRoom)
    },[selectedChatRoom])

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



    return (
        <div className={styles.main}>
            
            <div className={styles.leftbox}>      
                <Invite onOrgaClick={()=> {setShowOrga(true)}} id={selectedChatRoom?.id} inviteList={inviteList} onInviteChange={(newList) => setInviteList(newList)}/>
                <ChatList onCreateClick={() => setShowCreateChat(true)} onChatClick={(chatId) => handleChatRoomClick(chatId)} />
            </div>

            <div className={styles.centerbox}>
                <Roomheader selectedChatRoom={selectedChatRoom}/>
                <Chatting selectedChatRoom={selectedChatRoom} id={selectedChatRoom?.id}/>
            </div>

            <div className={styles.rightbox}>
               <AiSummary id={selectedChatRoom?.id}/>
            </div>

            {showOrga && <Organization2 onCloseOrgaClick={()=> {setShowOrga(false)}} inviteList={inviteList} onInviteChange={(newList) => setInviteList(newList)}/>}
            {showCreateChat && <CreateChat onCloseClick={() => setShowCreateChat(false)} />}
            
        </div>
    )
}

export default Chat_main;