import styles from './List_member.module.css';
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profile from '../Navbar/img/profile.png';

import SearchBar from '../SearchBar/SearchBar.js';


const List_member = () => {


    // 검색바 용
    const [searchWord, setSearchWord] = useState('name');
    const [searchText, setSearchText] = useState('');
    
    const handleOptionChange = (e) => setSearchWord(e.target.value);
    const handleTextChange = (e) => setSearchText(e.target.value);
    
  //전체 리스트 받아오기
    const [members, setMembers] = useState([]);
    useEffect(() => {

      fetch("https://localhost:443/employee") //json 받을 url
        .then((res) => res.json())
        .then((data) =>  setMembers(data.content));
    }, []);
  
    useEffect(() => {
      console.log("members 상태:", members);
    }, [members]);


    //검색 내용 요청하기
    const handleSearch = () => {
      fetch(`https://localhost:443/employee/search?searchWord=${searchWord}&searchText=${searchText}`)
      .then(res => res.json())
      .then(data => {
        console.log("🔍 검색 결과:", data.content);
        setMembers(data.content)});
      console.log("검색하는 내용:",'${searchWord} : ${searchText}');
    };

    const options = [
      { value: "name", label: "이름" },
      { value: "tel", label: "전화번호" }
    ];



    

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
                options={options}
              />

            </div>


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