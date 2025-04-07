import React, { useState } from 'react'
import styles from './Board_list.module.css';

const Board_list = () => {

    const [inputValue, setInputValue] = useState('');
    const handlerChange = (e) => setInputValue(e.target.value);

  return (
    <div className={styles.container}>
        <div className={styles.side_bar}></div>

        <div className={styles.list_Page}>
            <div className={styles.list_container}>
                <div className={styles.option_box}>
                    <button className={styles.button}>등록</button>
                    <div className={styles.search}>
                        <select
                            name='Search'
                            className={styles.select}
                            onChange={handlerChange}
                        >
                            <option value="">제목</option>
                            <option value="">작성자?</option>
                        </select>
                        <div className={styles.input_box}>
                            <input type='text' className={styles.input} placeholder='검색'></input>
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>
                </div>
                <div className={styles.Board_title}>
                    <div>번호</div>
                    <div>제목</div>
                    <div>작성자</div>
                    <div>작성 날짜</div>
                    <div> 조회수</div>
                </div>
                <div className={styles.Board_paging}>페이징</div>
            </div>
        </div>
    </div>
  )
}

export default Board_list