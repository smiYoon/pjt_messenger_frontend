import styles from './List_member.module.css';
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profile from '../Navbar/img/profile.png';

import SearchBar from '../SearchBar/SearchBar.js';


const List_member = () => {

  // const [searchOption, setSearchOption] = useState('');
  // const personalInfo = [
  //   {
  //     empno: "E2412001",
  //     file: `${profile}`,
  //     name: "김개똥1",
  //     position: "사원",
  //     dept_id: "영업1팀",
  //     tel: "010-2222-3333",
  //     email: "개빡친다@gmail.com"
  //   },
  //   {
  //     empno: "E2412003",
  //     file: `${profile}`,
  //     name: "김개똥2",
  //     position: "사원",
  //     dept_id: "영업2팀",
  //     tel: "010-3547-9844",
  //     email: "개빡친다@gmail.com"
  //   },
  //   {
  //     empno: "E2412007",
  //     file: `${profile}`,
  //     name: "김개똥3",
  //     position: "사원",
  //     dept_id: "영업3팀",
  //     tel: "010-3572-6548",
  //     email: "개빡친다@gmail.com"
  //   },
  //   {
  //     empno: "E2412005",
  //     file: `${profile}`,
  //     name: "김개똥4",
  //     position: "사원",
  //     dept_id: "영업4팀",
  //     tel: "010-8953-5376",
  //     email: "개빡친다@gmail.com"
  //   },
  //   {
  //     empno: "E2403002",
  //     file: `${profile}`,
  //     name: "김개똥5",
  //     position: "사원",
  //     dept_id: "운영1팀",
  //     tel: "010-7253-2375",
  //     email: "개빡친다@gmail.com"
  //   },
  //   {
  //     empno: "E1506003",
  //     file: `${profile}`,
  //     name: "김개똥6",
  //     position: "사원",
  //     dept_id: "운영2팀",
  //     tel: "010-2222-3333",
  //     email: "개빡친다@gmail.com"
  //   },
  //   {
  //     empno: "E1506005",
  //     file: `${profile}`,
  //     name: "김개똥7",
  //     position: "사원",
  //     dept_id: "운영3팀",
  //     tel: "010-2222-3333",
  //     email: "개빡친다@gmail.com"
  //   },
  //   {
  //     empno: "E1509002",
  //     file: `${profile}`,
  //     name: "김개똥8",
  //     position: "팀장",
  //     dept_id: "운영3팀",
  //     tel: "010-2222-3333",
  //     email: "개빡친다@gmail.com"
  //   },
  //   {
  //     empno: "E1811032",
  //     file: `${profile}`,
  //     name: "김개똥9",
  //     position: "팀장",
  //     dept_id: "운영3팀",
  //     tel: "010-2222-3333",
  //     email: "개빡친다@gmail.com"
  //   },
  // ]


    // 검색바 용
    const [searchWord, setSearchWord] = useState('name');// title /author, projectName, manager
    const [searchText, setSearchText] = useState('');
    
    const handleOptionChange = (e) => setSearchWord(e.target.value);
    const handleTextChange = (e) => setSearchText(e.target.value);
    
    const handleSearch = () => {
      fetch(`https://localhost:443/employee/search?searchWord=${searchWord}&searchText=${searchText}`)
      .then(res => res.json())
      .then(data => {
        console.log("🔍 검색 결과:", data);
        setMembers(data)});
      console.log("검색하는 내용:",'${searchWord} : ${searchText}');
      //검색 내용
    };

    const [members, setMembers] = useState([]);
      useEffect(() => {
 
        fetch("https://localhost:443/employee/all") //json 받을 url
          .then((res) => res.json())
          .then((data) => setMembers(data));
      }, []);
    
      useEffect(() => {
        console.log("members 상태:", members);
      }, [members]);


  // const [members, setMembers] = useState([]);
  // const fetchMembers = useCallback(async () => {

  //   try {
  //     const response = await fetch(`https://localhost:443/employee`, {
  //       method: 'GET',
  //     });

  //     if(response.ok) {
  //       const data = await response.json();
  //       console.log("data:", data);
  //       setMembers(data.map(members => ({
  //         empno: members.empno,
  //         name: members.name,
  //         email: members.email,
  //         tel: members.tel,
  //         position: members.position,
  //         dept_id: members.department.name,
  //       })));
  //     } else {
  //       console.error('불러오기 실패', response.statusText);
  //     }
  //   } catch(error) {
  //     console.error('Error fetching data:', error);
  //   }});

  //   useEffect(() => {
  //     fetchMembers();
  //   }, []);

  const level = ["", 
    "팀원", 
    "팀장", 
    "부서장", 
    "CEO", 
    "인사", 
    "", 
    "", 
    "시스템관리자"];
    // const level = {
    //   "1": "팀원",
    //   "2": "팀장",
    //   "3": "부서장",
    //   "4": "CEO",
    // };

  return (
    <div className={styles.container}>
      <div className={styles.left_panel}>
        <div className={styles.header}>
          사원 리스트
        </div>
        <div className={styles.main}>
          <Link to={`/member/register`} className={styles.register}>
            사원 등록
          </Link>





          <div className={styles.searchBar}>

              <SearchBar
                searchOption={searchWord}
                onOptionChange={handleOptionChange}
                searchText={searchText}
                onTextChange={handleTextChange}
                onSearch={handleSearch}
              />

            </div>

          {/* <div className={styles.search}>
            <select
              name='searchWord'
              className={styles.dropdown}
              value={searchOption}
              onChange={(e) => setSearchOption(e.target.value)}
            >
              <option value="">검색조건</option>
              <option value="name">이름</option>
              <option value="phone">전화번호</option>
            </select>
            <div className={styles.search_container}>
              <input type='text' className={styles.text} placeholder='검색어를 입력하세요.' />
              <i class="fa-solid fa-magnifying-glass" />
            </div>
          </div> */}


        </div>
        <div className={styles.list}>
          {members.map((member) => ( // 프론트 테스트용
          // {members.map((member) => (  // 이걸로 사용해야함
          <div className={styles.card} key={member.empno}>
            <img src={profile} alt='' />
            <div className={styles.name}>
              {member.name} {level[member.position]}
            </div>
            <div className={styles.dept}>
              {member.dept_id}
            </div>
            <div className={styles.tel}>
              {member.tel}
            </div>
            <div className={styles.email}>
              {member.email}
            </div>
            <Link to={`/member/edit/`} className={styles.detail}>자세히</Link>
            {/* <Link to={`/member/edit/${member.empno}`} className={styles.detail}>자세히</Link> */}
          </div>
          ))}
        </div>
        <div className={styles.paging}>
          1 2 3
        </div>
      </div>
      <div className={styles.right_panel}>
        조직도자리
      </div>
    </div>
  )
}

export default List_member;