import React from "react";
import styles from './SearchBar.module.css';

//부모태그 밑에 import 하고 쓰세요
//   // 검색바 용
//   const [searchOption, setSearchOption] = useState('title');//기본은 title 외 author, projectName, manager
//   const [searchText, setSearchText] = useState('');
  
//   const handleOptionChange = (e) => setSearchOption(e.target.value);
//   const handleTextChange = (e) => setSearchText(e.target.value);
  
//   const handleSearch = () => {
//     console.log("검색하는 내용:",'${searchOption} : ${searchText}');
//     //검색 내용
//   };

//  리턴에 넣어 쓰세요
//             <div className={styles.SearchBar}>
//               <SearchBar
//                 searchOption={searchOption}
//                 onOptionChange={handleOptionChange}
//                 searchText={searchText}
//                 onTextChange={handleTextChange}
//               />
//               <button onClick={handleSearch}>검색</button>
//    
//             </div>


// css

const SearchBar = (
    {
        searchWord
        , onOptionChange
        , searchText
        , onTextChange
        ,onSearch
    }) => {
       

    return (
        <div className= {styles.searchBarOrigin}>
            <select 
            name="what"
            className={styles.selectBox} 
            value={searchWord} 
            onChange={onOptionChange}>
                {/* 사원리스트*/}
                <option value="name">이름</option>
                <option value="tel">전화번호</option>

                {/* 게시판*/}       
                {/* <option value="title">제목</option>
                <option value="author">작성자</option> */}

                {/* 프로젝트  */}
                {/* <option value="projectName">프로젝트명</option>
                <option value="manager">담당자</option> */}
            </select>

            <div className={styles.searchIpBtn}>
            <input
                type="text"
                className={styles.searchInput}
                value={searchText}
                onChange={onTextChange}
                placeholder="검색어를 입력하세요"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onSearch();
                    }}}                
            />

              <button className={styles.searchBtn} onClick={onSearch}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
           
              </div>
        </div>
    );
};//SearchBar


export default SearchBar;











