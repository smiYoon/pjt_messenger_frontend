import React, { useState } from 'react';

import {AiSummary} from './Ai';
import {Chatting, Roomheader} from './chattingroom';
import {ChatList} from './chatList';
import {Invite} from './invite';
import CreateChat from './createChatPopup/CreateChat';

import Organization from './organization/Organization';

import styles from './Chat_main.module.css';





const Chat_main = () => {
    const treeData = {
        name: '대표 홍길동(CEO)',
        attributes: {role: 'CEO',},
        children: [{
            name: '김미영(부서장)', 
            attributes: {
                role: '팀장',
                },
            children: [{
                name: '이준호(팀장)',
                attributes: {
                    role: '프론트엔드',
                    },                    
                children: [{
                     name: '박지수(팀원)',
                     attributes: {
                     role: '백엔드',
                        },
                    //  children: []
                },],
            },],
        },],
    };//   db에서 받기전 더미 ceo를 선택하면 칠드런들도 다 선택되게 해야함

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

            {showOrga && <Organization data={treeData} onCloseOrganClick={() => setShowOrga(false)} />}
            {showCreateChat && <CreateChat onCloseClick={() => setShowCreateChat(false)} />}
            

        </div>
    )
}

export default Chat_main;