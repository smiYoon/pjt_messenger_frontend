import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Login.module.css';

const Login = () => {
    console.log("Login() invoked.");

    const navigate = useNavigate();
    const [message, setMessage] = useState();

    // 상태 관리: 입력값을 저장하는 상태 변수
    const [loginData, setLoginData] = useState({
        loginId: '',
        password: ''
    });

    // 입력값 상태 업데이트
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // 로그인 버튼 클릭 시 백엔드에 로그인 데이터 전송
    const handleLogin = async () => {

        // 백엔드로 데이터 전송
        try {
            const formData = new FormData();
            formData.append("loginId", loginData.loginId);
            formData.append("password", loginData.password);

            const response = await fetch('https://localhost:443/auth/login', {
                method: 'POST',
                body: formData,
            });

            const text = await response.text();
            console.log("서버 응답:", text);

            if (response.ok) {
                // 로그인 성공 시 처리
                console.log("로그인 성공");
                setMessage(text);
                navigate("/member/list");

            } else {
                // 로그인 실패 시 처리
                console.log("로그인 실패");
                setMessage(text);
            }
        } catch (error) {
            console.error("로그인 오류:", error);
        }
    };

    // 엔터키 입력 시 검색 기능 작동
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };


    return (
        <div className={styles.login}>
            <div className={styles.main}>
                <div className={styles.logo}></div>
                <div className={styles.id_container}>
                    <input
                        className={styles.id}
                        placeholder="loginId"
                        name="loginId"                           // 서버로 전송되는 이름
                        value={loginData.loginId}
                        onChange={handleInputChange}
                        onKeyUp={handleKeyPress}
                    />
                    <i className={`fas fa-user ${styles.user_icon}`} />
                </div>
                <div className={styles.pw_container}>
                    <input
                        className={styles.pw}
                        placeholder="password"
                        name="password"                     // 서버로 전송되는 이름
                        type="password"
                        value={loginData.password}
                        onChange={handleInputChange}
                        onKeyUp={handleKeyPress}
                    ></input>
                    <i className={`fas fa-lock ${styles.pass_icon}`} />
                </div>

                {message && (
                    <div className={styles.message}>
                        {message}
                    </div>
                )}
                <div className={styles.button}>
                    <button className={styles.loginbutton} onClick={handleLogin}>
                        로그인
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login;