import React, { useState, useEffect, useCallback } from 'react';
import styles from './Notice_list.module.css';
import pagingStyles from "../Project/PagingStyle.module.css";
import { Link } from 'react-router-dom';
import { useLoadScript } from '../LoadScriptContext';

const Feedback_list = () => {
    const { decodedToken, token, empPositionMapping } = useLoadScript();

    const [list, setList] = useState([]);

    // list paging 정보
    const [currPage, setCurrPage] = useState(1);
    const [pageSize] = useState(10);
    const [blockSize] = useState(10);
    const [totalPageCnt, setTotalPageCnt] = useState(0);
    const [currBlock, setCurrBlock] = useState(Math.floor((currPage - 1) / blockSize));

    const [startPage, setStartPage] = useState(currBlock * blockSize);
    const [endPage, setEndPage] = useState(
        Math.min(startPage + blockSize, totalPageCnt)
    );

    useEffect(() => {
        setCurrBlock(Math.floor((currPage - 1) / blockSize));
        setStartPage(currBlock * blockSize);
        setEndPage(Math.min(startPage + blockSize, totalPageCnt));
    }, [currPage, totalPageCnt, currBlock, startPage, endPage, blockSize]);

    // 검색어 및 상태 관리
    const [searchData, setSearchData] = useState({

        type: 2, //건의사항
        searchWord: "",
        searchText: "",
    });

    useEffect(() => {
        console.log("searchData:", searchData);
    }, [searchData]);

    // list 검색 함수
    const handleSearchData = (field, value) => {
        setSearchData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    // list 검색 엔터키 이벤트
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleGetList(1);
        }
    };

    //리스트 data 가져오기
    const handleGetList = useCallback(

        async (page = 1, type = searchData.type) => {
            if (!decodedToken) return; // 수정점. 04.22
            setCurrPage(page);
            handleSearchData("type", type);

            const params = new URLSearchParams({
                currPage: page,
                pageSize: pageSize,
                type: type,
                searchWord: searchData.searchWord,
                searchText: searchData.searchText,
            });
            console.log("params:", params.toString());

            try {
                const response = await fetch(
                    `https://localhost/board/feedback?${params.toString()}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok)
                    throw new Error("서버 응답 오류", response.statusText);

                const listJson = await response.json();
                const listData = listJson.content.map((data) => ({
                    ...data,
                }));

                setCurrBlock(Math.floor((currPage - 1) / blockSize));
                setStartPage(currBlock * blockSize);
                setEndPage(Math.min(startPage + blockSize, totalPageCnt));

                console.log("listData:", listData);

                setList(listData);

                setTotalPageCnt(listJson.totalPages);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
        [searchData, currPage, decodedToken, blockSize, currBlock, pageSize, startPage, token, totalPageCnt] // 수정점. 04.22
    );

    // 컴포넌트 마운트 시 첫 데이터 로드
    useEffect(() => {
        if (!decodedToken) return; // 수정점. 04.22
        console.log("List useEffect() invoked.");

        handleSearchData("type", 2);
        handleSearchData("searchWord", "");
        handleSearchData("searchText", "");

        handleGetList(1);
    }, [decodedToken]); // 수정점. [] -> [decodedToken] 04.22 (토큰이 준비될 때 리스트 가져오기.)

    if (!decodedToken) return; // 수정점. 04.22

    return (
        <div className={styles.container}>
            <div className={styles.side_bar}>
                <div className={styles.menu}>
                    <Link to={`/board/notice/list`} className={`${styles.link}`}>
                        공지사항
                    </Link>
                    <Link to={`/board/feedback/list`} className={`${styles.link} ${styles.active}`}>
                        건의사항
                    </Link>
                </div>
            </div>
            <div className={styles.list_Page}>
                <div className={styles.list_container}>
                    <div className={styles.header}>Feedback</div>
                    <div className={styles.option_box}>
                        <Link to={`/board/Feedback/create`} className={styles.button}>등록</Link>
                        <div className={styles.search_box}>
                            <select
                                name='searchWord'
                                className={styles.select}
                                onChange={(e) => handleSearchData("searchWord", e.target.value)}
                            >
                                <option value="">검색조건</option>
                                <option value="title">제목</option>
                                <option value="author">작성자</option>
                            </select>
                            <div className={styles.input_box}>
                                <input
                                    name='searchText'
                                    type='text'
                                    className={styles.input}
                                    placeholder="검색어를 입력하세요."
                                    onChange={(e) =>
                                        handleSearchData("searchText", e.target.value)
                                    }
                                    onKeyUp={handleKeyPress}
                                />
                                <i className="fa-solid fa-magnifying-glass" />
                            </div>

                            <button
                                className={`${styles.button} ${styles.btnStyle_yg}`}
                                onClick={() => handleGetList(1)}
                            >
                                검색
                            </button>
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
                        {list.map((post) => (
                            <Link
                                key={post.id}
                                to={`/board/feedback/detail/${post.id}`}
                                className={styles.tr}
                            >
                                <table className={styles.Board_table}>
                                    <tbody>
                                        <tr>
                                            <td className={styles.number}>{post.id}</td>
                                            <td className={`${styles.postTitle} ${styles.alignLeft}`}>{post.title}</td>
                                            <td className={styles.writer}>
                                                {`[`}{post.employee.department.name}{`]`}{"  "}
                                                {post.employee.name}{" "}
                                                {empPositionMapping[post.employee.position]}
                                            </td>
                                            <td className={styles.writeTime}>{post.crtDate}</td>
                                            <td className={styles.views}>{post.count}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Link>
                        ))}
                    </div>
                    
                    <div className={pagingStyles.pageBar}>
                        {/* currPage: {currPage} / totalPageCnt:{totalPageCnt} / startPage:{startPage} / endPage:{endPage} */}

                        <div className={pagingStyles.pageBox}>
                            <div
                                className={pagingStyles.pageNum}
                                onClick={() => handleGetList(startPage - blockSize + 1)}
                                style={{ display: currPage <= 10 ? "none" : "" }}
                            >
                                <i className="fas fa-angles-left"></i>
                            </div>

                            <div
                                className={pagingStyles.pageNum}
                                onClick={() => handleGetList(currPage - 1)}
                                style={{ display: currPage === 1 ? "none" : "" }}
                            >
                                <i className="fas fa-angle-left"></i>
                            </div>

                            {Array.from(
                                { length: endPage - startPage },
                                (_, i) => startPage + i + 1
                            ).map((pageNum) => (
                                <div
                                    key={pageNum}
                                    className={
                                        currPage === pageNum
                                            ? pagingStyles.activePage
                                            : pagingStyles.pageNum
                                    }
                                    onClick={() => handleGetList(pageNum)} // ← 이 부분에서 currPage 변경됨
                                >
                                    {pageNum}
                                </div>
                            ))}

                            <div
                                className={pagingStyles.pageNum}
                                onClick={() => handleGetList(currPage + 1)}
                                style={{ display: currPage === totalPageCnt || totalPageCnt === 0 ? "none" : "" }}
                            >
                                <i className="fas fa-angle-right"></i>
                            </div>

                            <div
                                className={pagingStyles.pageNum}
                                onClick={() => handleGetList(endPage + 1)}
                                style={{ display: endPage + 1 > totalPageCnt ? "none" : "" }}
                            >
                                <i className="fas fa-angles-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feedback_list;
