import styles from './AiSummary.module.css';
import { BsMagic } from "react-icons/bs";
import React, { useState } from 'react';
import { IoExitOutline } from "react-icons/io5";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AiSummary = ({id}) => {

    const empno = "E2005003";

    const handleExit = async() => { // 퇴장

        const formData = new FormData;
        formData.append("empno", empno);

        try  { 
            await fetch(`https://localhost:443/chat/${id}`,{
                method : 'DELETE',
                body: formData
            });
                console.log("퇴장 처리 완료");
        } catch (error) {
                console.log("퇴장 처리 실패",error);
        }
    }

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const formatDateToYMDHM = (date) => { // 날짜 포멧 변경
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0'); // 1월 → 01
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
      
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const [summaryText, setSummaryText] = useState("");

    const handleSummary = async() => { // 요약

        const formData = new FormData;
        formData.append("empno", empno);
        formData.append("start", formatDateToYMDHM(startDate));
        formData.append("end",formatDateToYMDHM(endDate));

        try  {
            // 1. 퇴장 요청 서버로 보내기
            const response = await fetch(`https://localhost:443/message/${id}/summarize`,{
                method : 'POST',
                body: formData
            });

            if (!response.ok) throw new Error("서버 응답 오류");

            const text = await response.text(); // or response.json() if JSON
            setSummaryText(text); // 상태에 저장
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
                                        dateFormat="yyyy-MM-dd HH:mm"
                                        />
                                </div>
                            </div>

                            <div className={styles.startDateBox}>
                                <div className={styles.startDate}>
                                    <span className={styles.startDateTxt}>종료일</span>
                                </div>
                                    <div className={styles.startDatePickerBox}>
                                   
                                        <DatePicker
                                        className={styles.startDatePicker}
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={startDate}
                                        dateFormat="yyyy-MM-dd HH:mm"
                                        />
                                </div>
                            </div>

                            <div className={styles.summaryInfo}>{summaryText}</div>
                            <div className={styles.summaryButton} onClick={handleSummary}>요약하기</div>
                            <IoExitOutline className={styles.exitButton} onClick={handleExit}/>

                        <div className={styles.summaryBox}/>
                        
                </div>


    )
}

export default AiSummary;