import styles from './List_member.module.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profile from '../Navbar/img/profile.png';

const List_member = () => {

  const [searchOption, setSearchOption] = useState('');
  const personalInfo = [
    {
      employeeId: "E2412001",
      file: `${profile}`,
      name: "김개똥1",
      position: "사원",
      dept: "영업1팀",
      phone: "010-2222-3333",
      email: "개빡친다@gmail.com"
    },
    {
      employeeId: "E2412003",
      file: `${profile}`,
      name: "김개똥2",
      position: "사원",
      dept: "영업2팀",
      phone: "010-3547-9844",
      email: "개빡친다@gmail.com"
    },
    {
      employeeId: "E2412007",
      file: `${profile}`,
      name: "김개똥3",
      position: "사원",
      dept: "영업3팀",
      phone: "010-3572-6548",
      email: "개빡친다@gmail.com"
    },
    {
      employeeId: "E2412005",
      file: `${profile}`,
      name: "김개똥4",
      position: "사원",
      dept: "영업4팀",
      phone: "010-8953-5376",
      email: "개빡친다@gmail.com"
    },
    {
      employeeId: "E2403002",
      file: `${profile}`,
      name: "김개똥5",
      position: "사원",
      dept: "운영1팀",
      phone: "010-7253-2375",
      email: "개빡친다@gmail.com"
    },
    {
      employeeId: "E1506003",
      file: `${profile}`,
      name: "김개똥6",
      position: "사원",
      dept: "운영2팀",
      phone: "010-2222-3333",
      email: "개빡친다@gmail.com"
    },
    {
      employeeId: "E1506005",
      file: `${profile}`,
      name: "김개똥7",
      position: "사원",
      dept: "운영3팀",
      phone: "010-2222-3333",
      email: "개빡친다@gmail.com"
    },
    {
      employeeId: "E1509002",
      file: `${profile}`,
      name: "김개똥8",
      position: "팀장",
      dept: "운영3팀",
      phone: "010-2222-3333",
      email: "개빡친다@gmail.com"
    },
    {
      employeeId: "E1811032",
      file: `${profile}`,
      name: "김개똥9",
      position: "팀장",
      dept: "운영3팀",
      phone: "010-2222-3333",
      email: "개빡친다@gmail.com"
    },
  ]


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
              <i class="fa-solid fa-magnifying-glass" />
            </div>
          </div>
        </div>
        <div className={styles.list}>
          {personalInfo.map((emp) => (
          <div className={styles.card}>
            <img src={profile} alt='' />
            <div className={styles.name}>
              {emp.name} {emp.position}
            </div>
            <div className={styles.dept}>
              {emp.dept}
            </div>
            <div className={styles.phone}>
              {emp.phone}
            </div>
            <div className={styles.email}>
              {emp.email}
            </div>
            <Link to={`/member/edit/${emp.employeeId}`} className={styles.detail}>자세히</Link>
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