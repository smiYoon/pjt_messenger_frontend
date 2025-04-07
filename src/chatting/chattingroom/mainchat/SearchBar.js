import styles from './SearchBar.module.css'
import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";



const SearchBar = () => {
    
    return (
            // const [ serchTerm, setSearchTerm ] = useState('');
            // const item = []

            <div className={styles.SearchBar}>
                <IoSearch className={styles.IoSearch}/>
                <input className={styles.searchInput}
                    placeholder='검색 키워드를 입력해주세요.'
                    // value={search}
                    // onChange={e => setSearch(e.target.value)}
                />
            </div> 
    );
};

export default SearchBar;