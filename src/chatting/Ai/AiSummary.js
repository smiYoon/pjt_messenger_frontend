import styles from './AiSummary.module.css';
import { BsMagic } from "react-icons/bs";
import React, { useState, useEffect} from 'react';
import { IoExitOutline } from "react-icons/io5";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLoadScript } from "../../LoadScriptContext";
import Swal from "sweetalert2";


const AiSummary = ({ id, setChatrooms, setSelectedChatRoom, selectedChatRoom , setMessages, fetchChatrooms}) => {
    const { decodedToken, token } = useLoadScript();
    const empno = decodedToken?.empno;
    const isDisabled = !selectedChatRoom;

    useEffect(() => {
        setSummaryText("");
    }, [id]);


    const handleExit = async() => { // 퇴장

        const result = await Swal.fire({
            title: '정말로 이 채팅방을 떠나시겠습니까?',
            text: "이 작업은 되돌릴 수 없습니다.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '네',
            cancelButtonText: '아니요'
        });

        if (result.isConfirmed) {
            const formData = new FormData();
            formData.append("empno", empno);

            try  { 
                const response = await fetch(`https://localhost/chat/${id}`,{
                    method : 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}` // 토큰 추가
                    },
                    body: formData
                });
                    console.log("퇴장 처리 완료");
                    const deletedChat = await response.json();
                    setChatrooms((prev) => prev.filter((room) => room.chat.id !== deletedChat.id));
                    // 현재 보고 있던 방이 이 방이라면 초기화
                    if (selectedChatRoom?.id === deletedChat.id) {
                        setSelectedChatRoom(null);
                        setMessages([]); 
                    }
                    fetchChatrooms();
            } catch (error) {
                    console.log("퇴장 처리 실패",error);
            }
        }
    }


    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [summaryText, setSummaryText] = useState("");

    const formatDateToYMDHM = (date) => {
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    };

    const handleSummary = async () => {
   
        Swal.fire({
            title: '요약 생성 중...',
            text: '잠시만 기다려주세요.',
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
              Swal.showLoading();
            }
          });

        const formData = new FormData();
        formData.append("empno", empno);
        formData.append("start", formatDateToYMDHM(startDate));
        formData.append("end", formatDateToYMDHM(endDate));

        try {
            const response = await fetch(`https://localhost:443/message/${id}/summarize`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}` 
                },
                body: formData
            });
            const text = await response.text(); 
            setSummaryText(text); // 상태에 저장
            console.log("요약 처리 완료");
        } catch (error) {
            console.error("요약 처리 실패", error);
        } finally {
            Swal.close();
        }
    };

    const handleTodaySummary = async () => {

        const formData = new FormData();
        const now = new Date(); // 현재 시간
        const startOfDay = new Date(now);
        startOfDay.setHours(0, 0, 0, 0); // 00:00:00.000으로 설정
        const startDate = startOfDay;

        setStartDate(startDate);
        setEndDate(now);
        
        formData.append("empno", empno);
        formData.append("start", formatDateToYMDHM(startOfDay));
        formData.append("end", formatDateToYMDHM(new Date()));

        try {
            Swal.fire({
                title: '요약 생성 중...',
                text: '잠시만 기다려주세요.',
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: () => {
                  Swal.showLoading();
                }
              });

            const response = await fetch(`https://localhost:443/message/${id}/summarize`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}` //  토큰 추가
                },
                body: formData
            });

            if (!response.ok) throw new Error("서버 응답 오류");
            const text = await response.text();
            setSummaryText(text);
        } catch (error) {
            console.error("요약 처리 실패", error);
            Swal.fire('요약 실패', '요약 도중 문제가 발생했어요.', 'error');
        }finally {
            Swal.close(); // 항상 닫아줘야 함!
        }
    };

    return (
        <div className={styles.aibox}>
          <div
            className={`${styles.todaySummary} ${isDisabled ? styles.disabled : ''} `}
            onClick={isDisabled ? null : handleTodaySummary}
          >
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
                className={`${styles.startDatePicker} ${isDisabled ? styles.disabled : ''}`}
                selected={startDate}
                onChange={(date) => {
                  if (isDisabled) return;
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
                disabled={isDisabled}
              />
            </div>
          </div>
    
          <div className={styles.startDateBox}>
            <div className={styles.startDate}>
              <span className={styles.startDateTxt}>종료일</span>
            </div>
            <div className={styles.startDatePickerBox}>
              <DatePicker
                className={`${styles.startDatePicker} ${isDisabled ? styles.disabled : ''} `}
                selected={endDate}
                onChange={(date) => !isDisabled && setEndDate(date)}
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                showTimeSelect
                dateFormat="yyyy-MM-dd HH:mm"
                disabled={isDisabled}
              />
            </div>
          </div>
    
          <div className={styles.summaryInfo}>{summaryText}</div>
          <div
            className={`${styles.summaryButton} ${isDisabled ? styles.disabled : ''} `}
            onClick={isDisabled ? null : handleSummary}
          >
            요약하기
          </div>
    
          <IoExitOutline
            className={`${styles.exitButton} ${isDisabled ? styles.disabled2 : ''} `}
            onClick={isDisabled ? null : handleExit}
          />
        </div>
      );
};

export default AiSummary;
