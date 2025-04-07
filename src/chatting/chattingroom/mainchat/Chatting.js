import SearchBar from './SearchBar';
import MessageInput from './MessageInput';
import styles from './Chatting.module.css';
import React, { useState } from 'react';


const Chatting = () => {
    return (         
            
                <div className={styles.mainchat}>

                    
                    <SearchBar/>
                    <MessageInput/>
                </div>
            
    )
}

export default Chatting;