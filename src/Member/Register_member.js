import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import styles from './Register_member.module.css';
import Register from './img/Register.png';
import { useLoadScript } from '../LoadScriptContext';

const Register_member = () => {

    const navigate = useNavigate();
    const { token } = useLoadScript();
    const [uploadedFile, setUploadedFile] = useState(null);
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setUploadedFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
        } // if
    }; // handleFileChange

    const handleCancelClick = () => {
        Swal.fire({
            icon: 'warning',
            title: '사원 등록을 취소하시겠습니까?',
            text: '확인을 누르면 입력한 정보가 삭제됩니다.',
            allowOutsideClick: false,
            confirmButtonText: '확인',
            showCancelButton: true,
            cancelButtonText: '취소',
        }).then(result => {
            if (result.isConfirmed) {
                navigate(-1);
            } // 이전 페이지로 이동
        }); // Swal.fire
    }; // handleCancelClick

    const handleRegisterClick = () => {
        navigate(`/member/list`);
    }; // handleRegisterClick

    const [deptId, setDeptId] = useState([]);
    const [registerForm, setRegisterForm] = useState({
        loginId: "",
        password: "",
        name: "",
        tel: "",
        address: "",
        zipCode: "",
        email: "",
        department: "",
        position: "",
    }); // registerForm

    const handleChange = (field, value) => {
        setRegisterForm((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    }; // handleChange

    useEffect(() => {
        const fetchDeptId = async () => {
            try {
                const response = await fetch('https://localhost/department/filter', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}` // ✅ 토큰 추가
                    },
                }); // response

                if (response.ok) {
                    const data = await response.json();
                    console.log('data: ', data);
                    const sortedData = data.sort((a, b) => a.id - b.id);
                    setDeptId(sortedData);
                } else {
                    console.log('부서 정보를 불러오는데 실패했습니다.');
                } // if-else
            } catch (error) {
                console.error('오류발생:', error);
            } // try-catch
        }; // fetchDeptId
        fetchDeptId();
    }, []); // useEffect

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!registerForm.loginId || !registerForm.password || !registerForm.name || !registerForm.tel || !registerForm.email) {
            Swal.fire({
                icon: 'warning',
                title: '입력 오류',
                text: '빈칸을 모두 기입해주세요.',
            });
            return;
        } // if
        
        try {
            const formData = new FormData();
            formData.append("loginId", registerForm.loginId);
            formData.append("password", registerForm.password);
            formData.append("name", registerForm.name);
            formData.append("tel", registerForm.tel);
            formData.append("address", registerForm.address);
            formData.append("zipCode", registerForm.zipCode);
            formData.append("email", registerForm.email);
            formData.append("deptId", registerForm.department);
            formData.append("position", registerForm.position);

            console.log("registerForm:", registerForm);

            if (uploadedFile) {
                formData.append("file", uploadedFile);
            } // if

            const response = await fetch('https://localhost/employee/register', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.text();
                console.log(data);
                Swal.fire({
                    icon: 'success',
                    title: data,
                    confirmButtonText: '확인',
                }).then(() => {
                    handleRegisterClick();
                })
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: '사원 등록 실패',
                    text: '아이디를 확인해주세요',
                });
                console.error(response.statusText);
                // console.log(response);
            }
        } catch (error) {
            alert('오류가 발생했습니다. 다시 시도해주세요.');
            console.error(error);
        }
    } // handleSubmit

    const handleCheckId = async () => {
        console.log("중복확인 요청 ID:", registerForm.loginId);
        try {
            const response = await fetch(`https://localhost/employee/checkId?loginId=${registerForm.loginId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}` // ✅ 토큰 추가
                },
            }) // fetch

            if (response.ok) {
                const text = await response.text();

                if (!text) {
                    console.error("응답 본문이 비어있습니다.")
                    alert("서버로부터 응답이 없습니다.");
                    return;
                }

                const isDuplicate = text == 'true';
                console.log("받은 데이터: ", isDuplicate);

                if (isDuplicate) {
                    Swal.fire({
                        icon: 'error',
                        title: '이미 사용중인 아이디입니다.',
                        confirmButtonText: '확인',
                    });
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: '사용 가능한 아이디 입니다.',
                        confirmButtonText: '확인',
                    });
                } // if-else

            } // if
        } catch (err) {
            console.log('중복확인 오류', err);
        } // try-catch
    } // handleCheckId

    return (
        <div className={styles.container}>
            <div className={styles.left_panel}>
                <div className={styles.register_title}>REGISTER</div>
                <img src={Register} className={styles.register_img} />
            </div>

            <div className={styles.right_panel}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.input_box}>
                        <div className={styles.idbox}>
                            <input
                                type='text'
                                name='loginId'
                                className={styles.single}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                placeholder=''
                            />

                            <div className={styles.placeholder_text}>아이디</div>
                            <button type='button' className={styles.checkId} onClick={handleCheckId}>중복확인</button>

                        </div>

                        <div className={styles.passwdbox}>
                            <input
                                type='password'
                                name='password'
                                className={styles.single}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                placeholder=''
                            />
                            <div className={styles.placeholder_pswd}>비밀번호</div>
                        </div>


                        <div className={styles.two_input}>

                            <div className={styles.namebox}>
                                <input
                                    type='text'
                                    name='name'
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                    placeholder=''
                                />
                                <div className={styles.placeholder_name}>이름</div>

                            </div>

                            <div className={styles.phonebox}>
                                <input
                                    type='text'
                                    name='tel'
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                    placeholder=''
                                />
                                <div className={styles.placeholder_phone}>휴대폰번호('-' 포함)</div>
                            </div>
                        </div>  {/*  two_input */}



                        <div className={styles.two_input}>

                            <div className={styles.addressbox}>
                                <input
                                    type='text'
                                    name='address'
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                    className={styles.largeinput}
                                    placeholder=''
                                />
                                <div className={styles.placeholder_address}>주소</div>
                            </div>

                            <div className={styles.zipcodebox}>
                                <input
                                    type='number'
                                    name='zipCode'
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                    className={styles.smallinput}
                                    placeholder=''
                                />
                                <div className={styles.placeholder_zipcode}>우편번호</div>
                            </div>


                        </div> {/*  two_input */}


                        <div className={styles.emailbox}>
                            <input
                                type='text'
                                name='email'
                                className={styles.single}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                placeholder=''
                            />
                            <div className={styles.placeholder_email}>이메일</div>
                        </div>
                        <div className={styles.pic_container}>
                            <input 
                                type='file' 
                                id='profileUpload' 
                                accept='image/*' 
                                className={styles.profile_pic}
                                placeholder='이미지를 선택해주세요.'
                                onChange={handleFileChange}
                            />
                            <div className={styles.placeholder_pic}>사진</div>
                        </div>
                        <div className={styles.role_box}>
                            <select
                                name='department'
                                className={styles.Department}
                                // onChange={(e) => {
                                //     const selectedDepartmentId = e.target.value;
                                //     handleChange("department", selectedDepartmentId);
                                // }}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            >
                                <option value="">부서</option>
                                {deptId.map((dept) => (
                                    // <span style={{ paddingLeft: `${id.depth} * 50`, boxSizing: "border-box" }}></span>
                                    <option key={dept.id} value={dept.id}>
                                        {dept.name}
                                    </option>
                                ))}
                            </select>
                            <select
                                name='position'
                                className={styles.Position}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
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
                                <button
                                    type='submit'
                                    className={styles.register}>
                                    등록
                                </button>
                            </div>
                            <div>
                                <button type='button' onClick={handleCancelClick} className={styles.cancel} >취소</button>
                            </div>
                        </div>
                    </div> {/* input_box */}
                </form>
            </div>
        </div>
    )
}


export default Register_member