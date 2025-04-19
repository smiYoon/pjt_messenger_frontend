import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import styles from './Feedback_detail.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';


const Feedback_detail = () => {

  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const { id } = useParams();

  useEffect(() => {
      const fetchPostData = async () => {
  
        try {
          const response = await fetch(`https://localhost:443/board/Feedback/${id}`, {
            method: 'GET',
          });
  
          if (response.ok) {
            const data = await response.json();
            console.log('게시글 정보:', data);
  
            setPost({
              title: data.title,
              crtDate: data.crtDate,
              author: data.employee.name,
              count: data.count,
              detail: data.detail,
            });
          } else {
            console.error('게시글 정보 불러오기 실패:', response.statusText);
          }
        } catch (error) {
          console.error('오류발생:', error);
        }
      };
  
      fetchPostData();
    }, []);

   const handleClick = () => {
          Swal.fire({
              title: '삭제하시겠습니까?',
              icon: 'question',
              showCancelButton: true,
              confirmButtonText: '삭제',
              cancelButtonText: '취소'
          }).then((result) => {
              if(result.isConfirmed) {
                  navigate('/board/feedback/list');
              }
          })
      }

  const handleUpdateClick = () => {
    navigate(`/board/feedback/update/${ id }`);
  };


  return (
    <div className={styles.container}>
      <div className={styles.side_bar}>

      </div>
      <div className={styles.main}>
          <div className={styles.right_panel}>
            <div className={styles.header}>
              게시글 조회
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
                    {post.author}
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
              <button onClick={handleUpdateClick} className={styles.edit} >수정</button>
              <button onClick={handleClick} className={styles.cancel}>삭제</button>
            </div>
          </div>
      </div>

    </div>
  )
}

export default Feedback_detail