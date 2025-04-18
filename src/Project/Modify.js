import { useState, useEffect } from "react";
import Swal from "sweetalert2";

import styles from "./Create.module.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

console.groupCollapsed("src/Project/Modify.js");
console.groupEnd();

const Modify = ({ closeModal, statusMapping, infoAlert, project, handleGetUpComingList, handleGetList }) => {
  console.group("Modify(", project, ") invoked.");
  console.groupEnd();

  const onClose = () => {
    closeModal();
  };

  const [selectList, setSelectList] = useState([]);

  const [startDate, setStartDate] = useState(project.startDate);
  const [endDate, setEndDate] = useState(project.endDate);

  const [formData, setFormData] = useState({
    id: project.id,
    name: project.name,
    startDate: project.startDate,
    endDate: project.endDate,
    status: project.status,
    detail: project.detail,
    managerEmpno: project.pjtManager.empno,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchSelectManagerList = async () => {
      try {
        const response = await fetch(
          "https://localhost:443/employee/selectlist",
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

  const handlePostSaveCheck = async (e) => {

    try {
      formData.startDate = startDate;
      formData.endDate = endDate;

      console.log("formData: ", formData);

      if (
        !formData.name ||
        !formData.startDate ||
        !formData.endDate ||
        !formData.managerEmpno ||
        !formData.status
      ) {
        infoAlert("warning", "", "프로젝트명, 진행기간, 담당자, 진행상태를 입력하세요");
        return;
      }

      const params = new URLSearchParams(formData);

      const response = await fetch(
        `https://localhost:443/project/${formData.id}?${params.toString()}`,
        {
          method: "PUT",
        });

      if (response.ok) {
        infoAlert("success", "프로젝트 수정이 완료되었습니다.", " ");

        handleGetUpComingList();
        handleGetList(1, '');

        onClose();
      } else {
        infoAlert("error", "프로젝트 수정에 실패했습니다.", " ");
        console.log(response);
      }
    } catch (error) {
      infoAlert("error", "프로젝트 수정에 실패했습니다.", error);
    }
  };

  const handleModifyClick = () => {
    Swal.fire({
      title: "프로젝트 내용을 수정하시겠습니까?",
      text: " ",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#999",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      allowOutsideClick: false,
      draggable: true,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("handleModifyClick() invoked => yes ");
        handlePostSaveCheck();
      }
      else {
        console.log("handleModifyClick() invoked => no ");
      }
    });
  };




  return (
    <div className={styles.back}>
      <div className={styles.body}>

        {/* <form> */}

          <div className={styles.container}>
            <div className={styles.pageTitle}>Project Modify</div>

            <div className={styles.contentItem}>
              <label>프로젝트명</label>
              <input
                type="text"
                name="name"
                className={styles.input}
                placeholder="프로젝트명을 입력하세요."
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className={styles.contentItem}>
              <label>기간</label>
              <DatePicker
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
              <select name="managerEmpno" className={styles.select}
                onChange={handleChange}
              >
                <option value="">== 총괄 담당자를 선택하세요. ==</option>
                {selectList.map((emp) => (
                  <option value={emp.empno} selected={emp.empno === formData.managerEmpno}>{emp.department.name} {emp.position} {emp.name}</option>
                ))}
              </select>
            </div>

            <div className={styles.contentItem}>
              <label>진행상태</label>
              <select name="status" className={styles.select}
                onChange={handleChange}
              >
                <option value="">== 진행상태를 선택하세요. ==</option>
                {Object.entries(statusMapping).map(([sKey, sValue]) => (
                  <option value={sKey} selected={sKey == formData.status}>{sValue}</option>
                ))}
              </select>
            </div>

            <div className={styles.contentItem}>
              <label>내용</label>
              <textarea
                name="detail"
                className={styles.textarea}
                placeholder="내용을 입력하세요."
                value={formData.detail}
                onChange={handleChange}
              />
            </div>

            <div className={styles.buttonBox}>
              <button onClick={handleModifyClick}>저장</button>
              <button onClick={onClose} className={styles.btnStyle_gray}>
                취소
              </button>
            </div>
          </div>

        {/* </form> */}

      </div>
    </div>
  );
};

export default Modify;
