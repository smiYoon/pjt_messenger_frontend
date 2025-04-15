import styles from './List_member.module.css';
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profile from '../Navbar/img/profile.png';

const List_member = () => {

  const [searchOption, setSearchOption] = useState('');

  const [members, setMembers] = useState([]);
  const fetchMembers = useCallback(async () => {

    try {
      const response = await fetch(`https://localhost:443/employee`, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        console.log("data:", data);
        const formattedData = data.map(members => ({
          crtDate: members.crtDate,
          empno: members.empno,
          name: members?.name,
          email: members.email,
          tel: members.tel,
          position: members.position,
          dept_id: members.department.name,
        }));

        const sortedData = formattedData.sort((a, b) => b.position - a.position);
        setMembers(sortedData);

      } else {
        console.error('불러오기 실패', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const level = {
    "1": "팀원",
    "2": "팀장",
    "3": "부서장",
    "4": "CEO",
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
              value={searchOption}
              onChange={(e) => setSearchOption(e.target.value)}
            >
              <option value="">검색조건</option>
              <option value="name">이름</option>
              <option value="phone">전화번호</option>
            </select>
            <div className={styles.search_container}>
              <input type='text' className={styles.text} placeholder='검색어를 입력하세요.' />
              <i className="fa-solid fa-magnifying-glass" />
            </div>
          </div>
        </div>
        <div className={styles.list}>
          {/* {personalInfo.map((member) => ( // 프론트 테스트용 */}
          {members.map((member) => (  // 이걸로 사용해야함
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