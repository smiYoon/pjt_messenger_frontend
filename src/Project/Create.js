import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import styles from "./Create.module.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLoadScript } from '../LoadScriptContext';

// console.groupCollapsed("src/Project/Create.js");console.groupEnd();

const Create = ({ closeModal, infoAlert, handleGetUpComingList, handleGetList }) => {
  // console.group("Create() invoked.");  console.groupEnd();

  const onClose = () => {
    closeModal();
  };

  const { decodedToken, token, pjtStatusMapping } = useLoadScript();

  const [selectList, setSelectList] = useState([]);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [postData, setPostData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    status: "",
    detail: "",
    managerEmpno: decodedToken?.empno,
    creatorEmpno: decodedToken?.empno,
  });

  useEffect(() => { 
    if(startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (start > end) {
        infoAlert("warning", "", "시작일자는 종료일자보다 이전이어야 합니다.");
        setEndDate("");
      }
    } 
  }, [startDate, endDate]);

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchSelectManagerList = async () => {
      try {
        const response = await fetch(
          "https://localhost:443/employee/selectlist",
          { 
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setSelectList(data);
        } else {
          console.log("총괄담당자 선택 리스트 정보를 불러오는데 실패했습니다.");
        }
      } catch (error) {
        console.log("error: ", error);
      }
    };
    fetchSelectManagerList();
  }, []);

  const handlePostSaveCheck = async (e) => {
    // e.preventDefault();

    try {
      postData.startDate = startDate;
      postData.endDate = endDate;
      console.log("postData: ", postData);

      if (
        !postData.name ||
        !postData.startDate ||
        !postData.endDate ||
        !postData.managerEmpno ||
        !postData.creatorEmpno ||
        !postData.status
      ) {
        infoAlert("warning", "", "프로젝트명, 진행기간, 담당자, 진행상태를 입력하세요");
        return;
      }

      const formData = new FormData();
      formData.append("name", postData.name);
      formData.append("startDate", postData.startDate);
      formData.append("endDate", postData.endDate);
      formData.append("managerEmpno", postData.managerEmpno);
      formData.append("status", postData.status);
      formData.append("detail", postData.detail);
      formData.append("creatorEmpno", postData.creatorEmpno);

      const response = await fetch(
        `https://localhost:443/project`,
        {
          method: "POST",
          body: formData,
          headers: {
              Authorization: `Bearer ${token}`,
          },
        });

      if (response.ok) {
        infoAlert("success", "프로젝트 등록이 완료되었습니다.", " ");

        handleGetUpComingList();
        handleGetList(1, '');

        onClose();
      } else {
        infoAlert("error", "프로젝트 등록에 실패했습니다.", " ");
        console.log(response);
      }
    } catch (error) {
      infoAlert("error", "프로젝트 등록에 실패했습니다.", error);
    }
  };

  const handleCancelClick = () => {
    Swal.fire({
      title: "정말 취소하시겠습니까?",
      text: "취소 시 입력한 내용은 사라지게 됩니다.",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#999",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      allowOutsideClick: false,
      draggable: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setPostData({
          name: "",
          startDate: "",
          endDate: "",
          status: "",
          detail: "",
          managerEmpno: decodedToken?.empno,
          creatorEmpno: decodedToken?.empno,
        });
        onClose();
      }
    });
  };

  return (
    <div className={styles.back}>
      <div className={styles.body}>

        {/* <form> */}

          <div className={styles.container}>
            <div className={styles.pageTitle}>Project Create</div>

            <div className={styles.contentItem}>
              <label>프로젝트명</label>
              <input
                type="text"
                name="name"
                className={styles.input}
                placeholder="프로젝트명을 입력하세요."
                onChange={handleChange}
              />
            </div>

            <div className={styles.contentItem}>
              <label>기간</label>
              <DatePicker
                name="startDate"
                selected={startDate}
                onChange={(date) =>
                  setStartDate(date ? date.toISOString().slice(0, 10) : "")
                }
                dateFormat="yyyy-MM-dd"
                className={styles.inputDate}
                placeholder="시작일자을 입력하세요."
              />
              <span className={styles.tilde}>~</span>
              <DatePicker
                name="endDate"
                selected={endDate}
                onChange={(date) =>
                  setEndDate(date ? date.toISOString().slice(0, 10) : "")
                }
                dateFormat="yyyy-MM-dd"
                className={styles.inputDate}
                placeholder="종료일자을 입력하세요."
              />
            </div>

            <div className={styles.contentItem}>
              <label>종괄 담당자</label>
              <select
                name="managerEmpno"
                className={styles.select}
                onChange={handleChange}
              >
                <option value="">== 총괄 담당자를 선택하세요. ==</option>
                {selectList.map((emp) => (
                  <option value={emp.empno} selected={emp.empno === postData.creatorEmpno}>{emp.department} {emp.position} {emp.name}</option>
                ))}
              </select>
            </div>

            <div className={styles.contentItem}>
              <label>진행상태</label>
              <select
                name="status"
                className={styles.select}
                onChange={handleChange}
              >
                <option value="" key={""}>== 진행상태를 선택하세요. ==</option>
                {Object.entries(pjtStatusMapping).map(([sKey, sValue]) => (
                  <option value={sKey} key={sKey}>{sValue}</option>
                ))}
              </select>
            </div>

            <div className={styles.contentItem}>
              <label>내용</label>
              <textarea
                name="detail"
                className={styles.textarea}
                placeholder="내용을 입력하세요."
                onChange={handleChange}
              />
            </div>

            <div className={styles.buttonBox}>
              <button onClick={handlePostSaveCheck}>저장</button>
              <button
                onClick={handleCancelClick}
                className={styles.btnStyle_gray}
              >
                취소
              </button>
            </div>
          </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default Create;
