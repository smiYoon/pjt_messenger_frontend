import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import '@fortawesome/fontawesome-free/css/all.min.css';

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";

import styles from "./Detail.module.css";

registerLocale("ko", ko);

console.groupCollapsed("src/Work/Detail.js");console.groupEnd();


const Detail = () => {
    console.debug("Detail() invoked.");

    const navigate = useNavigate();

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


    useEffect(() => {
            if(endDate && startDate > endDate) {
                Swal.fire({
                    text: "종료일은 시작일 이후로 선택해주세요.",
                    icon: "warning",
                    confirmButtonText: "확인",
                    confirmButtonColor: "#6C47FF",
                }); // Swal.fire
                setEndDate(null);
            } // if
    }, [startDate]);


    const handleUpdate = () => {
        Swal.fire({
            text: "수정하시겠습니까?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "수정",
            cancelButtonText: "취소",
            confirmButtonColor: "#6C47FF",
            cancelButtonColor: "#FFFFFF",
            customClass: {
                cancelButton: styles.updateCancelButton,
            },
        }).then((result) => {
            if (result.isConfirmed) {
            Swal.fire("수정 완료", "업무가 수정되었습니다.", "success");
            navigate('/work');
            } // if
        }); // Swal.fire
    }; // handleDelete

    const handleDelete = () => {
        Swal.fire({
            text: "정말 삭제하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "삭제",
            cancelButtonText: "취소",
            confirmButtonColor: "#6C47FF",
            cancelButtonColor: "#FFFFFF",
            customClass: {
                cancelButton: styles.deleteCancelButton,
            },
        }).then((result) => {
            if (result.isConfirmed) {
            Swal.fire("삭제 완료", "업무가 삭제되었습니다.", "success");
            navigate('/work');
            } // if
        }); // Swal.fire
    }; // handleDelete

    const handleCancel = () => {
        Swal.fire({
            text: "리스트 화면으로 이동하시겠습니까? 이동하시면 변경사항이 저장되지 않습니다.",
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
            navigate('/work');
            } // if
        }); // Swal.fire
    }; // handleCancel

    return(
        <div className={styles.container}>
            <span className={styles.leftBox}>
                <div style={{display: "flex", position: "relative"}}>
                    <i style={{cursor: "pointer"}} className='fas fa-arrow-left' onClick={handleCancel}/>
                    <span className={styles.pageDetail}>업무 상세/수정</span>
                </div>

                <div className={styles.leftContent}>
                    <div>업무 이름</div>
                    <div/>

                    <div style={{display: "flex"}}>
                        <span className={styles.contentLeft}>상태</span>
                        <span className={styles.contentRight}>
                            <span className={styles.status1}>진행예정</span>
                            <span className={styles.status2}>진행중</span>
                            <span className={styles.status3}>완료 대기</span>
                            <span className={styles.status4}>완료</span>
                        </span>
                    </div>

                    <div style={{display: "flex"}}>
                        <span className={styles.contentLeft}>분류</span>
                        <span className={styles.contentRight}>
                            <span className={styles.type}>개발</span>
                            <span className={styles.type}>운영</span>
                            <span className={styles.type}>인사</span>
                            <span className={styles.type}>회계</span>
                            <span className={styles.type}>마케팅</span>
                        </span>
                    </div>

                    <div style={{display: "flex"}}>
                        <span className={styles.contentLeft}>진행 기간</span>
                        <span className={styles.contentRight}>
                            <DatePicker
                                className={styles.reactDatepicker}
                                filterDate={(date) => date >= new Date()}
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                locale="ko" // 한국어 로케일 적용
                                dateFormat="yyyy년 MM월 dd일"
                                placeholderText="시작일"
                            />
                            <span>~</span>
                            <DatePicker
                                className={styles.reactDatepicker}
                                filterDate={(date) => date >= new Date()}
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate} // 종료일은 시작일 이후로만 선택 가능
                                locale="ko" // 한국어 로케일 적용
                                dateFormat="yyyy년 MM월 dd일"
                                placeholderText="종료일"
                            />
                        </span>
                    </div>

                    <div style={{display: "flex"}}>
                        <span className={styles.contentLeft}>담당자 </span>
                        <span className={styles.contentRight}>
                            <i style={{cursor: "pointer"}} className='fas fa-circle-plus'/>
                        </span>
                    </div>

                    <div style={{display: "flex"}}>
                        <span className={styles.contentLeft}>요청자</span>
                        <span className={styles.contentRight}>본인</span>
                    </div>

                    <div className={styles.contentLeft}>상세정보</div>
                    <div>
                        <textarea className={styles.detailInputBox} type="text" placeholder="상세정보를 입력하세요." />
                    </div>
                </div>
            </span>

            <span className={styles.rightBox}>
                <div className={styles.dateBox}>
                    <div>업무 종료일까지</div>
                    <div style={{textAlign: "right"}}>D-숫자</div>    
                </div>

                <div className={styles.memoBox}>
                    메모
                    <textarea className={styles.memoInputBox} type="text" placeholder="메모를 입력하세요." />
                </div>

                <div className={styles.buttonBox}>
                    <span className={styles.buttonBoxLeft} onClick={handleUpdate}>수정</span>
                    <span className={styles.buttonBoxRight} onClick={handleDelete}>삭제</span>
                </div>
            </span>
        </div>
    );

} // Detail

export default Detail;
