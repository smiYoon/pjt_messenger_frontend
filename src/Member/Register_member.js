import React, { useState } from 'react'
import styles from './Register_member.module.css';

const Register_member = () => {
    const [inputValue, setInputValue] = useState('');

    const handlerChange = (event) => {
        setInputValue(event.target.value)
    }

    // 번호 포멧팅 함수
    function formatPhoneNumber(tel) {
        const telStr = tel.toString();
        return `${telStr.slice(0, 3)}-${telStr.slice(3, 7)}-${telStr.slice(7, 11)}`;
    }

    return (
        <div className={styles.container}>
            <div className={styles.left_panel}>
                <div>REGISTER</div>
                <div>이미지</div>
            </div>
            <div className={styles.right_panel}>
                <div>
                    <input type='text' value={inputValue} onChange={handlerChange} placeholder='아이디' />
                </div>
                <div>
                    <input type='text' value={inputValue} onChange={handlerChange} placeholder='비밀번호' />
                </div>
                <div>
                    <input type='text' value={inputValue} onChange={handlerChange} placeholder='이름' />
                    <input type='number' value={inputValue} onChange={handlerChange} placeholder='휴대폰 번호' />
                </div>
                <div>
                    <input type='text' placeholder='주소' />
                    <input type='number' placeholder='우편번호' />
                </div>
                <div><input type='text' value={inputValue} onChange={handlerChange} placeholder='이메일' /></div>
                <div>
                    <select
                        name='Department'
                        className=''
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
                        className=''
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
                <div>
                    <div>등록</div>
                    <div>취소</div>
                </div>
            </div> {/* 오른쪽 창 */}
        </div>
    )
}

export default Register_member