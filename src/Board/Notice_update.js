import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import styles from './Notice_update.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useLoadScript } from '../LoadScriptContext';

const Notice_update = () => {
  const {token} = useLoadScript;

  const navigate = useNavigate();
  const [post, setPost] = useState({
    type: 2,
    title: "",
    detail: "",
  });
  const { id } = useParams();

  const handleCancelClick = () => {
    Swal.fire({
      icon: 'warning',
      title: '게시글 수정을 취소하시겠습니까?',
      text: '확인을 누르면 입력한 정보가 삭제됩니다.',
      allowOutsideClick: false,
      confirmButtonText: '확인',
      showCancelButton: true,
      cancelButtonText: '취소',
    }).then(result => {
      if (result.isConfirmed) {
        navigate(-1);
      } else if (result.isDismissed) {

      } // 이전 페이지로 이동
    });
  }

  const handleChange = (field, value) => {
    setPost((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleRegisterClick = () => {
    navigate('/board/notice/list');
  };

  useEffect(() => {
    const fetchPostData = async () => {

      try {
        const response = await fetch(`https://localhost:443/board/notice/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('게시글 정보:', data);

          setPost({
            title: data.title ? data.title : "",
            detail: data.detail ? data.detail : "",
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

  // 폼 제출 핸들러
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("detail", post.detail);

      console.log("post:", post);

      const response = await fetch(`https://localhost:443/board/notice/${id}`, {
        method: 'PUT', // 수정 요청은 PUT 메서드 사용
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
      },
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '게시글이 수정되었습니다.',
          confirmButtonText: '확인',
        }).then(() => {
          handleRegisterClick();
        });
      } else {
        console.error('수정 실패:', response.statusText);
        alert('게시글 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('요청 중 오류 발생:', error);
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
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
            게시글 수정
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div key={post.id} className={styles.title_container}>
              <input
                name='title'
                value={post.title}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                type='text'
                placeholder='제목을 입력하세요'
                className={styles.title} />
            </div>
            <div className={styles.textbox_container}>
              <textarea
                name='detail'
                value={post.detail}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                placeholder='내용을 입력하세요.'
                className={styles.textbox} />
            </div>

            <div className={styles.buttons}>
              <button type='submit' className={styles.submit}>확인</button>
              <button type='button' className={styles.cancel} onClick={handleCancelClick}>취소</button>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Notice_update