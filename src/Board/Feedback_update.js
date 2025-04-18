import React from 'react'
import styles from './Feedback_create.module.css';
import { Link, useNavigate } from 'react-router-dom';

const Feedback_update = () => {


  return (
    <div className={styles.container}>
      <div className={styles.side_bar}>

      </div>
      <div className={styles.main}>
        <div className={styles.right_panel}>
          <div className={styles.header}>
            게시글 수정
          </div>
          <div className={styles.title_container}>
            <input type='text' placeholder='제목을 입력하세요' className={styles.title} />
          </div>
          <div className={styles.textbox_container}>
            <textarea placeholder='내용을 입력하세요.' className={styles.textbox} />
          </div>
          <Link to={`/board/Feedbacklist`} className={styles.submit}>등록</Link>
        </div>
      </div>

    </div>
  )
}

export default Feedback_update