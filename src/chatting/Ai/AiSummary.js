import styles from './AiSummary.module.css';
import { BsMagic } from "react-icons/bs";
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AiSummary = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


    return (
                <div className={styles.aibox}>

                    <div className={styles.todaySummary}>
                        <BsMagic className={styles.magicWand}/>
                        <span className={styles.todaySummaryTxt}>오늘 하루 요약</span>
                    </div>
                    
                    <div className={styles.summaryAllBox}>

                        <div className={styles.dateSetManually}>
                            <span className={styles.dateSetManuallyTxt}>요약할 날짜 선택</span>
                        </div>

                        <div className={styles.startDateBox}>
                            <div className={styles.startDate}>
                                <span className={styles.startDateTxt}>시작일</span>
                                <div className={styles.startCalendar}>
                                <div>
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
                            </div>
                        </div>

                        <div className={styles.endDateBox}>
                            <div className={styles.endDate}>
                                <span className={styles.endDateTxt}>종료일</span>
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
                        </div>

                        <div className={styles.summary}>
                            <span className={styles.summaryTxt}>요약하기</span>
                        </div>
                        
                    </div>

                    <div className={styles.summaryBox}/>
                </div>


    )
}

export default AiSummary;