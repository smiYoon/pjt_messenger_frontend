import React, { useState, useEffect } from 'react';
import styles from './Modify_member.module.css';
import profile from '../Navbar/img/profile.png';
import { useNavigate, useParams } from 'react-router-dom';

const Modify_member = () => {
    const navigate = useNavigate();
    const handleCancelClick = () => {
        navigate(`/member/list`);
    }

    const { empno } = useParams();
    const [memberForm, setMemberForm] = useState([]);

    const member = [{
        profile: `${profile}`,
        name: "김태영",
        username: "tae",
        empno: "E2011004",
        position: "팀원",
        dept: "개발1팀",
        password: "oracle",
        address: "행운1길",
        zipCode: "13850",
        tel: "010-7754-4128",
        email: "taetae@gmail.com",
    }];

    // useEffect(() => {
    //     const fetchMemberData = async () => {

    //         try {
    //             const response = await fetch(`https://localhost:443/employee/${empno}`);

    //             if (response.ok) {
    //                 const data = await response.json();
    //                 console.log('사원 정보: ', data);

    //                 /* upfiles: null,
    //                 existingFileName: data.upfile[0]?.original || '파일 없음', */
    //                 setMemberForm({
    //                     name: data.name,
    //                     username: data.username,
    //                     empno: data.empno,
    //                     position: data.position,
    //                     dept: data.department.name,
    //                     password: data.password,
    //                     address: data.address,
    //                     zipCode: data.zipCode,
    //                     tel: data.tel,
    //                     email: data.email,
    //                 });
    //             } else {
    //                 console.error('사원 정보 불러오기 실패:', response.statusText);
    //             }
    //         } catch (error) {
    //             console.error('오류 발생:', error);
    //         }
    //     };

    //     fetchMemberData();
    // }, []);

    return (
        <div className={styles.cover}>
            {member.map((member) => (
                <div className={styles.container}>
                    <div className={styles.left_panel}>
                        <div className={styles.pic}>
                            <img src={member.profile} alt='' />
                            <label for='profileUpload'>
                                <i className={`fas fa-camera ${styles.camera}`} />
                            </label>
                            <input type='file' id='profileUpload' accept='image/*' />
                        </div>
                        <div className={styles.name}>
                            {/* <input type='text' placeholder='김태영' /> */}
                            {member.name}
                        </div>
                        <div className={styles.article}>
                            <div className={styles.user_id}>
                                <span>아이디&nbsp;</span>
                                <div>{member.username}</div>
                                {/* <input type='text' placeholder='youngfourty' /> */}
                            </div>
                            <div className={styles.empno}>
                                <span>사번&nbsp;</span>
                                <div>{member.empno}</div>
                                {/* <input type='text' placeholder='B00298180' /> */}
                            </div>
                        </div>
                    </div>
                    <div className={styles.right_panel}>
                        <div className={styles.title}>
                            사원 상세정보 / 수정
                        </div>
                        <div className={styles.form}>
                            <div className={styles.input}>
                                <div className={styles.double}>
                                    <div className={styles.dept_container}>
                                        <input type='text' value={member.dept} className={styles.dept} placeholder='' />
                                        <div className={styles.placeholder_text}>부서</div>
                                    </div>
                                    <div className={styles.position_container}>
                                        <input type='text' value={member.position} className={styles.position} placeholder='' />
                                        <div className={styles.placeholder_text}>직급</div>
                                    </div>
                                </div>

                                <div className={styles.single}>
                                    <input type='text' value={member.password} className={styles.single} placeholder='' />
                                    <div className={styles.placeholder_text}>비밀번호</div>
                                </div>

                                <div className={styles.single}>
                                    <input type='text' value={member.tel} className={styles.single} placeholder='' />
                                    <div className={styles.placeholder_text}>휴대폰번호</div>
                                </div>

                                <div className={styles.double}>
                                    <input type='text' value={member.address} className={styles.address} placeholder='' />
                                    <div className={styles.placeholder_text}>주소</div>
                                    <input type='text' value={member.zipCode} className={styles.postal} placeholder='' />
                                    <div className={styles.postal_text}>우편번호</div>
                                </div>

                                <div className={styles.single}>
                                    <input type='text' value={member.email} className={styles.single} placeholder='' />
                                    <div className={styles.placeholder_text}>이메일</div>
                                </div>

                                <div className={styles.buttons}>
                                    <button className={styles.modify}>수정</button>
                                    <button className={styles.cancel} onClick={handleCancelClick}>취소</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Modify_member;