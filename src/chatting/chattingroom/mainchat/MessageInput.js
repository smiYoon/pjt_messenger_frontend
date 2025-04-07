import React, { useState, useRef } from "react";
import styles from './MessageInput.module.css'
import { MdOutlineAttachFile } from "react-icons/md";
import { BsArrowUpCircleFill } from "react-icons/bs";

const MessageInput = () => {

    const fileInputRef = useRef(null);
    
    const handleFileRef = () => {
        fileInputRef.current.click();
    };
    
    const hadleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log('전송 파일 : ', file.name);
        }
    }
    
    return (
        <div className={styles.MessageInputBox}>
            <input
             type="file"
             ref={fileInputRef}
             onChange={hadleFileChange}
             style={{ display: 'none' }}
            />
            <MdOutlineAttachFile className={styles.fileIcon}
                                 onClick={handleFileRef}/>

            <input className={styles.messageInput}/>
            <BsArrowUpCircleFill className={styles.sendMessage}/>
        </div>
    );
};

export default MessageInput;
