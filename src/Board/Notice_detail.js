import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import styles from './Notice_detail.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useLoadScript } from '../LoadScriptContext';


const Notice_detail = () => {

  const { decodedToken, role_level } = useLoadScript();
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchPostData = async () => {

      try {
        const response = await fetch(`https://localhost/board/notice/${id}`, {
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

  const handleCancelClick = () => {
    navigate(`/board/notice/list`);
  };

  const handleClick = () => {
    Swal.fire({
      title: '삭제하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/board/notice/list');
      }
    })
  };

  const handleUpdateClick = () => {
    navigate(`/board/notice/update/${id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.side_bar}>
        <div className={styles.menu}>
          <Link
            className={styles.notice}
            to={`/board/notice/list`}
          >
            공지사항 게시판
          </Link>
          <Link
            className={styles.feedback}
            to={`/board/feedback/list`}
          >
            건의 게시판
          </Link>
        </div>
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
            <button onClick={handleCancelClick} className={styles.cancel}>뒤로</button>
            {decodedToken.name === post.author && (
              <>
                <button onClick={handleUpdateClick} className={styles.edit} >수정</button>
                <button onClick={handleClick} className={styles.cancel}>삭제</button>
              </>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Notice_detail