import styles from "./List_member.module.css";
import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Organization from "../Organization/Organization";
import SearchBar from "../SearchBar/SearchBar.js";
import profile from "../Navbar/img/profile.png";

const List_member = () => {
  const [searchWord, setSearchWord] = useState("name");
  const [searchText, setSearchText] = useState("");

  const [totalPages, setTotalPages] = useState(0);
  const [currPage, setCurrPage] = useState(0);

  const [members, setMembers] = useState([]);

  const pageSize = 10;
  const currBlock = Math.floor(currPage / pageSize);
  const startPage = currBlock * pageSize;
  const endPage = Math.min(startPage + pageSize, totalPages);

  const level = {
    "1": "팀원",
    "2": "팀장",
    "3": "부서장",
    "4": "CEO",
    "5": "인사담당자",
    "9": "시스템관리자"
  };

  const fetchMembers = useCallback(async (page) => {
    const token = localStorage.getItem("jwt");
    const baseUrl = searchText
      ? `https://localhost:443/employee/search?searchWord=${searchWord}&searchText=${searchText}`
      : "https://localhost:443/employee?";

    try {
      const response = await fetch(`${baseUrl}&currPage=${page}&pageSize=10`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const formattedData = data.content.map(member => ({
          crtDate: member.crtDate,
          empno: member.empno,
          name: member?.name,
          email: member.email,
          tel: member.tel,
          position: member.position,
          dept_id: member.department.name,
        }));

        //직급순으로정렬
        const sortedData = formattedData.sort((a, b) => b.position - a.position);
        setMembers(sortedData);
        setTotalPages(data.totalPages);
        setCurrPage(page);

        // setMembers(data.content);
        // setTotalPages(data.totalPages);
        // setCurrPage(page);
   
      } else {
        console.error("불러오기 실패", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },[searchWord, searchText]);

  useEffect(() => {
    fetchMembers(0);
  }, []);

  const options = [
    { value: "name", label: "이름" },
    { value: "tel", label: "전화번호" },
  ];

  const handleSearch = () => {
    fetchMembers(0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left_panel}>
        <div className={styles.header}>사원 리스트</div>
        <div className={styles.main}>
          <Link to={`/member/register`} className={styles.register}>
            사원 등록
          </Link>


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

        <div className={styles.list}>
          {members.map((member) => (
            <div className={styles.card} key={member.empno}>
              <img src={profile} alt="profile" />
              <div className={styles.name}>
                {member.name} ({level[member.position] || "알 수 없음"})
              </div>
              <div className={styles.dept}>{member.dept_id}</div>
              <div className={styles.phone}>{member.tel}</div>
              <div className={styles.email}>{member.email}</div>
              <Link
                to={`/member/edit/${member.empno}`}
                className={styles.detail}
              >
                자세히
              </Link>
            </div>
          ))}
        </div>

        <div className={styles.paging}>
          <button
            className={styles.btn}
            onClick={() => fetchMembers(0)}
            disabled={currPage === 0}
          >
            <i className="fas fa-angles-left"></i>처음
          </button>

          <button
            className={styles.btn}
            onClick={() => fetchMembers(startPage - 1)}
            disabled={currPage <= 9}
          >
            <i className="fas fa-angle-left"></i>이전
          </button>

          <button
            className={styles.btn}
            onClick={() => fetchMembers(currPage - 1)}
            disabled={currPage === 0}
          >
            <i className="fas fa-angle-left"></i>-1
          </button>

          {Array.from({ length: endPage - startPage }, (_, i) => startPage + i).map((pageNum) => (
            <button
              key={pageNum}
              className={currPage === pageNum ? styles.activePage : ""}
              onClick={() => fetchMembers(pageNum)}
            >
              {pageNum + 1}
            </button>
          ))}

          <button
            className={styles.btn}
            onClick={() => fetchMembers(currPage + 1)}
            disabled={currPage >= totalPages - 1}
          >
            +1<i className="fas fa-angle-right"></i>
          </button>

          <button
            className={styles.btn}
            onClick={() => fetchMembers(endPage)}
            disabled={currPage >= totalPages - 1}
          >
            <i className="fas fa-angle-right"></i>이후
          </button>

          <button
            className={styles.btn}
            onClick={() => fetchMembers(totalPages - 1)}
            disabled={currPage >= totalPages - 1}
          >
            <i className="fas fa-angles-right"></i>마지막
          </button>
        </div>


      </div>

      <div className={styles.right_panel}>
        <Organization />
      </div>
    </div>
  );
};

export default List_member;
