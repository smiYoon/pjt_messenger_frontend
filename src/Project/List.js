import { useCallback, useState, useEffect } from "react";
import Swal from "sweetalert2";

import styles from "./List.module.css";

import { P_ListUpComing, P_ListUnit, P_Create } from "./";

console.groupCollapsed("src/Project/List.js");
console.groupEnd();

const List = () => {
  console.group("List() invoked.");
  console.groupEnd();

  // 상태 및 타입 매핑
  const statusMapping = { 1: "진행예정", 2: "진행중", 3: "종료" };

  // upComingList, list
  const [upComingList, setUpComingList] = useState([]);
  const [list, setList] = useState([]);

  // list paging 정보
  const [currPage, setCurrPage] = useState(1);
  const [pageSize] = useState(4);

  // list 검색 상태
  const [totalPageCnt, setTotalPageCnt] = useState(0);
  const pageNumbers = [];
  for (let i = 1; i <= totalPageCnt; i++) {
    pageNumbers.push(i);
  }
  const [searchData, setSearchData] = useState({
    status: "",
    searchWord: "",
    searchText: "",
  });

  useEffect(() => {
    console.log("searchData:", searchData);
  }, [searchData]);

  // list 검색 함수
  const handleSearchData = (field, value) => {
    setSearchData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // list 검색 엔터키 이벤트
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleGetList(1);
    }
  };

  // 모달 상태
  const [isOpen, setIsOpen] = useState(false);
  const openProjectRegister = () => setIsOpen(true);
  const closeProjectRegister = () => setIsOpen(false);

  //project 상단 upComing 리스트 data 가져오기
  const handleGetUpComingList = useCallback(async () => {
    try {
      const response = await fetch(`https://localhost:443/project/upComing`, {
        method: "GET",
      });

      if (response.ok) {
        const upComingListJson = await response.json();
        const upComingListData = upComingListJson.content.map((data) => ({
          ...data,
        }));
        console.log("upComingListData:", upComingListData);
        setUpComingList(upComingListData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  //project 하단 리스트 data 가져오기
  const handleGetList = useCallback(
    async (page = 1, state = searchData.status) => {
      setCurrPage(page);
      handleSearchData("status", state);

      const params = new URLSearchParams({
        currPage: page,
        pageSize: pageSize,
        status: state,
        searchWord: searchData.searchWord,
        searchText: searchData.searchText,
      });
      console.log("params:", params.toString());

      try {
        const response = await fetch(
          `https://localhost:443/project?${params.toString()}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) throw new Error("서버 응답 오류");

        const listJson = await response.json();
        const listData = listJson.content.map((data) => ({
          ...data,
        }));

        console.log("listData:", listData);

        setList(listData);

        setTotalPageCnt(listJson.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    [searchData, currPage]
  );

  // 컴포넌트 마운트 시 첫 데이터 로드
  useEffect(() => {
    console.log("List useEffect() invoked.");

    handleGetUpComingList();

    handleSearchData("status", "");
    handleSearchData("searchWord", "");
    handleSearchData("searchText", "");

    handleGetList(1);
  }, []);

  //project data 삭제
  const handleProjectDelete = useCallback(
    async (pjtId) => {
      console.log("handleProjectDelete(", pjtId, ") invoked ");
      try {
        const response = await fetch(`https://localhost:443/project/${pjtId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          const data = await response.json();
          console.info("data:", data);
          infoAlert("success", "프로젝트가 삭제되었습니다.", " ");

          handleGetUpComingList();
          handleGetList(currPage, searchData.status);
        } else {
          console.error("삭제 실패:", response.statusText);
          infoAlert("error", "프로젝트 삭제가 실패하였습니다.", " ");
        }
      } catch (error) {
        console.error("요청 중 오류 발생:", error);
        infoAlert("error", "오류가 발생했습니다. 다시 시도해주세요.", " ");
      }
    },
    [searchData, currPage]
  );

  function infoAlert(icon, title, msg) {
    Swal.fire({
      title: title,
      text: msg,
      icon: icon,
      confirmButtonText: "확인",
      allowOutsideClick: false,
      draggable: true,
    });
  }

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.pageTitle}>Project List</div>

        <div className={styles.upComingContainer}>
          <div className={styles.subContainerTitle}>곧 종료되는 프로젝트</div>

          <div className={styles.upComingContent}>
            {upComingList.map((project) => (
              <P_ListUpComing
                project={project}
                statusMapping={statusMapping}
                onDelete={handleProjectDelete}
              />
            ))}
          </div>
        </div>

        {isOpen && (
          <P_Create
            closeModal={closeProjectRegister}
            statusMapping={statusMapping}
            fAlert={infoAlert}
            handleGetList={handleGetList}
            handleGetUpComingList={handleGetUpComingList}
          />
        )}

        <div className={styles.listContainer}>
          <div className={styles.subContainerTitle}>전체 프로젝트 리스트</div>

          <div className={styles.listBar}>
            <div className={styles.statusBar}>
              <div className={styles.statusBox}>
                <div
                  onClick={() => handleGetList(1, "")}
                  className={searchData.status === "" ? styles.active : ""}
                >
                  ALL
                </div>
                {Object.entries(statusMapping).map(([sKey, sValue]) => (
                  <div
                    key={sKey}
                    onClick={() => handleGetList(1, sKey)}
                    className={sKey === searchData.status ? styles.active : ""}
                  >
                    {sValue}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.searchBar}>
              <select
                name="searchWord"
                className={styles.dropdown}
                value={searchData.searchWord}
                onChange={(e) => handleSearchData("searchWord", e.target.value)}
              >
                <option value="">검색조건</option>
                <option value="name">프로젝트명</option>
                <option value="detail">상세정보</option>
              </select>

              <div className={styles.input_box}>
                <input
                  name="searchText"
                  className={styles.input}
                  value={searchData.searchText}
                  placeholder="검색어를 입력하세요."
                  onChange={(e) =>
                    handleSearchData("searchText", e.target.value)
                  }
                  onKeyUp={handleKeyPress}
                ></input>
                <i class="fa-solid fa-magnifying-glass"></i>
              </div>

              <button
                className={styles.btnStyle_yg}
                onClick={() => handleGetList(1)}
              >
                검색
              </button>
              <button onClick={openProjectRegister}>등록</button>
            </div>
          </div>

          <div className={styles.listBox}>
            {list.map((project) => (
              <P_ListUnit
                project={project}
                statusMapping={statusMapping}
                onDelete={handleProjectDelete}
              />
            ))}
          </div>

          <div className={styles.pageBar}>
            {currPage} / {totalPageCnt}
            <div className={styles.pageBox}>
              <div> ◀ </div>
              {pageNumbers.map((num) => (
                <div
                  key={num}
                  onClick={() => handleGetList(num)}
                  style={{ color: num === currPage ? "red" : "normal" }}
                >
                  {" "}
                  {num}{" "}
                </div>
              ))}
              <div> ▶ </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
