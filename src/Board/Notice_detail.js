import React from 'react'
import styles from './Notice_detail.module.css';
import { Link, useNavigate } from 'react-router-dom';

const Notice_detail = () => {

  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate("/board/list");
  };

  return (
    <div className={styles.container}>
      <div className={styles.side_bar}>

      </div>
      <div className={styles.main}>
        <div className={styles.right_panel}>
          <div className={styles.header}>
            공지사항 조회
          </div>
          <div className={styles.main}>

          </div>
          <div className={styles.buttonContainer}>
            <Link to={`/board/list`} className={styles.edit}>수정</Link>
            <button onClick={handleCancelClick} className={styles.cancel}>취소</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Notice_detail