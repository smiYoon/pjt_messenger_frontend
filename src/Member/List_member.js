import styles from './List_member.module.css';
import React, { useState, useEffect, useCallback } from 'react';
import Organization from '../Organization/Organization';
import { Link, useNavigate } from 'react-router-dom';
import profile from '../Navbar/img/profile.png';
import { useLoadScript } from '../LoadScriptContext';
import Swal from 'sweetalert2';

const List_member = () => {
  const { deptName, level } = useLoadScript();
  const [searchWord, setSearchWord] = useState("");
  const [searchText, setSearchText] = useState("");
  const [appliedSearchText, setAppliedSearchText] = useState("");
  const [appliedSearchWord, setAppliedSearchWord] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currPage, setCurrPage] = useState(0);
  const [selectedDeptId, setSelectedDeptId] = useState(null);
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  const pageSize = 8;
  const currBlock = Math.floor(currPage / 8);
  const startPage = currBlock * 8;
  const endPage = Math.min(startPage + 8, totalPages - 1);

  const fetchMembers = useCallback(async () => {
    console.log('deptId:', selectedDeptId);
    try {
      const url = new URL('https://localhost/employee');
      url.searchParams.append('currPage', currPage);
      url.searchParams.append('pageSize', pageSize);

      // 부서 선택 시
      if (selectedDeptId) {
        url.searchParams.append('deptId', selectedDeptId);
      }

      // 검색어 입력 시
      if (appliedSearchText) {
        if (appliedSearchWord) {
          url.searchParams.append('searchWord', appliedSearchWord);
        }
        url.searchParams.append('searchText', appliedSearchText);
      }

      const response = await fetch(url, { method: 'GET' });
      if (response.ok) {
        const data = await response.json();
        const isPaginated = !!data.content;
        const formattedData = (isPaginated ? data.content : data).map(member => ({
          crtDate: member.crtDate,
          empno: member.empno,
          name: member.name,
          email: member.email,
          tel: member.tel,
          position: member.position,
          dept_id: member.department?.name || '부서 없음',
        }));

        setMembers(formattedData.sort((a, b) => b.position - a.position));
        if (isPaginated) setTotalPages(data.totalPages);
      } else {
        setMembers([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [pageSize, selectedDeptId, currPage, appliedSearchText, appliedSearchWord]);

  useEffect(() => {
    fetchMembers();
  }, [currPage, fetchMembers]);

  const handlePageChange = (newPage) => {
    setCurrPage(newPage);
  };

  const handleSearch = () => {
    // fetchMembers(0, selectedDeptId, searchWord, searchText);
    setAppliedSearchText(searchText);
    setAppliedSearchWord(searchWord);
    setCurrPage(0);
  };

  const handleDeptSelect = (deptId) => {
    setSelectedDeptId(deptId);
    setCurrPage(0);
  }

  const handleCancelDept = () => {
    setSelectedDeptId(null);
    setCurrPage(0);
    fetchMembers(0);
  }

  const renderPagination = () => {
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => {
      const pageNum = startPage + i;
      return (
        <button
          key={pageNum}
          onClick={() => handlePageChange(pageNum)}
          className={pageNum === currPage ? styles.activePage : ''}
        >
          {pageNum + 1}
        </button>
      )
    })
  }

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
          <div className={styles.search}>
            <select
              name='searchWord'
              className={styles.dropdown}
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
            >
              <option value="">검색조건</option>
              <option value="name">이름</option>
              <option value="tel">전화번호</option>
            </select>
            <div className={styles.search_container}>
              <input
                type='text'
                className={styles.text}
                placeholder='검색어를 입력하세요.'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <i className="fa-solid fa-magnifying-glass" />
            </div>
            <button onClick={handleSearch} className={styles.searchButton}>
              검색
            </button>
          </div>
        </div>

        <div className={styles.list}>
          {/* {personalInfo.map((member) => ( // 프론트 테스트용 */}
          {members.length === 0 ? (
            <div className={styles.emptyMessage}>
              해당 조건을 만족하는 사원이 없습니다.
            </div>
          ) : (
            members.map((member) => (  // 이걸로 사용해야함
              <div key={member.empno} className={styles.card}>
                <img src={profile} alt='' />
                <div className={styles.name}>
                  {level[member.position]}
                </div>
                <div className={styles.name}>
                  {member.name}
                </div>
                <div className={styles.dept}>
                  {member.dept_id}
                </div>
                <div className={styles.phone}>
                  {member.tel}
                </div>
                <div className={styles.email}>
                  {member.email}
                </div>
                {/* <Link to={`/member/edit/`} className={styles.detail}>자세히</Link> */}
                <Link to={`/member/edit/${member.empno}`} className={styles.detail}>자세히</Link>
              </div>
            )))}
        </div>
        <div className={styles.paging}>
          {currPage > 0 && (
            <button onClick={() => handlePageChange(currPage - 1)}>
              이전
            </button>
          )}
          {renderPagination()}
          {currPage < totalPages - 1 && (
            <button onClick={() => handlePageChange(currPage + 1)}>
              다음
            </button>
          )}
        </div>
      </div>

      <div className={styles.right_panel}>
        <Organization onDeptSelect={handleDeptSelect} />
        {selectedDeptId != null ? (
          <div className={styles.deptContainer}>
            <div>선택된 부서: {deptName[selectedDeptId]}</div>
            <button onClick={handleCancelDept} className={styles.deptButton}>부서 선택 해제</button>
          </div>
        ) : (
          <div className={styles.deptContainer}>
            <div>선택된 부서: 없음</div>
            <button onClick={handleCancelDept} className={styles.deptButton}>부서 선택 해제</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default List_member;