import styles from './Navbar.module.css';
import profile from './img/profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Navbar = () => {
  console.group('Navbar() invoked.'); console.groupEnd();

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
          <Link to={`/member/list`} className={styles.flip}>
            회원관리
          </Link>

          <button className={styles.flip}>
            채팅
          </button>

          <button className={styles.flip}>
            업무
          </button>

          <Link to={`/board/list`} className={styles.flip}>
            게시판
          </Link>

          <button className={styles.flip}>
            프로젝트
          </button>
      </div>

      <div className={styles.profile}>
        <img src={profile} alt='' />
        <div className={styles.logout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
