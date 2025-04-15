import { useCallback, useState, useEffect } from "react";
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
  const [currPage, setCurrPage] = useState(0);
  const [pageSize] = useState(8);

  // list 검색 상태
  const [searchData, setSearchData] = useState({
    status: "",
    searchWord: "",
    searchText: "",
  });

  // list 검색 함수
  const handleSearchData = () => {
    console.log("검색 버튼 클릭됨");
  };

  // list 검색 엔터키 이벤트
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearchData();
  };

  // 모달 상태
  const [isOpen, setIsOpen] = useState(false);
  const openProjectRegister = () => setIsOpen(true);
  const closeProjectRegister = () => setIsOpen(false);

  //project upComing 리스트 data 가져오기
  const getUpComingList = useCallback(async () => {
    try {
      const response = await fetch(`https://localhost:443/project/upComing`, {
        method: "GET",
      });

      if (response.ok) {
        const upComingListJson = await response.json();
        const upComingListData = upComingListJson.content.map((data) => ({
          ...data
        }));
        console.log("upComingListData:", upComingListData);
        setUpComingList(upComingListData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  // 컴포넌트 마운트 시 첫 데이터 로드
  useEffect(() => {
    console.log("List useEffect() invoked.");
    getUpComingList();
  }, []);

  //project 전체 리스트 data 가져오기

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.pageTitle}>Project List</div>

        <div className={styles.upComingContainer}>
          <div className={styles.subContainerTitle}>곧 종료되는 프로젝트</div>

          <div className={styles.upComingContent}>
            {upComingList.map((project) => (
              <P_ListUpComing project={project} />
            ))}
          </div>
        </div>

        {isOpen && <P_Create closeModal={closeProjectRegister} />}

        <div className={styles.listContainer}>
          <div className={styles.subContainerTitle}>전체 프로젝트 리스트</div>

          <div className={styles.listBar}>
            <div className={styles.statusBar}>

              <div className={styles.statusBox}>
                <div>ALL</div>
                {Object.entries(statusMapping).map(([sKey, sValue]) => (
                  <div>{sKey}:{sValue}</div>
                ))}
              </div>

            </div>

            <div className={styles.searchBar}>
              <div className={styles.input_box}>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="검색"
                ></input>
                <i class="fa-solid fa-magnifying-glass"></i>
              </div>
              <button className={styles.btnStyle_yg} onClick={handleSearchData}>
                검색
              </button>
              <button onClick={openProjectRegister}>등록</button>
            </div>
          </div>

          <div className={styles.listBox}>
            <P_ListUnit />
            <P_ListUnit />
            <P_ListUnit />
            <P_ListUnit />
            <P_ListUnit />
            <P_ListUnit />
            <P_ListUnit />
          </div>

          <div className={styles.pageBar}>
            <div className={styles.pageBox}>
              <div> ◀ </div>
              <div> 1 </div>
              <div> 2 </div>
              <div> 3 </div>
              <div> 4 </div>
              <div> 5 </div>
              <div> ▶ </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
