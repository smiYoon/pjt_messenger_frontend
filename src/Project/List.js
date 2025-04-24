import { useCallback, useState, useEffect } from "react";
import Swal from "sweetalert2";

import styles from "./List.module.css";
import pagingStyles from "./PagingStyle.module.css"

import { P_ListUpComing, P_ListUnit, P_Create } from "./";
import { useLoadScript } from '../LoadScriptContext';

// console.groupCollapsed("src/Project/List.js");console.groupEnd();

const List = () => {
  // console.group("List() invoked.");  console.groupEnd();


  const { decodedToken, role_level, token, pjtStatusMapping } = useLoadScript();
  console.log('로그인 사용자정보:', decodedToken);

  const userRole = Array.isArray(decodedToken?.roles)
    ? decodedToken.roles[0]
    : decodedToken?.roles;
  const userRoleLevel = role_level[userRole]; // 수정


  // upComingList, list
  const [upComingList, setUpComingList] = useState([]);
  const [list, setList] = useState([]);

  // list paging 정보
  const [currPage, setCurrPage] = useState(1);
  const [pageSize] = useState(4);
  const [blockSize] = useState(10);
  const [totalPageCnt, setTotalPageCnt] = useState(0);
  const [currBlock, setCurrBlock] = useState(Math.floor((currPage - 1) / blockSize));

  const [startPage, setStartPage] = useState(currBlock * blockSize);
  const [endPage, setEndPage] = useState(
    Math.min(startPage + blockSize, totalPageCnt)
  );

  useEffect(() => {
    setCurrBlock(Math.floor((currPage - 1) / blockSize));
    setStartPage(currBlock * blockSize);
    setEndPage(Math.min(startPage + blockSize, totalPageCnt));
  }, [currPage, totalPageCnt, currBlock, startPage, endPage, blockSize]);

  // 검색어 및 상태 관리
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
      console.log("Enter:");
      handleGetList(1);
    }
  };

  // 모달 상태
  const [isOpen, setIsOpen] = useState(false);
  const openProjectRegister = () => setIsOpen(true);
  const closeProjectRegister = () => setIsOpen(false);
  console.log("▶ 현재 token:", token);
  //project 상단 upComing 리스트 data 가져오기
  const handleGetUpComingList = useCallback(async () => {
    try {
      const response = await fetch(`https://localhost/project/upComing`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },

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
  }, [token]); // 수정점.

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
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("서버 응답 오류");

        const listJson = await response.json();
        const listData = listJson.content.map((data) => ({
          ...data,
        }));

        setCurrBlock(Math.floor((currPage - 1) / blockSize));
        setStartPage(currBlock * blockSize);
        setEndPage(Math.min(startPage + blockSize, totalPageCnt));

        console.log("listData:", listData);

        setList(listData);

        setTotalPageCnt(listJson.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    [token, searchData, currPage, blockSize, currBlock, startPage, endPage, pageSize, totalPageCnt]
  );

  // 컴포넌트 마운트 시 첫 데이터 로드
  useEffect(() => {
    console.log("List useEffect() invoked.");
    if (!token) return;
    handleGetUpComingList();

    handleSearchData("status", "");
    handleSearchData("searchWord", "");
    handleSearchData("searchText", "");

    handleGetList(1);
  }, [token]);

  //project data 삭제
  const handleProjectDelete = useCallback(
    async (pjtId) => {
      console.log("handleProjectDelete(", pjtId, ") invoked ");
      try {
        const response = await fetch(`https://localhost/project/${pjtId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
    [token, searchData, currPage]
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
                key={project.id}
                project={project}
                onDelete={handleProjectDelete}
                infoAlert={infoAlert}
                handleGetList={handleGetList}
                handleGetUpComingList={handleGetUpComingList}
              />
            ))}
          </div>
        </div>

        {isOpen && (
          <P_Create
            closeModal={closeProjectRegister}
            infoAlert={infoAlert}
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
                {Object.entries(pjtStatusMapping).map(([sKey, sValue]) => (
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
              {userRoleLevel === 3 || userRoleLevel === 9 ? ( // 수정점.
                <button onClick={openProjectRegister}>등록</button>
              ) : (<div></div>)
              }
            </div>
          </div>

          <div className={styles.listBox}>
            {list.map((project) => (
              <P_ListUnit
                key={project.id}
                project={project}
                onDelete={handleProjectDelete}
                infoAlert={infoAlert}
                handleGetList={handleGetList}
                handleGetUpComingList={handleGetUpComingList}
                currPage={currPage}
              />
            ))}
          </div>

          <div className={pagingStyles.pageBar}>

            {/* currPage: {currPage} / totalPageCnt:{totalPageCnt} / startPage:{startPage} / endPage:{endPage} */}

            <div className={pagingStyles.pageBox}>

              {/*               
              <div
                className={pagingStyles.pageNum}
                onClick={() => handleGetList(1)}
                style={{ display: currPage === 1 ? "none" : "" }}
              >
                처음
              </div> */}

              <div
                className={pagingStyles.pageNum}
                onClick={() => handleGetList(startPage - blockSize + 1)}
                style={{ display: currPage <= 10 ? "none" : "" }}
              >
                <i className="fas fa-angles-left"></i>
              </div>

              <div
                className={pagingStyles.pageNum}
                onClick={() => handleGetList(currPage - 1)}
                style={{ display: currPage === 1 ? "none" : "" }}
              >
                <i className="fas fa-angle-left"></i>
              </div>

              {Array.from(
                { length: endPage - startPage },
                (_, i) => startPage + i + 1
              ).map((pageNum) => (
                <div
                  key={pageNum}
                  className={currPage === pageNum ? pagingStyles.activePage : pagingStyles.pageNum}
                  onClick={() => handleGetList(pageNum)} // ← 이 부분에서 currPage 변경됨
                >
                  {pageNum}
                </div>
              ))}

              <div
                className={pagingStyles.pageNum}
                onClick={() => handleGetList(currPage + 1)}
                style={{ display: currPage === totalPageCnt || totalPageCnt === 0 ? "none" : "" }}
              >
                <i className="fas fa-angle-right"></i>
              </div>

              <div
                className={pagingStyles.pageNum}
                onClick={() => handleGetList(endPage + 1)}
                style={{ display: (endPage + 1) > totalPageCnt || totalPageCnt === 0 ? "none" : "" }}
              >
                <i className="fas fa-angles-right"></i>
              </div>
              {/* 
              <div
                className={pagingStyles.pageNum}
                onClick={() => handleGetList(totalPageCnt)}
                style={{ display: currPage === totalPageCnt ? "none" : "" }}
              >
                마지막
              </div> */}


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
