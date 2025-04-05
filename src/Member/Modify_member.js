import React from 'react';
import styles from './Modify_member.module.css';
import profile from '../Navbar/img/profile.png';

const Modify_member = () => {
    return (
        <div className={styles.cover}>
            <div className={styles.container}>
                <div className={styles.left_panel}>
                    <div className={styles.pic}>
                        <img src={profile} alt='' />
                    </div>
                    <div className={styles.name}>
                        <input type='text' placeholder='김태영' />
                    </div>
                    <div className={styles.user_id}>
                        아이디
                        <input type='text' placeholder='youngfourty' />
                    </div>
                    <div className={styles.empno}>
                        사번
                        <input type='text' placeholder='B00298180' />
                    </div>
                </div>
                <div className={styles.right_panel}>
                    <div className={styles.title}>
                        사원 상세정보 / 수정
                    </div>
                    <div className={styles.input}>
                        <div>
                            <input type='text' placeholder='사번' />
                            <input type='text' placeholder='아이디' />
                        </div>

                        <div>
                            <input type='text' placeholder='비밀번호' />
                        </div>

                        <div>
                            <input type='text' placeholder='이름' />
                            <input type='text' placeholder='휴대폰번호' />
                        </div>

                        <div>
                            <input type='text' placeholder='주소' />
                            <input type='text' placeholder='우편번호' />
                        </div>

                        <div>
                            <input type='text' placeholder='이메일' />
                        </div>

                        <div>
                            <input type='text' placeholder='부서' />
                            <input type='text' placeholder='직급' />
                        </div>
                        <div>
                            <button>수정</button>
                            <button>취소</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modify_member;