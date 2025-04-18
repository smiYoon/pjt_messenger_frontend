import React from "react";
import styles from './SearchBar.module.css';

    //  복붙
    //  // 검색바 용
    //     const [searchWord, setSearchWord] = useState('title');
    //     const [searchText, setSearchText] = useState('');
        
    //     const handleOptionChange = (e) => setSearchWord(e.target.value);
    //     const handleTextChange = (e) => setSearchText(e.target.value);
        
    //   //전체 리스트 받아오기
    //     const [datas, setDatas] = useState([]);
    //     useEffect(() => {
    
    //       fetch("https://localhost:443/employee/all") //json 받을 url
    //         .then((res) => res.json())
    //         .then((data) => setDatas(data.content));
    //     }, []);
      
    //     useEffect(() => {
    //       console.log("datas 상태:", datas.content);
    //     }, [datas]);
    
    
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

//  리턴에 넣어 쓰세요
            // <div className={styles.SearchBar}>
            //   <SearchBar
            //     searchOption={searchWord}
            //     onOptionChange={handleOptionChange}
            //     searchText={searchText}
            //     onTextChange={handleTextChange}
                // onSearch={handleSearch}
                // options={options}
            //   />
             
            // </div>


// css

const SearchBar = (
    {
        searchWord
        , onOptionChange
        , searchText
        , onTextChange
        , onSearch
        , options=[]
    }) => {
       

    return (
        <div className= {styles.searchBarOrigin}>
            <select 
            name="what"
            className={styles.selectBox} 
            value={searchWord} 
            onChange={onOptionChange}>
           
                {options.map(opt => (
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











