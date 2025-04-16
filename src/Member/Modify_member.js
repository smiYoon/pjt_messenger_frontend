import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import styles from './Modify_member.module.css';
import profile from '../Navbar/img/profile.png';
import { useNavigate, useParams } from 'react-router-dom';

const Modify_member = () => {
    const navigate = useNavigate();
    const handleCancelClick = () => {
        Swal.fire({
            icon: 'warning',
            title: '사원 수정을 취소하시겠습니까?',
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

    const { empno } = useParams();
    const [memberForm, setMemberForm] = useState({
        password: "",
        tel: "",
        address: "",
        zipCode: "",
        email: "",
        department: "",
        position: "",
    });
    const [deptId, setDeptId] = useState([]);

    const handleChange = (field, value) => {
        setMemberForm((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    // 폼 제출 핸들러
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append("loginId", memberForm.loginId);
            formData.append("password", memberForm.password);
            formData.append("name", memberForm.name);
            formData.append("tel", memberForm.tel);
            formData.append("address", memberForm.address);
            formData.append("zipCode", memberForm.zipCode);
            formData.append("email", memberForm.email);
            formData.append("deptId", memberForm.department);
            formData.append("position", memberForm.position);

            if (memberForm.upfiles) {
                formData.append('upfiles', memberForm.upfiles); // 새 파일 추가
            }

            console.log("memberForm:", memberForm);
            const token = localStorage.getItem("jwt"); // 수정점 04.16
            const response = await fetch(`https://localhost:443/employee/${empno}`, {
                method: 'PUT', // 수정 요청은 PUT 메서드 사용
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    // 'Content-Type': 'application/json'
                  } // 수정점. 04.16
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: '사원 정보가 성공적으로 수정되었습니다.',
                    confirmButtonText: '확인',
                }).then(() => {
                    navigate('/member/list');
                });
            } else {
                console.error('수정 실패:', response.statusText);
                alert('사원 정보 수정에 실패했습니다.');
            }
        } catch (error) {
            console.error('요청 중 오류 발생:', error);
            alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    useEffect(() => {
        const fetchMemberData = async () => {

            try {
                const response = await fetch(`https://localhost:443/employee/${empno}`, {
                    method: 'GET',
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('사원 정보: ', data);

                    /* upfiles: null,
                    existingFileName: data.upfile[0]?.original || '파일 없음', */
                    setMemberForm({
                        name: data.name,
                        loginId: data.loginId,
                        empno: data.empno,
                        department: data.department.id,
                        position: data.position,
                        password: data.password,
                        tel: data.tel,
                        address: data.address,
                        zipCode: data.zipCode,
                        email: data.email,
                    });
                } else {
                    console.error('사원 정보 불러오기 실패:', response.statusText);
                }
            } catch (error) {
                console.error('오류 발생:', error);
            }
        };

        const fetchDeptId = async () => {
            try {
                const response = await fetch('https://localhost:443/department', {
                    method: 'GET'
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('data: ', data);
                    setDeptId(data);
                } else {
                    console.log('부서 정보를 불러오는데 실패했습니다.');
                }
            } catch (error) {
                console.error('오류발생:', error);
            }
        };

        fetchMemberData();
        fetchDeptId();
    }, [empno]);

    const level = {
        "1": "팀원",
        "2": "팀장",
        "3": "부서장",
        "4": "CEO",
    };

    return (
        <div className={styles.cover}>
            <div key={memberForm.empno} className={styles.container}>
                <div className={styles.left_panel}>
                    <div className={styles.pic}>
                        <img src={profile} alt='' />
                        {/* <img src={memberForm.profile} alt='' /> */}
                        <label htmlFor='profileUpload'>
                            <i className={`fas fa-camera ${styles.camera}`} />
                        </label>
                        <input type='file' id='profileUpload' accept='image/*' />
                    </div>
                    <div className={styles.name}>
                        {memberForm.name}
                    </div>
                    <div className={styles.article}>
                        <div className={styles.user_id}>
                            <span>아이디&nbsp;</span>
                            <div>{memberForm.loginId}</div>
                        </div>
                        <div className={styles.empno}>
                            <span>사번&nbsp;</span>
                            <div>{memberForm.empno}</div>
                        </div>
                    </div>
                </div>
                <div className={styles.right_panel}>
                    <div className={styles.title}>
                        사원 상세정보 / 수정
                    </div>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.input}>
                            <div className={styles.double}>
                                {/* <input
                                    type='text'
                                    className={styles.dept}
                                    placeholder=''
                                    name='department'
                                    value={memberForm.department}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                                <div className={styles.placeholder_text}>부서</div>
                                <input
                                    type='text'
                                    className={styles.position}
                                    placeholder=''
                                    name='position'
                                    value={level[memberForm.position]}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                                <div className={styles.position_text}>직급</div> */}
                                <select
                                    name='department'
                                    className={styles.dept}
                                    value={memberForm.department || ''}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                >
                                    <option value="">부서를 선택해주세요.</option>
                                    {deptId.map((dept) => (
                                        // <span style={{ paddingLeft: `${id.depth} * 50`, boxSizing: "border-box" }}></span>
                                        <option key={dept.id} value={dept.id}>
                                            {dept.name}
                                        </option>
                                    ))}
                                </select>
                                <div className={styles.placeholder_text}>부서</div>

                                <select
                                    name='position'
                                    className={styles.position}
                                    value={memberForm.position}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                >
                                    <option value="">직급을 선택해주세요.</option>
                                    <option value="1">팀원</option>
                                    <option value="2">팀장</option>
                                    <option value="3">부서장</option>
                                    <option value="4">CEO</option>
                                    <option value="5">인사담당자</option>
                                </select>
                                <div className={styles.position_text}>직급</div>
                            </div>

                            <div className={styles.single}>
                                <input
                                    type='text'
                                    className={styles.single}
                                    placeholder=''
                                    name='password'
                                    value={memberForm.password}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                                <div className={styles.placeholder_text}>비밀번호</div>
                            </div>

                            <div className={styles.single}>
                                <input
                                    type='text'
                                    className={styles.single}
                                    placeholder=''
                                    name='tel'
                                    value={memberForm.tel}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                                <div className={styles.placeholder_text}>휴대폰번호(-를 포함하여 입력해주세요.)</div>
                            </div>

                            <div className={styles.double}>
                                <input
                                    type='text'
                                    className={styles.address}
                                    placeholder=''
                                    name='address'
                                    value={memberForm.address}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                                <div className={styles.placeholder_text}>주소</div>
                                <input
                                    type='text'
                                    className={styles.postal}
                                    placeholder=''
                                    name='zipCode'
                                    value={memberForm.zipCode}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                                <div className={styles.postal_text}>우편번호</div>
                            </div>

                            <div className={styles.single}>
                                <input
                                    type='text'
                                    className={styles.single}
                                    placeholder=''
                                    name='email'
                                    value={memberForm.email}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                                <div className={styles.placeholder_text}>이메일</div>
                            </div>

                            <div className={styles.buttons}>
                                <button type='submit' className={styles.modify}>수정</button>
                                <button type='button' className={styles.cancel} onClick={handleCancelClick}>취소</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modify_member;