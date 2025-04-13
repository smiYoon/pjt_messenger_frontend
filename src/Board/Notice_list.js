import React, { useCallback, useEffect, useState } from 'react'
import styles from './Notice_list.module.css';
import { Link } from 'react-router-dom';

const Notice_list = () => {

    const [inputValue, setInputValue] = useState('');
    const [posts, setPosts] = useState([]);

    const fetchPosts = useCallback(async () => {
        try {
            const response = await fetch(`https://localhost:443/board`, {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                console.log("data:", data);
                const formattedData = data.map(posts => ({
                    id: posts.id,
                    title: posts.title,
                    author: posts.employee.name,
                    count: posts.count,
                    crtDate: posts.crtDate,
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
        fetchPosts();
    }, []);

    

    return (
        <div className={styles.container}>
            <div className={styles.side_bar}>
                <div className={styles.menu}>
                    <div className={styles.notice}>
                        공지사항 게시판
                    </div>
                    <Link to={`/board/feedback/list`} className={styles.feedback}>
                        건의 게시판
                    </Link>

                </div>
            </div>
            <div className={styles.list_Page}>
                <div className={styles.list_container}>
                    <div className={styles.header}>
                        Notification
                    </div>
                    <div className={styles.option_box}>
                        <Link to={`/board/notice/create`} className={styles.button}>등록</Link>
                        <div className={styles.search_box}>
                            <select
                                name='searchWord'
                                className={styles.select}
                            >
                                <option value="">제목</option>
                                <option value="">작성자</option>
                            </select>
                            <div className={styles.input_box}>
                                <input name='searchText' type='text' className={styles.input} placeholder='검색'></input>
                                <i className="fa-solid fa-magnifying-glass"></i>
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
                                {posts.map((post) => (
                                    <tr key={post.id}>
                                        <td className={styles.number}>{post.id}</td>
                                        <td className={styles.postTitle}>{post.title}</td>
                                        <td className={styles.writer}>{post.author}</td>
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

export default Notice_list;