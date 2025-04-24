import styles from './List_member.module.css';
import React, { useState, useEffect, useCallback } from 'react';
import Organization from '../Organization/Organization';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import profile from './img/Default.png';
import { useLoadScript } from '../LoadScriptContext';

const List_member = () => {
  const { deptName, empPositionMapping, token } = useLoadScript();
  const [searchWord, setSearchWord] = useState("");
  const [searchText, setSearchText] = useState("");
  const [appliedSearchText, setAppliedSearchText] = useState("");
  const [appliedSearchWord, setAppliedSearchWord] = useState("");
  const [selectedDeptId, setSelectedDeptId] = useState(null);
  const [members, setMembers] = useState([]);
  const [searchParams] = useSearchParams();
  const initialPage = Number(searchParams.get('page')) || 0;
  const navigate = useNavigate();

  const [currPage, setCurrPage] = useState(initialPage); // 0부터 시작
  const [pageSize] = useState(8);
  const [blockSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  // 페이징 관련 값은 렌더링 시점에 계산
  const currBlock = Math.floor(currPage / blockSize);
  const startPage = currBlock * blockSize;
  const endPage = Math.min(startPage + blockSize, totalPages);

  const fetchMembers = useCallback(async () => {
    try {
      const url = new URL('https://localhost/employee');
      url.searchParams.append('currPage', currPage);
      url.searchParams.append('pageSize', pageSize);

      if (selectedDeptId) {
        url.searchParams.append('deptId', selectedDeptId);
      }
      if (appliedSearchText) {
        if (appliedSearchWord) {
          url.searchParams.append('searchWord', appliedSearchWord);
        }
        url.searchParams.append('searchText', appliedSearchText);
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

        setTotalPages(isPaginated ? data.totalPages : 1);
        // setMembers(formattedData.sort((a, b) => b.position - a.position));
        setMembers(formattedData);
      } else {
        setMembers([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [pageSize, selectedDeptId, currPage, appliedSearchText, appliedSearchWord, token]);

  useEffect(() => {
    fetchMembers();
  }, [currPage, selectedDeptId, appliedSearchText, appliedSearchWord, pageSize]);

  const handlePageChange = (newPage) => {
    setCurrPage(newPage);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setAppliedSearchText(searchText);
      setAppliedSearchWord(searchWord);
      setCurrPage(0);
    }
  };

  const handleSearch = () => {
    setAppliedSearchText(searchText);
    setAppliedSearchWord(searchWord);
    setCurrPage(0);
  };

  const handleDeptSelect = (deptId) => {
    setSelectedDeptId(deptId);
    setCurrPage(0);
  };

  const handleCancelDept = () => {
    setSelectedDeptId(null);
    setCurrPage(0);
  };

  const renderPagination = () => {
    return Array.from({ length: endPage - startPage }, (_, i) => {
      const pageNum = startPage + i;
      return (
        <button
          key={pageNum}
          onClick={() => handlePageChange(pageNum)}
          className={`${styles.btn} ${pageNum === currPage ? styles.activePage : ''}`}
        >
          {pageNum + 1}
        </button>
      );
    });
  };

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
                onKeyUp={handleKeyPress}
              />
              <i className="fa-solid fa-magnifying-glass" />
            </div>
            <button onClick={handleSearch} className={styles.searchButton}>
              검색
            </button>
          </div>
        </div>

        <div className={styles.list}>
          {members.length === 0 ? (
            <div className={styles.emptyMessage}>
              해당 조건을 만족하는 사원이 없습니다.
            </div>
          ) : (
            members.map((member) => (
              <div key={member.empno} className={styles.card}>
                <div className={styles.profile_container}>
                  <img
                    src={`https://localhost/${member.empno}.png`}
                    className={styles.profileImg}
                    alt='' 
                    onError={e => { e.target.onerror = null; e.target.src = profile; }}
                    />
                </div>
                <div className={styles.name}>
                  {empPositionMapping[member.position]}
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
                <Link to={`/member/edit/${member.empno}?page=${currPage}`} className={styles.detail}>자세히</Link>
              </div>
            ))
          )}
        </div>
        <div className={styles.paging}>

          <button
            className={styles.btn}
            onClick={() => handlePageChange(startPage - blockSize + 1)}
            style={{ display: currPage <= 10 ? "none" : "" }}
          >
            <i className="fas fa-angles-left"></i>
          </button>

          {currPage > 0 && (
            <button className={styles.btn} onClick={() => handlePageChange(currPage - 1)}>
              <i className="fas fa-angle-left" />
            </button>
          )}

          {Array.from({ length: endPage - startPage }, (_, i) => startPage + i).map((pageNum) => (
            <button
              key={pageNum}
              className={`${styles.btn} ${pageNum === currPage ? styles.activePage : ''}`}
              onClick={() => handlePageChange(pageNum)}
            >
              {pageNum + 1}
            </button>
          ))}
          {currPage < totalPages - 1 && (
            <button className={styles.btn} onClick={() => handlePageChange(currPage + 1)}>
              <i className="fas fa-angle-right" />
            </button>
          )}

          <button
            className={styles.btn}
            onClick={() => handlePageChange(endPage + 1)}
            style={{ display: (endPage + 1) > totalPages || totalPages === 0 ? "none" : "" }}
          >
            <i className="fas fa-angles-right"></i>
          </button>

        </div>
      </div>

      <div className={styles.right_panel}>
        <Organization onDeptSelect={handleDeptSelect} />
        <div className={styles.deptContainer}>
          <div>선택된 부서: {selectedDeptId != null ? deptName[selectedDeptId] : '없음'}</div>
          <button onClick={handleCancelDept} className={styles.deptButton}>부서 선택 해제</button>
        </div>
      </div>
    </div>
  );
};

export default List_member;
