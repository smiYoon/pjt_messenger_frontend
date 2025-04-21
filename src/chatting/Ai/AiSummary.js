import styles from './AiSummary.module.css';
import { BsMagic } from "react-icons/bs";
import React, { useState } from 'react';
import { IoExitOutline } from "react-icons/io5";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLoadScript } from "../../LoadScriptContext";

const AiSummary = ({ id, setChatrooms, setSelectedChatRoom, selectedChatRoom }) => {
    const { decodedToken, token } = useLoadScript();
    const empno = decodedToken?.empno;

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [summaryText, setSummaryText] = useState("");

    const formatDateToYMDHM = (date) => {
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    };

    const handleExit = async () => {
        const formData = new FormData();
        formData.append("empno", empno);

        try {
            const response = await fetch(`https://localhost:443/chat/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}` // ✅ 토큰 추가
                },
                body: formData
            });

            const deletedChat = await response.json();
            alert("퇴장했습니다");
            setChatrooms((prev) => prev.filter((room) => room.id !== deletedChat.id));

            if (selectedChatRoom?.id === deletedChat.id) {
                setSelectedChatRoom(null);
            }
        } catch (error) {
            console.error("퇴장 처리 실패", error);
        }
    };

    const handleSummary = async () => {
        const formData = new FormData();
        formData.append("empno", empno);
        formData.append("start", formatDateToYMDHM(startDate));
        formData.append("end", formatDateToYMDHM(endDate));

        try {
            const response = await fetch(`https://localhost:443/message/${id}/summarize`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}` // ✅ 토큰 추가
                },
                body: formData
            });

            if (!response.ok) throw new Error("서버 응답 오류");
            const text = await response.text();
            setSummaryText(text);
        } catch (error) {
            console.error("요약 처리 실패", error);
        }
    };

    const handleTodaySummary = async () => {
        const now = new Date();
        const startOfDay = new Date(now.setHours(0, 0, 0, 0));

        const formData = new FormData();
        formData.append("empno", empno);
        formData.append("start", formatDateToYMDHM(startOfDay));
        formData.append("end", formatDateToYMDHM(new Date()));

        try {
            const response = await fetch(`https://localhost:443/message/${id}/summarize`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}` // ✅ 토큰 추가
                },
                body: formData
            });

            if (!response.ok) throw new Error("서버 응답 오류");
            const text = await response.text();
            setSummaryText(text);
        } catch (error) {
            console.error("요약 처리 실패", error);
        }
    };

    return (
        <div className={styles.aibox}>
            <div className={styles.todaySummary} onClick={handleTodaySummary}>
                <BsMagic className={styles.magicWand} />
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
                        onChange={(date) => {
                            setStartDate(date);
                            if (endDate && date > endDate) {
                                setEndDate(null);
                            }
                        }}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        showTimeSelect
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
                        showTimeSelect
                        dateFormat="yyyy-MM-dd HH:mm"
                    />
                </div>
            </div>

            <div className={styles.summaryInfo}>{summaryText}</div>
            <div className={styles.summaryButton} onClick={handleSummary}>요약하기</div>
            <IoExitOutline className={styles.exitButton} onClick={handleExit} />
        </div>
    );
};

export default AiSummary;
