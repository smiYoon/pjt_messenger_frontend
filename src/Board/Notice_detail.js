import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import styles from './Notice_detail.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useLoadScript } from '../LoadScriptContext';


const Notice_detail = () => {
  const { decodedToken, token } = useLoadScript();
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchPostData = async () => {

      try {
        const response = await fetch(`https://localhost:443/board/notice/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
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
  }, [id, token]);

  const handleCancelClick = () => {
    navigate(`/board/notice/list`);
  };

  const handleDeleteClick = async () => {
    const result = await Swal.fire({
      icon: 'warning',
      title: '게시글을 삭제하시겠습니까?',
      text: '삭제된 게시글은 되돌릴 수 없습니다. 계속 진행하시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`https://localhost/board/notice/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          await Swal.fire({
            icon: 'success',
            title: '게시글이 삭제되었습니다.',
            confirmButtonText: '확인',
          });

          if (result.isConfirmed) {
            navigate('/board/notice/list');
          }
        } else {
          console.error('삭제 실패:', response.statusText);
          alert('회원 삭제에 실패했습니다.');
        }
      } catch (error) {
        console.error('요청 중 오류 발생:', error);
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handleUpdateClick = () => {
    navigate(`/board/notice/update/${id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.side_bar}>
        <div className={styles.menu}>
          <Link to={`/board/notice/list`} className={`${styles.link} ${styles.active}`}>
            공지사항
          </Link>
          <Link to={`/board/feedback/list`} className={`${styles.link}`}>
            건의사항
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
            {
              (decodedToken.name === post.author || decodedToken.position === 9) && (
                <>
                  <button onClick={handleUpdateClick} className={styles.edit} >수정</button>
                  <button onClick={handleDeleteClick} className={styles.cancel}>삭제</button>
                </>
              )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Notice_detail