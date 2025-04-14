import { useState } from 'react';

import styles from './Create.module.css';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

console.groupCollapsed('src/Project/Create.js'); console.groupEnd();

const Create = ({closeModal}) => {
  console.group('Create() invoked.'); console.groupEnd();

  const onClose = () => {
      closeModal();
  }

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  return (
    <div className={styles.back}>

      <div className={styles.body}>
        
        <div className={styles.container}>

          <div className={styles.pageTitle}>Project Create</div>

          <div className={styles.contentItem}>
            <label>프로젝트명</label>
            <input type="text" name='name' className={styles.input} placeholder="프로젝트명을 입력하세요." />
          </div>

          <div className={styles.contentItem}>
            <label>기간</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              className={styles.inputDate} 
              placeholder="시작일자을 입력하세요."
            />
            <span className={styles.tilde}>~</span> 
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
              className={styles.inputDate} 
              placeholder="종료일자을 입력하세요."
            />
          </div>

          <div className={styles.contentItem}>
            <label>종괄 담당자</label>
            <select name='manager' className={styles.select}>
              <option value="">== 종괄 담당자를 선택하세요. ==</option>
              <option value="1">담당자1</option>
            </select>
          </div>

          <div className={styles.contentItem}>
            <label>진행상태</label>
            <select name='manager' className={styles.select}>
              <option value="">== 진행상태를 선택하세요. ==</option>
              <option value="1">진행예정</option>
            </select>
          </div>

          <div className={styles.contentItem}>
            <label>내용</label>
            <textarea name='content' className={styles.textarea} placeholder="내용을 입력하세요." />
          </div>

          <div className={styles.buttonBox}>
            <button>저장</button>
            <button onClick={onClose} className={styles.btnStyle_gray}>취소</button>
          </div>

        </div>

      </div>

    </div>
  );
}


export default Create;
import { useState } from 'react';

import styles from './Create.module.css';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

console.groupCollapsed('src/Project/Create.js'); console.groupEnd();

const Create = ({closeModal}) => {
  console.group('Create() invoked.'); console.groupEnd();

  const onClose = () => {
      closeModal();
  }

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  return (
    <div className={styles.back}>

      <div className={styles.body}>
        
        <div className={styles.container}>

          <div className={styles.pageTitle}>Project Create</div>

          <div className={styles.contentItem}>
            <label>프로젝트명</label>
            <input type="text" name='name' className={styles.input} placeholder="프로젝트명을 입력하세요." />
          </div>

          <div className={styles.contentItem}>
            <label>기간</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              className={styles.inputDate} 
              placeholder="시작일자을 입력하세요."
            />
            <span className={styles.tilde}>~</span> 
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
              className={styles.inputDate} 
              placeholder="종료일자을 입력하세요."
            />
          </div>

          <div className={styles.contentItem}>
            <label>종괄 담당자</label>
            <select name='managerEmpno' className={styles.select}>
              <option value="">== 종괄 담당자를 선택하세요. ==</option>
              <option value="1">담당자1</option>
            </select>
          </div>

          <div className={styles.contentItem}>
            <label>진행상태</label>
            <select name='status' className={styles.select}>
              <option value="">== 진행상태를 선택하세요. ==</option>
              <option value="1">진행예정</option>
            </select>
          </div>

          <div className={styles.contentItem}>
            <label>내용</label>
            <textarea name='content' className={styles.textarea} placeholder="내용을 입력하세요." />
          </div>

          <div className={styles.buttonBox}>
            <button>저장</button>
            <button onClick={onClose} className={styles.btnStyle_gray}>취소</button>
          </div>

        </div>

      </div>

    </div>
  );
}


export default Create;