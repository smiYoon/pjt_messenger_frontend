import styles from "./ListUpComming.module.css";
import { RxLapTimer } from "react-icons/rx";

console.groupCollapsed("src/Project/ListUpComming.js");console.groupEnd();

const ListUpComming = () => {
    console.group("ListUpcommig() invoked.");
    console.groupEnd();
    return (
        <div className={styles.body}>
            
            <div className={styles.name}>프로젝트명</div>

            <div className={styles.content}>

                <div className={styles.manager}>
                    <label>담당자</label>김태영 팀장
                </div>

                <div className={styles.detail}>
                    <label>상세정보</label>상세정보 상세정보 상세정보 상세정보 상세정보 상세정보 상세정보 상세정보 상세정보 상세정보 상세정보 상세정보 상세정보 상세정보 상세정보 상세정보 상세정보
                </div>

            </div>

            <div className={styles.timeline}>

                <div className={styles.status}>진행 중</div>

                <div className={styles.deadline}><RxLapTimer className={styles.icon} /> D-2</div>

            </div>

            <div className={styles.dot}>···</div>

        </div>
    );
};

export default ListUpComming;
