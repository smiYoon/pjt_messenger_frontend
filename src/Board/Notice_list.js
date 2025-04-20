import React, { useCallback, useEffect, useState } from 'react';
import styles from './Notice_list.module.css';
import { Link } from 'react-router-dom';

import SearchBar from "../SearchBar/SearchBar.js";

const Notice_list = () => {
    const [inputValue, setInputValue] = useState();
    const [posts, setPosts] = useState([]);
    const handleChange = (e) => setInputValue(e.target.value);

      const [searchWord, setSearchWord] = useState("name");
      const [searchText, setSearchText] = useState("");
    
      const [totalPages, setTotalPages] = useState(0);
      const [currPage, setCurrPage] = useState(0);


     const pageSize = 10;
     const currBlock = Math.floor(currPage / pageSize);
     const startPage = currBlock * pageSize;
     const endPage = Math.min(startPage + pageSize, totalPages);

    const fetchPosts = useCallback(async (page) => {
        const token =localStorage.getItem("jwt");
        const baseUrl= searchText
        ? `https://localhost:443/board/Notice/search?searchWord=${searchWord}&searchText=${searchText}`
        : "http://localhost:443/board/Notice";
        
        try {
            const response = await fetch(`https://localhost:443/board/Notice`, {
                method: 'GET',
                headers: {
                    "Authorization" : `earer ${token}`,
                    "Content-Type": "application/json",
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log("data:", data.content);
                const formattedData = data.content.map(post => ({
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
    },[searchWord, searchText]);

    useEffect(() => {
        fetchPosts(); // 활성화된 탭에 따라 데이터 가져오기
    }, []);

    const options = [
        { value: "title", label: "제목" },
        { value: "author", label: "작성자" },
      ];

    const handleSearch = () => {
        fetchPosts(0);
      };




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
                        <Link to={`/board/notice/create`} className={styles.button}>등록</Link>



                        <div className={styles.searchBar}>
                            <SearchBar
                            searchOption={searchWord}
                            onOptionChange={(e) => setSearchWord(e.target.value)}
                            searchText={searchText}
                            onTextChange={(e) => setSearchText(e.target.value)}
                            onSearch={handleSearch}
                            options={options}
                            />
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

                            <div className={styles.paging}>
                              <button
                                className={styles.btn}
                                onClick={() => fetchPosts(0)}
                                disabled={currPage === 0}
                              >
                                <i className="fas fa-angles-left"></i>처음
                              </button>
                    
                              <button
                                className={styles.btn}
                                onClick={() => fetchPosts(startPage - 1)}
                                disabled={currPage <= 9}
                              >
                                <i className="fas fa-angle-left"></i>이전
                              </button>
                    
                              <button
                                className={styles.btn}
                                onClick={() => fetchPosts(currPage - 1)}
                                disabled={currPage === 0}
                              >
                                -1<i className="fas fa-angle-left"></i>
                              </button>
                    
                              {Array.from({ length: endPage - startPage }, (_, i) => startPage + i).map((pageNum) => (
                                <button
                                  key={pageNum}
                                  className={currPage === pageNum ? styles.activePage : ""}
                                  onClick={() => fetchPosts(pageNum)}
                                >
                                  {pageNum + 1}
                                </button>
                              ))}
                    
                              <button
                                className={styles.btn}
                                onClick={() => fetchPosts(currPage + 1)}
                                disabled={currPage >= totalPages - 1}
                              >
                                +1<i className="fas fa-angle-right"></i>
                              </button>
                    
                              <button
                                className={styles.btn}
                                onClick={() => fetchPosts(endPage)}
                                disabled={currPage >= totalPages - 1}
                              >
                                <i className="fas fa-angle-right"></i>이후
                              </button>
                    
                              <button
                                className={styles.btn}
                                onClick={() => fetchPosts(totalPages - 1)}
                                disabled={currPage >= totalPages - 1}
                              >
                                <i className="fas fa-angles-right"></i>마지막
                              </button>
                            </div>


                </div>
            </div>
        </div>
    );
};

export default Notice_list;
