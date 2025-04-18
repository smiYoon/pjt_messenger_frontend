import styles from './AiSummary.module.css';
import { BsMagic } from "react-icons/bs";
import React, { useState } from 'react';
import { IoExitOutline } from "react-icons/io5";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AiSummary = ({id}) => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const empno = "E2005003";

    const handleExit = async() => {

        const formData = new FormData;
        formData.append("empno", empno);

        try  {
            // 1. 퇴장 요청 서버로 보내기
            await fetch(`https://localhost:443/chat/${id}`,{
                method : 'DELETE',
                body: formData
            });
                console.log("퇴장 처리 완료");
        } catch (error) {
                console.log("퇴장 처리 실패",error);
        }
    }

    const handleSummary = async() => {

        const formData = new FormData;
        formData.append("empno", empno);
        formData.append("start", startDate);
        formData.append("end",endDate);

        try  {
            // 1. 퇴장 요청 서버로 보내기
            await fetch(`https://localhost:443/chat/${id}/summary`,{
                method : 'POST',
                body: formData
            });
                console.log("요약 처리 완료");
        } catch (error) {
                console.log("요약 처리 실패",error);
        }
    }


    return (
                <div className={styles.aibox}>

                        <div className={styles.todaySummary}>
                            <BsMagic className={styles.magicWand}/>
                            <span className={styles.todaySummaryTxt}>오늘 하루 요약</span>
                        </div>
                        

                            <div className={styles.dateSetManually}>
                                <span className={styles.dateSetManuallyTxt}>요약할 날짜 선택</span>
                            </div>

                            <div className={styles.startDateBox}>
                               
                                <div className={styles.startDate}>
                                    <span className={styles.startDateTxt}>시작일</span>
                                </div>
                                <div className={styles.startDatePickerBox}>
                                        <DatePicker
                                        className={styles.startDatePicker}
                                        selected={startDate}
                                        onChange={(date) => {setStartDate(date);
                                            if(endDate && date > endDate){
                                                setEndDate(null);
                                            }
                                        }}
                                        selelctStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        dateFormat="yyyy년 MM월 dd일"
                                        />
                                </div>
                            </div>

                            <div className={styles.endDateBox}>
                                <div className={styles.endDate}>
                                    <span className={styles.endDateTxt}>종료일</span>
                                </div>
                                    <div className={styles.endCalendar}>
                                    <div>
                                        <DatePicker
                                        className={styles.endDatePicker}
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={startDate}
                                        dateFormat="yyyy년 MM월 dd일"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.summary}>
                                <span className={styles.summaryTxt}>요약하기</span>
                            </div>
                            
                            <IoExitOutline className={styles.exitButton} onClick={handleExit}/>

                        <div className={styles.summaryBox}/>
                        
                </div>


    )
}

export default AiSummary;