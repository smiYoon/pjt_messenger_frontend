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
                    <div className={styles.input}>
                        <div className={styles.double}>
                            <input type='text' className={styles.dept} placeholder='부서' />
                            <input type='text' className={styles.position} placeholder='직급' />
                        </div>

                        <div>
                            <input type='text' className={styles.single} placeholder='비밀번호' />
                        </div>

                        <div>
                            <input type='text' className={styles.single} placeholder='휴대폰번호' />
                        </div>

                        <div className={styles.double}>
                            <input type='text' className={styles.address} placeholder='주소' />
                            <input type='text' className={styles.postal} placeholder='우편번호' />
                        </div>

                        <div>
                            <input type='text' className={styles.single} placeholder='이메일' />
                        </div>

                        <div className={styles.buttons}>
                            <button className={styles.modify}>수정</button>
                            <button className={styles.cancel}>취소</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modify_member;