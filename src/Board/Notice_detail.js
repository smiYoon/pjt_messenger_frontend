import React from 'react'
import Swal from 'sweetalert2'
import styles from './Notice_detail.module.css';
import { Link, useNavigate } from 'react-router-dom';


const Notice_detail = () => {

  const navigate = useNavigate();

   const handleClick = () => {
          Swal.fire({
              title: '삭제하시겠습니까?',
              icon: 'question',
              showCancelButton: true,
              confirmButtonText: '삭제',
              cancelButtonText: '취소'
          }).then((result) => {
              if(result.isConfirmed) {
                  navigate('/board/notice/list');
              }
          })
      }

  const handleCancelClick = () => {
    navigate("/board/notice/list");
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
              <button onClick={handleCancelClick} className={styles.edit} >수정</button>
              <button onClick={handleClick} className={styles.cancel}>삭제</button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Notice_detail