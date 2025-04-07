import styles from './List_member.module.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const List_member = () => {

  const [searchOption, setSearchOption] = useState('');



  return (
    <div className={styles.container}>
      <div className={styles.left_panel}>
        <div className={styles.header}>
          사원 리스트
        </div>
        <div className={styles.main}>
          <Link to={`/2`} className={styles.register}>
            사원 등록
          </Link>
          <div className={styles.search}>
            <select
              name='searchWord'
              className={styles.dropdown}
              value={searchOption}
              onChange={(e) => setSearchOption(e.target.value)}
            >
              <option value="">검색조건</option>
              <option value="name">이름</option>
              <option value="phone">전화번호</option>
            </select>
            <div className={styles.search_container}>
              <input type='text' className={styles.text} placeholder='검색어를 입력하세요.' />
              <i class="fa-solid fa-magnifying-glass" />
            </div>
          </div>
        </div>
        <div className={styles.card}>

        </div>
        <div className={styles.paging}>
          1 2 3
        </div>
      </div>
      <div className={styles.right_panel}>
        조직도자리
      </div>
    </div>
  )
}

export default List_member;