import React from 'react';
import styles from './Modify_member.module.css';
import profile from '../Navbar/img/profile.png';
import { useNavigate } from 'react-router-dom';

const Modify_member = () => {
    const navigate = useNavigate();
    const handleCancelClick = () => {
        navigate(`/member/list`);
    }

    return (
        <div className={styles.cover}>
            <div className={styles.container}>
                <div className={styles.left_panel}>
                    <div className={styles.pic}>
                        <img src={profile} alt='' />
                        <label for='profileUpload'>
                            <i className={`fas fa-camera ${styles.camera}`} />
                        </label>
                        <input type='file' id='profileUpload' accept='image/*' />
                    </div>
                    <div className={styles.name}>
                        {/* <input type='text' placeholder='김태영' /> */}
                        김태영
                    </div>
                    <div className={styles.article}>
                        <div className={styles.user_id}>
                            <span>아이디&nbsp;</span>
                            <div>youngfourty</div>
                            {/* <input type='text' placeholder='youngfourty' /> */}
                        </div>
                        <div className={styles.empno}>
                            <span>사번&nbsp;</span>
                            <div>B00298180</div>
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
                                    <input type='text' className={styles.dept} placeholder='' />
                                    <div className={styles.placeholder_text}>부서</div>
                                </div>
                                <div className={styles.position_container}>
                                    <input type='text' className={styles.position} placeholder='' />
                                    <div className={styles.placeholder_text}>직급</div>
                                </div>
                            </div>

                            <div className={styles.single}>
                                <input type='text' className={styles.single} placeholder='' />
                                <div className={styles.placeholder_text}>비밀번호</div>
                            </div>

                            <div className={styles.single}>
                                <input type='text' className={styles.single} placeholder='' />
                                <div className={styles.placeholder_text}>휴대폰번호</div>
                            </div>

                            <div className={styles.double}>
                                <input type='text' className={styles.address} placeholder='' />
                                <div className={styles.placeholder_text}>주소</div>
                                <input type='text' className={styles.postal} placeholder='' />
                                <div className={styles.postal_text}>우편번호</div>
                            </div>

                            <div className={styles.single}>
                                <input type='text' className={styles.single} placeholder='' />
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
        </div>
    )
}

export default Modify_member;