import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styles from './Register_member.module.css';
import  Register  from './img/Register.png';

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
    const handleRegisterClick = () => {
        navigate(`/member/list`);
    };

    // 번호 포멧팅 함수
    function formatPhoneNumber(tel) {
        const telStr = tel.toString();
        return `${telStr.slice(0, 3)}-${telStr.slice(3, 7)}-${telStr.slice(7, 11)}`;
    }


//     <div className={styles.dept_container}>
//     <input type='text' value={member.dept} className={styles.dept} placeholder='' />
//     <div className={styles.placeholder_text}>부서</div>
// </div>

    const member = [{
        loginId: 'xptmxm123',
        password: 'Nice1512',
        name: '이현희',
        phoneNumber: '1023234521',
        address: '서울특별시',
        zipcode: '12942',
        email: 'dlgusgml99gmailcom'
    }]



    return (
        <div className={styles.container}>
            <div className={styles.left_panel}>
                <div className={styles.register_title}>REGISTER</div>
                <img src={Register} className={styles.register_img} />
            </div>
            {member.map((members) => (
            <div className={styles.right_panel}>
                <div className={styles.input_box}>

                    <div className={styles.idbox}>
                        <input type='text' value={member.loginId} className={styles.single} onChange={handlerIdChange} placeholder='' />

                        <div className={styles.placeholder_text}>아이디</div>
                    </div>

                    <div className={styles.passwdbox}>
                        <input type='text' value={member.password} className={styles.single} onChange={handlerPasswdChange} placeholder='' />
                        <div className={styles.placeholder_pswd}>비밀번호</div>
                    </div> 


                    <div className={styles.two_input}>

                        <div className={styles.namebox}>
                            <input type='text' value={member.name} onChange={handlerNameChange} placeholder='' />
                            <div className={styles.placeholder_name}>이름</div>
                        </div>

                        <div className={styles.phonebox}>
                            <input type='number' value={member.phoneNumber} onChange={handlerPhoneNumChange} placeholder='' />
                            <div className={styles.placeholder_phone}>휴대폰 번호</div>
                        </div>
                    </div>  {/*  two_input */}



                    <div className={styles.two_input}> 


                        <div className={styles.addressbox}>
                            <input type='text' value={member.address} className={styles.largeinput} placeholder='' />
                            <div className={styles.placeholder_address}>주소</div>
                        </div>

                        <div className={styles.zipcodebox}>
                            <input value={member.zipcode} className={styles.smallinput} placeholder='' />
                            <div className={styles.placeholder_zipcode}>우편번호</div>
                        </div>


                        </div> {/*  two_input */}


                        <div className={styles.emailbox}>
                            <input type='text' value={member.email} className={styles.single} onChange={handlerEmailChange} placeholder='' />
                            <div className={styles.placeholder_email}>이메일</div>
                        </div>



                    <div className={styles.role_box}>
                        <select
                            name='Department'
                            className={styles.Department}
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
                            className={styles.Position}
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
                            <button onClick={handleRegisterClick} className={styles.register}>등록</button>
                        </div>
                        <div>
                            <button onClick={handleCancelClick} className={styles.cancel} >취소</button>
                        </div>
                    </div>
                 </div> {/* input_box */}
            </div> 
            ))}
        </div>
    )
}

export default Register_member