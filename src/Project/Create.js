import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import styles from "./Create.module.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

console.groupCollapsed("src/Project/Create.js");
console.groupEnd();

const Create = ({ closeModal, statusMapping }) => {
  console.group("Create() invoked.");
  console.groupEnd();

  const onClose = () => {
    closeModal();
  };

  const reloadPage = () => {
    window.location.reload(); // 브라우저 전체 새로고침
  };

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [selectList, setSelectList] = useState([]);
  const [registerForm, setRegisterForm] = useState({
    name: "",
    startDate: "",
    endDate: "",
    status: "",
    detail: "",
    managerEmpno: "",
  });

  useEffect(() => {
    console.log("startDate:", startDate, ", endDate:", endDate);
  }, [startDate, endDate]);
  
  const handleChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleManagerChange = (e) => {
    const selectedValue = e.target.value;
    setRegisterForm((prev) => ({
      ...prev,
      managerEmpno: selectedValue,
    }));
  };

  useEffect(() => {
    const fetchSelectManagerList = async () => {
      try {
        const response = await fetch(
          "https://localhost:443/employee/selectList",
          { method: "GET" }
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    registerForm.startDate = startDate;
    registerForm.endDate = endDate;

    if (
      !registerForm.name ||
      !registerForm.startDate ||
      !registerForm.endDate ||
      !registerForm.managerEmpno
    ) {
      alert(" 프로젝트명, 시작일시, 종료일시, 총괄담당자 입력하세요");
      return;
    }

    console.log("registerForm: ", registerForm);

    try {
      const formData = new FormData();
      formData.append("name", registerForm.name);
      formData.append("startDate", registerForm.startDate);
      formData.append("endDate", registerForm.endDate);
      formData.append("status", registerForm.status);
      formData.append("detail", registerForm.detail);
      formData.append("managerEmpno", registerForm.managerEmpno);

      const response = await fetch("https://localhost:443/project", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        successAlert("프로젝트 등록이 완료되었습니다.");
        console.log(response);
        reloadPage();
        onClose();
      } else {
        errorAlert("프로젝트 등록에 실패했습니다.");
        console.log(response);
      }
    } catch (error) {
      errorAlert("error: ", error);
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
        setRegisterForm({
          name: "",
          startDate: "",
          endDate: "",
          status: "",
          detail: "",
          managerEmpno: "",
        });
        onClose();
      }
    });
  };


  function successAlert(msg) {
    Swal.fire({
      title: msg,
      text: " ",
      icon: "success",
      confirmButtonText: "확인",
      allowOutsideClick: false,
      draggable: true,
    });
  };

  function errorAlert(msg) {
    Swal.fire({
      title: msg,
      text: " ",
      icon: "error",
      confirmButtonText: "확인",
      allowOutsideClick: false,
      draggable: true,
    });
  };

  return (
    <div className={styles.back}>
      <div className={styles.body}>

      <form onSubmit={handleSubmit}>

        <div className={styles.container}>
          <div className={styles.pageTitle}>Project Create</div>

          <div className={styles.contentItem}>
            <label>프로젝트명</label>
            <input
              type="text"
              name="name"
              className={styles.input}
              placeholder="프로젝트명을 입력하세요."
              // value={registerForm.name}
              onChange={handleChange}
            />
          </div>

          <div className={styles.contentItem}>
            <label>기간</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              className={styles.inputDate}
              placeholder="시작일자을 입력하세요."
              // value={registerForm.startDate}
            />
            <span className={styles.tilde}>~</span>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
              className={styles.inputDate}
              placeholder="종료일자을 입력하세요."
              // value={endDate}
            />
          </div>

          <div className={styles.contentItem}>
            <label>종괄 담당자</label>
            <select 
              name="managerEmpno" 
              className={styles.select}              
              onChange={handleManagerChange}
            >
              <option value="">== 종괄 담당자를 선택하세요. ==</option>
              <option value="E2110002">Benyamin Taber</option>
            </select>
          </div>

          <div className={styles.contentItem}>
            <label>진행상태</label>
            <select 
              name="status" 
              className={styles.select}
              // selected={registerForm.status}
              onChange={handleChange}
            >
              <option value="">== 진행상태를 선택하세요. ==</option>
              {Object.entries(statusMapping).map(([sKey, sValue]) => (
                <option value={sKey}>{sValue}</option>
              ))}
            </select>
          </div>

          <div className={styles.contentItem}>
            <label>내용</label>
            <textarea
              name="detail"
              className={styles.textarea}
              placeholder="내용을 입력하세요."
              value={registerForm.detail}
              onChange={handleChange}
            />
          </div>

          <div className={styles.buttonBox}>
            <button type="submit">저장</button>
            <button
              onClick={handleCancelClick}
              className={styles.btnStyle_gray}
            >
              취소
            </button>
          </div>

        </div>
          
        </form>
        
      </div>
    </div>
  );
}

export default Create;
