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

// ##############건의 게시판에 db들어오면 주석 해제하고 위에 내용들 전부 삭제################

//     import React, { useEffect, useState } from 'react'
// import styles from './Feedback_boardList.module.css';
// import { Link } from 'react-router-dom';

// import SearchBar from '../SearchBar/SearchBar.js';

// const Feedback_boardList = () => {

//     const [inputValue, setInputValue] = useState('');
//     const handlerChange = (e) => setInputValue(e.target.value);

//      // 검색바 용  //건의사항게시판
//         const [searchWord, setSearchWord] = useState('title');
//         const [searchText, setSearchText] = useState('');
        
//         const handleOptionChange = (e) => setSearchWord(e.target.value);
//         const handleTextChange = (e) => setSearchText(e.target.value);
        
//       //전체 리스트 받아오기
//         const [datas, setDatas] = useState([]);
//         useEffect(() => {
    
//           fetch("https://localhost:443/board/all") //json 받을 url
//             .then((res) => res.json())
//             .then((data) => setDatas(data));
//         }, []);
      
//         useEffect(() => {
//           console.log("datas 상태:", datas);
//         }, [datas]);
    
    
//         //검색 내용 요청하기
//         const handleSearch = () => {
//           fetch(`https://localhost:443/board/search?searchWord=${searchWord}&searchText=${searchText}`)
//           .then(res => res.json())
//           .then(data => {
//             console.log("🔍 검색 결과:", data);
//             setDatas(data)});
//           console.log("검색하는 내용:",'${searchWord} : ${searchText}');
//         };
    
//         const options = [
//           { value: "title", label: "제목" },
//         //   { value: "name", label: "작성자"  }
//         ];



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




                        {/* 디비 들어오면 삭제 */}
                        <div className={styles.search_box}>
                            <select
                                name='searchWord'
                                className={styles.select}
                                onChange={handlerChange}
                            >
                                <option value="">제목</option>
                                <option value="">작성자???</option>
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





{/* 디비 만들면 주석해제 위에 삭제 */}
                        {/* <div className={styles.SearchBar}>
                            <SearchBar
                                searchOption={searchWord}
                                onOptionChange={handleOptionChange}
                                searchText={searchText}
                                onTextChange={handleTextChange}
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
                        <table className={styles.Board_table}key={datas.id}>
                            <tbody>
                                {datas.map((post) => (
                                    <tr>
                                        <td className={styles.number}>{post.postNo}</td>
                                        <td className={styles.postTitle}>{post.title}</td>
                                        <td className={styles.writer}>{post.writer}</td>
                                        <td className={styles.writeTime}>{post.crtDate}</td>
                                        <td className={styles.views}>{post.count}</td>
                                    </tr>
                                ))} */}
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