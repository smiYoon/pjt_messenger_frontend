import React, { useState } from 'react';

import {AiSummary} from './Ai';
import {Chatting, Roomheader} from './chattingroom';
import {ChatList} from './chatList';
import {Invite} from './invite';
import CreateChat from './chatCreatePopup/CreateChat';

import styles from './Chat_main.module.css';

const Chat_main = () => {

    const [showCreateChat, setShowCreateChat] = useState(false);

    return (
        <div className={styles.main}>
            
            <div className={styles.leftbox}>
                <Invite/>
                <ChatList onCreateClick={() => setShowCreateChat(true)} />
            </div>

            <div className={styles.centerbox}>
                <Roomheader/>
                <Chatting/>
                {showCreateChat && <CreateChat />}
            </div>

            <div className={styles.rightbox}>
               <AiSummary/>
            </div>


        </div>
    )
}

export default Chat_main;