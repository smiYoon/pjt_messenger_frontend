import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Login.module.css';
import { useLoadScript } from '../LoadScriptContext';

const Login = () => {
    console.log("Login() invoked.");
    const { decodedToken } = useLoadScript();

    const navigate = useNavigate();
    const [message, setMessage] = useState();

    const { updateToken } = useLoadScript();

    // 상태 관리: 입력값을 저장하는 상태 변수
    const [loginData, setLoginData] = useState({
        loginId: '',
        password: '',
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

        console.log('id:', loginData.loginId, 'password:', loginData.password);

        // 백엔드로 데이터 전송
        try {
            const formData = new FormData();
            formData.append("loginId", loginData.loginId);
            formData.append("password", loginData.password);

            const response = await fetch('https://localhost/auth/login', {
                method: 'POST',
                body: formData,

            });

            const result = await response.json(); // json 파싱

            // 로컬 스토리지에 저장 : 브라우저 닫아도 토큰 유지
            // localStorage.setItem("jwt", token); 

            // 세션 스토리지에 저장: 탭 닫으면 토큰 사라짐
            // sessionStorage.setItem("jwt", token);

            
            if (response.ok) {
                // 로그인 성공 시 처리
                const token = result.token; // 진짜 토큰만 꺼냄.
                // console.log("로그인 성공");
                // setMessage(token);
                updateToken(token);
                console.log("서버 응답:", token);
                if(decodedToken.position == 1 || decodedToken.position == 2) {
                navigate("/chat");   
                } else if (decodedToken.position == 3 || decodedToken.position == 4) {
                    navigate('/work');
                } else if (decodedToken.position == 5) {
                    navigate('/employee/list');
                } else {
                    navigate('/chat');
                }
            } else {
                // 로그인 실패 시 처리
                setMessage( result.error );
                console.log("로그인 실패", result);               
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