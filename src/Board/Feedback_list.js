import React, { useState, useEffect, useCallback } from 'react'
import styles from './Feedback_list.module.css';
import { Link } from 'react-router-dom';
import { useLoadScript } from '../LoadScriptContext';

const Feedback_list = () => {

    const { decodedToken } = useLoadScript();
    const [inputValue, setInputValue] = useState();
    const [posts, setPosts] = useState([]);
    const handleChange = (e) => setInputValue(e.target.value);

    const fetchPosts = useCallback(async () => {
        try {
            const response = await fetch(`https://localhost/board/feedback`, {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                console.log("data:", data);
                const formattedData = data.content.map(post => ({
                    id: post.id,
                    title: post.title,
                    author: post.employee.name,
                    empno: post.employee.empno,
                    count: post.count,
                    crtDate: post.crtDate,
                }));

                // 기본적으로 id 기준 내림차순으로 정렬
                const sortedData = formattedData.sort((a, b) => b.id - a.id);
                setPosts(sortedData);

            } else {
                console.error('불러오기 실패', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });

    useEffect(() => {
        fetchPosts(); // 활성화된 탭에 따라 데이터 가져오기
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.side_bar}>
                <div className={styles.menu}>
                    <Link to={`/board/notice/list`} className={styles.notice}>
                        공지사항 게시판
                    </Link>
                    <div className={styles.feedback}>
                        건의 게시판
                    </div>
                </div>
            </div>
            <div className={styles.list_Page}>
                <div className={styles.list_container}>
                    <div className={styles.header}>
                        Feedback
                    </div>
                    <div className={styles.option_box}>
                        <Link to={`/board/Feedback/create`} className={styles.button}>등록</Link>
                        <div className={styles.search_box}>
                            <select
                                name='searchWord'
                                className={styles.select}
                                onChange={handleChange}
                            >
                                <option value="">검색조건</option>
                                <option value="title">제목</option>
                                <option value="author">작성자</option>
                            </select>
                            <div className={styles.input_box}>
                                <input name='searchText' type='text' className={styles.input} placeholder='검색'></input>
                                <i className="fa-solid fa-magnifying-glass" />
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
                        {posts.map((post) => (
                            decodedToken.empno === post.empno && (
                                <Link key={post.id} to={`/board/feedback/detail/${post.id}`} className={styles.tr}>
                                    <table className={styles.Board_table}>
                                        <tbody>
                                            <tr>
                                                <td className={styles.number}>{post.id}</td>
                                                <td className={styles.postTitle}>{post.title}</td>
                                                <td className={styles.writer}>{post.author}</td>
                                                <td className={styles.writeTime}>{post.crtDate}</td>
                                                <td className={styles.views}>{post.count}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Link>
                            )
                        ))}
                    </div>
                    <div className={styles.Board_paging}>페이징 1, 2, 3</div>
                </div>
            </div>
        </div>
    )
}

export default Feedback_list