import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import styles from "./Create.module.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

console.groupCollapsed("src/Project/Create.js");
console.groupEnd();

const Create = ({ closeModal, statusMapping, infoAlert, handleGetUpComingList, handleGetList }) => {
  console.group("Create() invoked.");
  console.groupEnd();

  const onClose = () => {
    closeModal();
  };

  const [selectList, setSelectList] = useState([]);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    status: "",
    detail: "",
    managerEmpno: "",
  });

  // useEffect(() => {
  //   console.log("startDate:", startDate, ", endDate:", endDate);
  // }, [startDate, endDate]);
  // useEffect(() => {
  //   console.log("formData:", formData);
  // }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const handlePostSaveCheck = async (e) => {
    e.preventDefault();

    try {
      formData.startDate = startDate;
      formData.endDate = endDate;
      
      // console.log("formData: ", formData);

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
          `https://localhost:443/project?${params.toString()}`,
          {
            method: "POST",
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
        formData({
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

  return (
    <div className={styles.back}>
      <div className={styles.body}>
        <form>
          {/* onSubmit={handleSubmit} */}
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
                name="startDate"
                selected={startDate}
                onChange={(date) =>
                  setStartDate(date ? date.toISOString().slice(0, 10) : "")
                }
                dateFormat="yyyy-MM-dd"
                className={styles.inputDate}
                placeholder="시작일자을 입력하세요."
                // value={registerForm.startDate}
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
                // value={endDate}
              />
            </div>

            <div className={styles.contentItem}>
              <label>종괄 담당자</label>
              <select
                name="managerEmpno"
                className={styles.select}
                onChange={handleChange}
              >
                <option value="">== 종괄 담당자를 선택하세요. ==</option>
                <option value="E2110002">Benyamin Taber</option>
                <option value="E2206011">Claribel Poetz</option>
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
                // value={formData.detail}
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
        </form>
      </div>
    </div>
  );
};

export default Create;
