import React from 'react'
import styles from './Notice_create.module.css';
import { Link, useNavigate } from 'react-router-dom';

const Notice_create = () => {


  return (
    <div className={styles.container}>
      <div className={styles.side_bar}>

      </div>
      <div className={styles.main}>
        <div className={styles.right_panel}>
          <div className={styles.header}>
            공지사항 작성
          </div>
          <div className={styles.title_container}>
            <input type='text' placeholder='제목을 입력하세요' className={styles.title} />
          </div>
          <div className={styles.textbox_container}>
            <textarea placeholder='내용을 입력하세요.' className={styles.textbox} />
          </div>
          <Link to={`/board/list`} className={styles.submit}>등록</Link>
        </div>
      </div>

    </div>
  )
}

export default Notice_create