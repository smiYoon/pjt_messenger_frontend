import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from "./List.module.css";


console.groupCollapsed("src/Work/List.js");console.groupEnd();


const List = () => {
    console.debug("List() invoked.");

    const navigate = useNavigate();

    const [work, setWork] = useState("managed");
    // 담당업무 = managed
    // 요청업무 = requested

    const handleToggle = () => {
        setWork(work === "managed" ? "requested" : "managed");
    }; // handleToggle

    useEffect(() => {
        console.log("work is :", work);
    }, [work]);


    return(
        <div className={styles.body}>
            <div className={styles.pageTitle}>
                업무 리스트
            </div>

            <div className={styles.pageMiddle}>
                <span className={styles.middleLeft}>
                    사원 이미지들
                    <button className={styles.empPlusButton}>
                        <i className='fas fa-plus'/>
                    </button>
                </span> 

                <span className={styles.middleRight}>
                    <div className={styles.toggleWrapper}>
                        <span>담당업무 </span>
                        <span className={styles.toggle_container} onClick={handleToggle}>
                        <span className={`${styles.toggle_button} ${work === "managed" ? styles.managed : styles.requested}`}/>
                        </span>
                        <span>요청업무 </span>
                    </div>
                    
                    <span>
                        <button className={styles.addButton} onClick={() => navigate('/work/create')}> 
                            <i 
                            className='fas fa-circle-plus' 
                            style={{ color: "white", backgroundColor: "#6C47FF" }} /> ADD NEW </button>
                    </span>
                </span>
            </div>

            <div className={styles.pageBottom}>
                <span className={styles.pageBottom_Box}>
                    <div>진행 예정 <span className={styles.bottomNumber}>2</span><hr className={styles.hr}/></div>
                    <div className={styles.bottom_background}>
                        <button onClick={() => navigate('/work/detail')}>상세버튼</button>
                    </div>
                </span>

                <span className={styles.pageBottom_Box}>
                    <div>진행중 <span className={styles.bottomNumber}>5</span><hr className={styles.hr}/></div>
                    <div className={styles.bottom_background}>
                        <button onClick={() => navigate('/work/detail')}>상세버튼</button>
                    </div>
                </span>
                
                <span className={styles.pageBottom_Box}>
                    <div>완료 대기 <span className={styles.bottomNumber}>2</span><hr className={styles.hr}/></div>
                    <div className={styles.bottom_background}>
                        <button onClick={() => navigate('/work/detail')}>상세버튼</button>
                    </div>
                </span>

                <span className={styles.pageBottom_Box}>
                    <div>완료 <span className={styles.bottomNumber}>7</span><hr className={styles.hr}/></div>
                    <div className={styles.bottom_background}>
                        <button onClick={() => navigate('/work/detail')}>상세버튼</button>
                    </div>
                </span>
            </div>
        </div>
    );

} // List

export default List;
