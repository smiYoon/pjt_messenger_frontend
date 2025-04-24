import styles from './Navbar.module.css';
import profile from '../Member/img/Default.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useLoadScript } from '../LoadScriptContext';
import Swal from 'sweetalert2';

const Navbar = () => {
  const { decodedToken, updateToken } = useLoadScript();

  // decodedToken이 로딩되기 전에는 아무것도 렌더링하지 않도록 처리
  if (!decodedToken) return null;
  console.log('decodedToken: ', decodedToken);

  const handleLinkClick = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: 'warning',
      title: '접근 권한 없음',
      text: '해당 페이지에 접근할 수 없습니다.',
      confirmButtonText: '확인',
    });
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('https://localhost/logout', {
        method: 'POST'
      });

      if (response.ok) {
        console.log('logout Successful');
        window.location.href = '/';
        updateToken('');
      } else {
        console.error('로그아웃 실패! ', response.status);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        {decodedToken.position === 5 || decodedToken.position === 9 ? (
          <Link to={`/member/list`} className={styles.flip}>
            <i className={`${styles.icon} fas fa-user`} />
            <div className={styles.text}>회원관리</div>
          </Link>
        ) : (
          <a
            href="#"
            className={styles.flip}
            onClick={handleLinkClick}
            style={{ cursor: 'pointer' }}
          >
            <i className={`${styles.icon} fas fa-user`} />
            <div className={styles.text}>회원관리</div>
          </a>
        )}

        {decodedToken.position !== 5 ? (
          <Link to={`/chat`} className={styles.flip}>
            <i className={`${styles.icon} fas fa-comment-dots`} />
            <div className={styles.text}>채팅</div>
          </Link>
        ) : (
          <a
            href="#"
            className={styles.flip}
            onClick={handleLinkClick}
            style={{ cursor: 'pointer' }}
          >
            <i className={`${styles.icon} fas fa-comment-dots`} />
            <div className={styles.text}>채팅</div>
          </a>
        )}

        {decodedToken.position !== 4 && decodedToken.position !== 5 ? (
          <Link to={`/work`} className={styles.flip}>
            <i className={`${styles.icon} fas fa-file-pen`} />
            <div className={styles.text}>업무</div>
          </Link>
        ) : (
          <a
            href="#"
            className={styles.flip}
            onClick={handleLinkClick}
            style={{ cursor: 'pointer' }}
          >
            <i className={`${styles.icon} fas fa-file-pen`} />
            <div className={styles.text}>업무</div>
          </a>
        )}
        {decodedToken.position !== 5 ? (
          <Link to={`/board/notice/list`} className={styles.flip}>
            <i className={`${styles.icon} fas fa-chalkboard`} />
            <div className={styles.text}>게시판</div>
          </Link>
        ) : (
          <a
            href="#"
            className={styles.flip}
            onClick={handleLinkClick}
            style={{ cursor: 'pointer' }}
          >
            <i className={`${styles.icon} fas fa-chalkboard`} />
            <div className={styles.text}>게시판</div>
          </a>
        )}

        {decodedToken.position !== 1 && decodedToken.position !== 5 ? (
          <Link to={`/project/list`} className={styles.flip}>
            <i className={`${styles.icon} fa-solid fa-list-check`} />
            <div className={styles.text}>프로젝트</div>
          </Link>
        ) : (
          <a
            href="#"
            className={styles.flip}
            onClick={handleLinkClick}
            style={{ cursor: 'pointer' }}
          >
            <i className={`${styles.icon} fa-solid fa-list-check`} />
            <div className={styles.text}>프로젝트</div>
          </a>
        )}
      </div>

      <div className={styles.profile}>
        <Link to={`/member/edit/${decodedToken.empno}`} className={styles.profile_link}>
          <div className={styles.profile_img}>
            <img
              src={`https://localhost/${decodedToken.empno}.png`}
              alt=''
              className={styles.profileImg} 
              onError={e => { e.target.onerror = null; e.target.src = profile; }}
            />
          </div>
        </Link>
        <div className={styles.logout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
