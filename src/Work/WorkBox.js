import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from "./WorkBox.module.css";

console.groupCollapsed("src/Work/WorkBox.js");console.groupEnd();


const WorkBox = () => {
    console.debug("WorkBox() invoked.");

    const navigate = useNavigate();

    

    return(
        <div className={styles.workBox}>
            <div className={styles.workBoxTop}>
                <span className={styles.type}>개발</span>
                <span className={styles.arrow}>
                    <i style={{cursor: "pointer"}} className='fas fa-arrow-right' onClick={() => navigate("/work/detail")}/>
                </span>
            </div>

            <div>프론트엔드 React로 기획</div>

            <div>
                <i className='fas fa-calendar-days'/> 날짜
            </div>

            <div>
                <span>요청자 (사진)</span>
                <span>담당자 (사진)</span>
            </div>
        </div>
    );

} // WorkBox

export default WorkBox;
