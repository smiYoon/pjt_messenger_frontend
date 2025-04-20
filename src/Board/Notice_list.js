import React, { useCallback, useEffect, useState } from 'react';
import styles from './Notice_list.module.css';
import { Link } from 'react-router-dom';

const Notice_list = () => {
    const [inputValue, setInputValue] = useState();
    const [posts, setPosts] = useState([]);
    const { decodedToken, role_level } = useLoadScript();
    const handleChange = (e) => setInputValue(e.target.value);

    console.log('사용자정보(공지사항):', decodedToken);
    const fetchPosts = useCallback(async () => {
        try {
            const response = await fetch(`https://localhost/board/Notice`, {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                console.log("data:", data);
                const formattedData = data.map(post => ({
                    id: post.id,
                    title: post.title,
                    author: post.employee.name,
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
                    <div
                        className={styles.notice}
                    >
                        공지사항 게시판
                    </div>
                    <Link
                        className={styles.feedback}
                        to={`/board/feedback/list`}
                    >
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
                        {role_level[decodedToken.roles] != 1 && (
                            <Link to={`/board/notice/create`} className={styles.button}>등록</Link>
                        )}
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
                            <Link key={post.id} to={`/board/notice/detail/${post.id}`} className={styles.tr}>
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
                        ))}
                    </div>
                    <div className={styles.Board_paging}>페이징 1, 2, 3</div>
                </div>
            </div>
        </div>
    );
};

export default Notice_list;
