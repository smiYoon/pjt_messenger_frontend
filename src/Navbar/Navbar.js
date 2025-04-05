import styles from './Navbar.module.css';
import profile from './img/profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  console.group('Navbar() invoked.'); console.groupEnd();

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <div className={styles.chat}>
          <button>
            채팅
          </button>
        </div>

        <div className={styles.work}>
          <button>
            업무
          </button>
        </div>

        <div className={styles.board}>
          <button>
            게시판
          </button>
        </div>

        <div className={styles.project}>
          <button>
            프로젝트
          </button>
        </div>
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
