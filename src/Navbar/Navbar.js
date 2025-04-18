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

          <Link to={`/chat`} className={styles.flip}>
            채팅
          </Link>

          <Link to={`/work`} className={styles.flip}>
            업무
          </Link>

          <Link to={`/board/notice/list`} className={styles.flip}>
            게시판
          </Link>

          <Link to={`/project/list`} className={styles.flip}>
            프로젝트
          </Link>
      </div>

      <div className={styles.profile}>
        <img src={ profile } alt='' className={styles.profileImg} />
        <div className={styles.logout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
