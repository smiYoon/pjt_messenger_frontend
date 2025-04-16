import styles from './Chatting.module.css';
import React, { useState, useRef } from 'react';
// import { IoSearch } from "react-icons/io5"; //돋보기?
// import { MdOutlineAttachFile } from "react-icons/md"; //클립
import { BsArrowUpCircleFill } from "react-icons/bs";


const Chatting = () => {

        
    // const fileInputRef = useRef(null);
    
    // const handleFileRef = () => {
    //     fileInputRef.current.click();
    // };
    
    // const hadleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         console.log('전송 파일 : ', file.name);
    //     }
    // }
    
    //  const [ serchTerm, setSearchTerm ] = useState('');
    //  const item = []


    return (         
            
            <div className={styles.mainchat}>

                {/* <div className={styles.SearchBar}>
                    <IoSearch className={styles.IoSearch}/>
                    <input className={styles.searchInput}
                        placeholder='검색 키워드를 입력해주세요.'
                        // value={search}
                        // onChange={e => setSearch(e.target.value)}
                    />
                </div> */}

                <div className={styles.MessageInputBox}>
                    {/* <input
                    type="file"
                    ref={fileInputRef}
                    onChange={hadleFileChange}
                    style={{ display: 'none' }}
                    /> */}
                    {/* <MdOutlineAttachFile className={styles.fileIcon}
                                         onClick={handleFileRef}/> */}

                    <input className={styles.messageInput}/>
                    <BsArrowUpCircleFill className={styles.sendMessagIcon}/>
                 </div>


            </div>
            
    )
}

export default Chatting;