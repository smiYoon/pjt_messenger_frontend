import React, { useState } from 'react';

import {AiSummary} from './Ai';
import {Chatting, Roomheader} from './chattingroom';
import {ChatList} from './chatList';
import {Invite} from './invite';
import CreateChat from './createChatPopup/CreateChat';

import Organization from './organization/Organization';

import styles from './Chat_main.module.css';





const Chat_main = () => {


    const [showCreateChat, setShowCreateChat] = useState(false);
    const [showOrga, setShowOrga]=useState(false);//조직도

    return (
        <div className={styles.main}>
            
            <div className={styles.leftbox}>
                
                <Invite onOrgaClick={()=> {setShowOrga(true); console.log("zz");}} />
                <ChatList onCreateClick={() => setShowCreateChat(true)} />

            </div>

            <div className={styles.centerbox}>
                <Roomheader/>
                <Chatting/>
            </div>

            <div className={styles.rightbox}>
               <AiSummary/>
              
            </div>

            {showOrga && <Organization  onCloseOrganClick={() => setShowOrga(false)} />}
            {showCreateChat && <CreateChat onCloseClick={() => setShowCreateChat(false)} />}
            

        </div>
    )
}

export default Chat_main;