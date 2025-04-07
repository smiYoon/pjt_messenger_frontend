import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styles from './Register_member.module.css';

const Register_member = () => {
    const [inputId, setInputId] = useState('');
    const [inputPasswd, setInputPasswd] = useState('');
    const [inputName, setInputName] = useState('');
    const [inputPhoneNum, setInputPhoneNum] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();
    
    const handlerIdChange = (e) => setInputId(e.target.value);
    const handlerPasswdChange = (e) => setInputPasswd(e.target.value);
    const handlerNameChange = (e) => setInputName(e.target.value);
    const handlerPhoneNumChange = (e) => setInputPhoneNum(e.target.value);
    const handlerEmailChange = (e) => setInputEmail(e.target.value);
    const handlerChange = (e) => setInputValue(e.target.value);
    const handleCancelClick = () => {
      navigate(-1); // 이전 페이지로 이동
    };

    // 번호 포멧팅 함수
    function formatPhoneNumber(tel) {
        const telStr = tel.toString();
        return `${telStr.slice(0, 3)}-${telStr.slice(3, 7)}-${telStr.slice(7, 11)}`;
    }


    


    return (
        <div className={styles.container}>
            <div className={styles.left_panel}>
                <div className={styles.register_title}>REGISTER</div>
                <div className={styles.register_img} />
            </div>
            <div className={styles.right_panel}>
                <div className={styles.input_box}>
                    <div className={styles.single_input}>
                        <input type='text' value={inputId} className={styles.input} onChange={handlerIdChange} placeholder='아이디' />
                    </div>
                    <div className={styles.single_input}>
                        <input type='text' value={inputPasswd} className={styles.input} onChange={handlerPasswdChange} placeholder='비밀번호' />
                    </div>
                    <div className={styles.two_input}>
                        <input type='text' value={inputName} className={styles.smallinput} onChange={handlerNameChange} placeholder='이름' />
                        <input type='number' value={inputPhoneNum} className={styles.largeinput} onChange={handlerPhoneNumChange} placeholder='휴대폰 번호' />
                    </div>
                    <div className={styles.two_input}> 
                        <input type='text' className={styles.largeinput} placeholder='주소' />
                        <input type='number' className={styles.smallinput} placeholder='우편번호' />
                    </div>
                    <div className={styles.single_input}>
                        <input type='text' value={inputEmail} className={styles.input} onChange={handlerEmailChange} placeholder='이메일' />
                    </div>
                    <div className={styles.role_box}>
                        <select
                            name='Department'
                            // className={styles.Department}
                            onChange={handlerChange}
                        >
                            <option value="">부서</option>
                            <option value="1">개발</option>
                            <option value="2">운영</option>
                            <option value="3">인사</option>
                            <option value="4">회계</option>
                            <option value="5">마케팅</option>
                        </select>
                        <select
                            name='Position'
                            // className={styles.Position}
                            onChange={handlerChange}
                        >
                            <option value="">직급</option>
                            <option value="1">팀원</option>
                            <option value="2">팀장</option>
                            <option value="3">부서장</option>
                            <option value="4">CEO</option>
                            <option value="5">인사담당자</option>
                        </select>
                    </div>
                    <div className={styles.button_box}>
                        <div>
                            <button>등록</button>
                        </div>
                        <div>
                            <button onClick={handleCancelClick} >취소</button>
                        </div>
                    </div>
                 </div> {/* text_box */}
            </div> {/* 오른쪽 창 */}
        </div>
    )
}

export default Register_member