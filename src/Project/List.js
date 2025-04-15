import { useState } from 'react';
import styles from './List.module.css';

import { P_ListUpComing, P_ListUnit, P_Create } from './'

console.groupCollapsed('src/Project/List.js'); console.groupEnd();

const List = () => {
  console.group('List() invoked.'); console.groupEnd();


    // main 검색 상태 관리
    const [listData, setListData] = useState({
      searchStatus: "",
      searchWord: "",
      searchText: "",
    });

      // main 검색 함수
      const handleSearch = () => {
        console.log('검색 버튼 클릭됨');
      };
      
    // main 엔터키로 검색
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') handleSearch();
    };

    // 모달 상태
    const [isOpen, setIsOpen] = useState(false);
    const openProjectRegister = () => setIsOpen(true);
    const closeProjectRegister = () => setIsOpen(false);

  
    //upComing





  return (
    <div className={styles.body}>

      <div className={styles.container}>

        <div className={styles.pageTitle}>Project List</div>

        <div className={styles.upComingContainer}>

          <div className={styles.subContainerTitle}>곧 종료되는 프로젝트</div>

          <div className={styles.upComingContent}>
            <P_ListUpComing />
            <P_ListUpComing />
          </div>
        </div>


        {isOpen && <P_Create closeModal={closeProjectRegister} />}


        <div className={styles.listContainer}>

          <div className={styles.subContainerTitle}>전체 프로젝트 리스트</div>

          <div className={styles.listBar}>

            <div className={styles.statusBar}>

              <div className={styles.statusBox}>
                <div>ALL</div>
                <div>진행예정</div>
                <div className={styles.active}>진행 중</div>
                <div>진행완료</div>
              </div>

            </div>

            <div className={styles.searchBar}>
              <div className={styles.input_box}>
                <input type='text' className={styles.input} placeholder='검색'></input>
                <i class="fa-solid fa-magnifying-glass"></i>
              </div>
              <button className={styles.btnStyle_yg} onClick={handleSearch}>검색</button>
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
}


export default List;
