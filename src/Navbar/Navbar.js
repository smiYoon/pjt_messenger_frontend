import styles from './Navbar.module.css';
import profile from './img/profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useLoadScript } from '../LoadScriptContext';

const Navbar = () => {
const { role_level, decodedToken } = useLoadScript();

  console.group('Navbar() invoked.'); console.groupEnd();

  const handleLogout = async () => {

    try {
      const response = await fetch('https://localhost/logout', {
        method: 'POST'
      });

      if (response.ok) {
        console.log('logout Successful');
        window.location.href = '/'; // 로그아웃 성공 시 리다이렉트( 프론트 주소 입력해야 함.)
      } else {
        console.error('로그아웃 실패! ', response.status);
      }

    } catch (error) {
      console.error('Error during logout:', error);
    } // try

  } // handlelogout




  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        {role_level[decodedToken.roles] === 5 && (
          <Link to={`/member/list`} className={styles.flip}>
            <i className={`${styles.icon} fas fa-user`} />
            <div className={styles.text}>회원관리</div>
          </Link>
        )}

        {role_level[decodedToken.roles] != 5 && (
          <Link className={styles.flip}>
            <i className={`${styles.icon} fas fa-comment-dots`} />
            <div className={styles.text}>채팅</div>
          </Link>
        )}

        {role_level[decodedToken.roles] != 4 && (
          <Link className={styles.flip}>
            <i className={`${styles.icon} fas fa-file-pen`} />
            <div className={styles.text}>업무</div>
          </Link>
        )}

        <Link to={`/board/notice/list`} className={styles.flip}>
          <i className={`${styles.icon} fas fa-chalkboard`} />
          <div className={styles.text}>게시판</div>
        </Link>

        {role_level[decodedToken.roles] != 1 && (
          <Link className={styles.flip}>
            <i className={`${styles.icon} fa-solid fa-list-check`} />
            <div className={styles.text}>프로젝트</div>
          </Link>
        )}
      </div>

      <div className={styles.profile}>
        <img src={profile} alt='' className={styles.profileImg} />
        <div className={styles.logout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
