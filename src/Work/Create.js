import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import styles from "./Create.module.css";

console.groupCollapsed("src/Work/Create.js");console.groupEnd();


const Create = () => {
    console.debug("Create() invoked.");

    const navigate = useNavigate();

    const handleCreate = () => {
        Swal.fire({
            text: "등록하시겠습니까?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "등록",
            cancelButtonText: "취소",
            confirmButtonColor: "#6C47FF",
            cancelButtonColor: "#FFFFFF",
            customClass: {
                cancelButton: styles.createCancelButton,
            },
        }).then((result) => {
            if (result.isConfirmed) {
            Swal.fire("수정 완료", "업무가 수정되었습니다.", "success");
            navigate('/work');
            } // if
        }); // Swal.fire
    }; // handleCreate

    const handleCancel = () => {
        Swal.fire({
            text: "정말 취소하시겠습니까? 취소하시면 변경사항이 저장되지 않습니다.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "예",
            cancelButtonText: "아니오",
            confirmButtonColor: "#6C47FF",
            cancelButtonColor: "#FFFFFF",
            customClass: {
                cancelButton: styles.cancelButton,
            },
        }).then((result) => {
            if (result.isConfirmed) {
            Swal.fire("삭제 완료", "업무가 삭제되었습니다.", "success");
            navigate('/work');
            } // if
        }); // Swal.fire
    }; // handleCancel

    return(
        <div>
            <p>업무 등록</p>
            <span>
                왼쪽 박스
                <div>뒤로가기
                    <button onClick={() => navigate('/work')}>뒤로가기 버튼</button>
                </div>
                <div>업무이름</div>
                <div>상태 
                    <button>진행예정</button>
                    <button>진행중</button>
                    <button>완료 대기</button>
                    <button>완료</button>
                </div>
                <div>분류
                    <button>개발</button>
                    <button>운영</button>
                    <button>인사</button>
                    <button>회계</button>
                    <button>마케팅</button>
                </div>
                <div>진행 기간
                    <button>시작일 캘린더</button>
                    <button>종료일 캘린더</button>
                </div>
                <div>담당자 
                    <button>버튼</button>
                </div>
                <div>요청자(본인)</div>
                <div>상세정보
                    <input type="text" placeholder="상세정보를 입력하세요." />
                </div>
            </span>

            <span>
                오른쪽박스
                <div>
                    <p>업무 종료일까지</p>
                    <p>-</p>    
                </div>

                <div>
                    메모
                    <input type="text" placeholder="메모를 입력하세요." />
                </div>

                <div>
                    <span>
                        <button onClick={handleCreate}>등록 버튼</button>
                    </span>
                    <span>
                        <button onClick={handleCancel}>취소 버튼</button>
                    </span>
                </div>
            </span>
        </div>
    );

} // Create

export default Create;
