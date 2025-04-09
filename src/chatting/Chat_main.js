import React, { useState } from 'react';

import {AiSummary} from './Ai';
import {Chatting, Roomheader} from './chattingroom';
import {ChatList} from './chatList';
import {Invite} from './invite';
import CreateChat from './createChatPopup/CreateChat';

import styles from './Chat_main.module.css';

const Chat_main = () => {

    const [showCreateChat, setShowCreateChat] = useState(false);
    // const [showOrga, setShowOrga]=useState([]);//조직도

    return (
        <div className={styles.main}>
            
            <div className={styles.leftbox}>
                {/* invite창에서 사원리스트 띄우기, 조직도 띄우기 */}
                <Invite/>
                <ChatList onCreateClick={() => setShowCreateChat(true)} />
                
            </div>

            <div className={styles.centerbox}>
                <Roomheader/>
                <Chatting/>
                {showCreateChat && <CreateChat onCloseClick={() => setShowCreateChat(false)} />}
            </div>

            <div className={styles.rightbox}>
               <AiSummary/>
            </div>

            


        </div>
    )
}

export default Chat_main;