import {AiSummary} from './Ai';
import {ChatEmpList, Chatting, Roomheader} from './chattingroom';
import {ChatList} from './chatList';
import {Invite} from './invite';

import styles from './Chat_main.module.css';

const Chat_main = () => {
    return (
        <div className={styles.main}>
            
            <div className={styles.leftbox}>
                <Invite/>
                <ChatList/>
            </div>

            <div className={styles.centerbox}>
                <Roomheader/>
                <Chatting/>
            </div>

            <div className={styles.rightbox}>
               <AiSummary/>
            </div>


        </div>
    )
}

export default Chat_main;