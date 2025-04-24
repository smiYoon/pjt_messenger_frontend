import React, { useState } from 'react'
import Swal from 'sweetalert2';
import styles from './Notice_create.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useLoadScript } from '../LoadScriptContext';

const Notice_create = () => {

  const { decodedToken, token } = useLoadScript();
  const navigate = useNavigate();

  const handleCancelClick = () => {
    Swal.fire({
      icon: 'warning',
      title: '공지사항 작성을 취소하시겠습니까?',
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

  const handleRegisterClick = () => {
    navigate(`/board/notice/list`)
  };

  const [registerForm, setRegisterForm] = useState({
    type: 1, //공지사항
    title: '',
    detail: '',
  });

  const handleChange = (field, value) => {
    setRegisterForm((prevData) => ({
        ...prevData,
        [field]: value,
    }));
};

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!registerForm.title || !registerForm.detail) {
      Swal.fire({
        icon: 'warning',
        title: '입력 오류',
        text: '빈칸을 모두 기입해주세요.',
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("type", registerForm.type);
      formData.append("title", registerForm.title);
      formData.append("detail", registerForm.detail);
      formData.append("authorEmpno", decodedToken.empno);
      formData.append("position", decodedToken.position);


      console.log("registerForm:", registerForm);
      console.log("formData:", formData);

      const response = await fetch('https://localhost/board/notice/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
      },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("게시글정보:", data);
        Swal.fire({
          icon: 'success',
          title: "게시글 등록이 완료되었습니다.",
          confirmButtonText: '확인',
        }).then(() => {
          handleRegisterClick();
        })
      } else {
        alert('게시글 등록에 실패했습니다.');
        console.error(response.statusText);
        // console.log(response);
      }
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
      console.error(error);
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
            공지사항 작성
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.title_container}>
              <input 
                type='text' 
                name='title'
                className={styles.title}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                placeholder='제목을 입력하세요' 
              />
            </div>
            <div className={styles.textbox_container}>
              <textarea 
                name='detail'
                className={styles.textbox}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                placeholder='내용을 입력하세요.' 
              />
            </div>
            <div className={styles.buttons}>
              <button type='submit' className={styles.submit}>등록</button>
              <button type='button' className={styles.cancel} onClick={handleCancelClick}>취소</button>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Notice_create