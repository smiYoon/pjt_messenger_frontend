import styles from './List.module.css';

import { P_ListUpComming, P_ListUnit } from './'

console.groupCollapsed('src/Project/List.js'); console.groupEnd();

const List = () => {
  console.group('List() invoked.'); console.groupEnd();
  return (
    <div className={styles.body}>

      <div className={styles.container}>

        <div className={styles.pageTitle}>Project List</div>

        <div className={styles.upCommingContainer}>

          <div className={styles.subContainerTitle}>곧 종료되는 프로젝트</div>

          <P_ListUpComming />
          <P_ListUpComming />
        </div>


        <div className={styles.listContainer}>

          <div className={styles.subContainerTitle}>전체 프로젝트 리스트</div>

          <P_ListUnit />
          <P_ListUnit />
          <P_ListUnit />
        </div>

      </div>

    </div>
  );
}


export default List;
