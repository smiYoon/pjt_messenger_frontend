import React, { useState } from 'react'
import styles from './Feedback_boardList.module.css';
import { Link } from 'react-router-dom';

const Feedback_boardList = () => {

    const [inputValue, setInputValue] = useState('');
    const handlerChange = (e) => setInputValue(e.target.value);

    /* 백엔드에서 데이터를 받아오기 전 리터럴 데이터 */
    const postList = [
        {
            postNo: 1,
            title: "아 졸리다 집에가고싶다1",
            writer: "Matthew",
            crtDate: "2025.01.11 15:00",
            count: 10
        },
        {
            postNo: 2,
            title: "아 졸리다 집에가고싶다2",
            writer: "Matthew",
            crtDate: "2025.01.11 15:00",
            count: 10
        },
        {
            postNo: 3,
            title: "아 졸리다 집에가고싶다3",
            writer: "Matthew",
            crtDate: "2025.01.11 15:00",
            count: 10
        },
        {
            postNo: 4,
            title: "아 졸리다 집에가고싶다4",
            writer: "Matthew",
            crtDate: "2025.01.11 15:00",
            count: 10
        },
        {
            postNo: 5,
            title: "아 졸리다 집에가고싶다5",
            writer: "Matthew",
            crtDate: "2025.01.11 15:00",
            count: 10
        },
        {
            postNo: 6,
            title: "아 졸리다 집에가고싶다6",
            writer: "Matthew",
            crtDate: "2025.01.11 15:00",
            count: 10
        },
        {
            postNo: 7,
            title: "아 졸리다 집에가고싶다6",
            writer: "Matthew",
            crtDate: "2025.01.11 15:00",
            count: 10
        },
        {
            postNo: 8,
            title: "아 졸리다 집에가고싶다6",
            writer: "Matthew",
            crtDate: "2025.01.11 15:00",
            count: 10
        },
        {
            postNo: 9,
            title: "아 졸리다 집에가고싶다6",
            writer: "Matthew",
            crtDate: "2025.01.11 15:00",
            count: 10
        },
    ]

    return (
        <div className={styles.container}>
            <div className={styles.side_bar}>
                <div className={styles.menu}>
                    <div className={styles.notice_box}>
                        <Link to={`/board/notice/list`} className={styles.notice}>
                            공지사항 게시판
                        </Link>
                    </div>
                    <div className={styles.feedback}>
                        건의 게시판
                    </div>
                </div>
            </div>
            <div className={styles.list_Page}>
                <div className={styles.list_container}>
                    <div className={styles.header}>
                        Feedback Board
                    </div>
                    <div className={styles.option_box}>
                        <Link to={`/board/Feedback/create`} className={styles.button}>등록</Link>
                        <div className={styles.search_box}>
                            <select
                                name='searchWord'
                                className={styles.select}
                                onChange={handlerChange}
                            >
                                <option value="">제목</option>
                                <option value="">작성자?</option>
                            </select>
                            <div className={styles.input_box}>
                                <input name='searchText' type='text' className={styles.input} placeholder='검색'></input>
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </div>
                        </div>
                    </div>
                    <div className={styles.Board_NameContainer}>
                        <div className={styles.Board_title}>
                            <div className={styles.number}>번호</div>
                            <div className={styles.postTitle}>제목</div>
                            <div className={styles.writer}>작성자</div>
                            <div className={styles.writeTime}>작성 날짜</div>
                            <div className={styles.views}>조회수</div>
                        </div>
                        <table className={styles.Board_table}>
                            <tbody>
                                {postList.map((post) => (
                                    <tr>
                                        <td className={styles.number}>{post.postNo}</td>
                                        <td className={styles.postTitle}>{post.title}</td>
                                        <td className={styles.writer}>{post.writer}</td>
                                        <td className={styles.writeTime}>{post.crtDate}</td>
                                        <td className={styles.views}>{post.count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className={styles.Board_paging}>페이징 1, 2, 3</div>
                </div>
            </div>
        </div>
    )
}

export default Feedback_boardList