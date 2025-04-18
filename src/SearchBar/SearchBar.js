import React from "react";
import styles from "./SearchBar.module.css";

//  복붙
/*
  // 검색바 용
  const [searchWord, setSearchWord] = useState("name");
  const [searchText, setSearchText] = useState("");
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const [currPage, setCurrPage] = useState(0); // 현재 페이지 번호
  const [datas, setDatas] = useState([]);

  const pageSize =10;
  const currBlock = Math.floor(currPage / pageSize);
  const startPage = currBlock * pageSize;
  const endPage = Math.min(startPage + pageSize, totalPages);

  const handleOptionChange = (e) => setSearchWord(e.target.value);
  const handleTextChange = (e) => setSearchText(e.target.value);


  //fetch 통합 버전
const fetchDatas= (page=0) => {
    const baseUrl = searchText
    ? `https://localhost:443/employee/search?searchWord=${searchWord}&searchText=${searchText}`
    : "https://localhost:443/employee?";
    
    fetch(`${baseUrl}&currPage=${page}&pageSize=10`)
    .then((res) => res.json())
    .then((data) => {
        setDatas(data.content);
        setTotalPages(data.totalPages);
        setCurrPage(page); 
});}

useEffect(() => { // 첫로딩용
  fetchDatas(0);
},[]);

const handleSearch = () => {
  fetchDatas(0); //검색하면 0페이지 부터 보이게
};

const options = [
    { value: "name", label: "이름" },
    { value: "tel", label: "전화번호" },
  ];
*/


//   //전체 리스트 받아오기
//     useEffect(() => {
//
//       fetch(`https://localhost:443/employee?currPage=${currPage}&size=10`) //json 받을 url
//         .then((res) => res.json())
//         .then((data) =>{setMembers(data.content);
//      console.log("총 페이지 수:", data.totalPages);
//      console.log("현재 페이지 데이터:", data.content);
//      });
//     }, [currPage]);// currPage가 바뀔 때마다 fetch
//
//     useEffect(() => {
//       console.log("datas 상태:", datas.content);
//     }, []);
// 
// const handlePageClick = (pageNum) => {
//     setCurrPage(pageNum);
//   };
// 
//     //검색 내용 요청하기
//     const handleSearch = () => {
//       fetch(`https://localhost:443/employee/search?searchWord=${searchWord}&searchText=${searchText}`)
//       .then(res => res.json())
//       .then(data => {
//         console.log("🔍 검색 결과:", data.content);
//         setDatas(data.content)});
//       console.log("검색하는 내용:",'${searchWord} : ${searchText}');
//     };


//     const options = [
//       //사원관리
//       { value: "name", label: "이름" },
//       { value: "tel", label: "전화번호" }
//       //게시판 관리
//       { value: "title", label: "제목" },
//       { value: "name", label: "이름"  }
//     ];


/* 리턴에 넣어 쓰세요
<div className={styles.SearchBar}>
  <SearchBar
    searchOption={searchWord}
    onOptionChange={handleOptionChange}
    searchText={searchText}
    onTextChange={handleTextChange}
    onSearch={handleSearch}
    options={options}
  />

</div>
*/

/*
        <div className={styles.paging}>
            <button className={styles.btn} onClick={() => fetchDatas(0)} disabled={currPage === 0}>
            <i className="fas fa-angles-left"></i>처음
            </button>

            <button className={styles.btn} onClick={() => fetchDatas(startPage -1)} disabled={currPage <= 9}>
            <i className="fas fa-angle-left"></i>이전
            </button>

            <button className={styles.btn} onClick={() => fetchDatas(currPage -1)} disabled={currPage ===0}>
            -1<i className="fas fa-angle-left"></i>
            </button>

            {Array.from({ length: endPage - startPage }, (_, i) => startPage + i).map((pageNum) => (
            <button
              key={pageNum}
              className={currPage === pageNum ? styles.activePage : ""}
              onClick={() => fetchDatas(pageNum)}  // ← 이 부분에서 currPage 변경됨
            >
              {pageNum + 1}
            </button>
            ))}

          <button className={styles.btn} onClick={() => fetchDatas(currPage + 1)} disabled={currPage >= totalPages - 1}>
          +1<i className="fas fa-angle-right"></i>
          </button>

          <button className={styles.btn} onClick={() => fetchDatas(endPage)} disabled={currPage >= totalPages - 1}>
          <i className="fas fa-angle-right"></i>이후
          </button>

          <button className={styles.btn} onClick={() => fetchDatas(totalPages -1)} disabled={currPage >= totalPages -1}>
          <i className="fas fa-angles-right"></i>마지막
          </button>  
        </div>
*/

// css
/*
.activePage {
    font-weight: bold;
    color: red;
    border-bottom: 2px solid red;
  }

  .paging { 
    justify-content: center;
    align-items: center;
    font-size: 12px;
    
}

.activePage {
    display: flex;
    background-color: #5a5;
    color: white;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
  }

.btn {
    cursor: pointer;

}

*/

const SearchBar = ({
  searchWord,
  onOptionChange,
  searchText,
  onTextChange,
  onSearch,
  options = [],
}) => {
  return (
    <div className={styles.searchBarOrigin}>
      <select
        name="what"
        className={styles.selectBox}
        value={searchWord}
        onChange={onOptionChange}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
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
            }
          }}
        />

        <button className={styles.searchBtn} onClick={onSearch}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </div>
  );
}; //SearchBar

export default SearchBar;
