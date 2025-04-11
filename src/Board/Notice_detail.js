import React from 'react'
import styles from './Notice_detail.module.css';
import { Link, useNavigate } from 'react-router-dom';

const Notice_detail = () => {

  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate("/board/list");
  };

  const notice = [{
    id: "123",
    title: "제에에에에에에에에에에에에에에에에에목",
    empno: "작성자",
    count: 2,
    detail: "내애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애애용",
    crtDate: "2025.03.24",
  }];

  return (
    <div className={styles.container}>
      <div className={styles.side_bar}>

      </div>
      <div className={styles.main}>
        {notice.map((post) => (
          <div className={styles.right_panel}>
            <div className={styles.header}>
              공지사항 조회
            </div>
            <table className={styles.info}>
              <tbody>
                <tr>
                  <td className={styles.label}>
                    제목
                  </td>
                  <td className={styles.title}>
                    {post.title}
                  </td>
                </tr>
                <tr>
                  <td className={styles.label}>
                    작성일
                  </td>
                  <td className={styles.crtDate}>
                    {post.crtDate}
                  </td>
                  <td className={styles.label}>
                    작성자
                  </td>
                  <td className={styles.author}>
                    {post.empno}
                  </td>
                  <td className={styles.label}>
                    조회수
                  </td>
                  <td className={styles.count}>
                    {post.count}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className={styles.content}>
              {post.detail}
            </div>
            <div className={styles.buttonContainer}>
              <Link to={`/board/list`} className={styles.edit}>수정</Link>
              <button onClick={handleCancelClick} className={styles.cancel}>취소</button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Notice_detail