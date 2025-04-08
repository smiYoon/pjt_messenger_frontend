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
                    <div className={styles.search_box}>
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
                <div className={styles.Board_NameContainer}>
                    <table className={styles.Board_table}>
                        <thead>
                            <tr className={styles.Board_title}>
                                <th className={styles.number}>번호</th>
                                <th className={styles.title}>제목</th>
                                <th className={styles.writer}>작성자</th>
                                <th className={styles.writeTime}>작성 날짜</th>
                                <th className={styles.views}>조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td >1</td>
                                <td >성미님이 괴롭혀요/</td>
                                <td >홍성태</td>
                                <td >2025.1.11 15:00</td>
                                <td >10</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={styles.Board_paging}>페이징</div>
            </div>
        </div>
    </div>
  )
}

export default Board_list