import React, { useEffect, useRef, useState } from "react";
import Tree from 'react-d3-tree';
import styles from './Organization.module.css';






// //데이터베이스에서 부서 정보 가져오기:
// //팝업 UI:
// //부서/팀 선택:
// // 초대 기능:

// //정보 가져오기
// 커스텀 노드 렌더링 함수
// const renderCustomNode = ({ nodeDatum }) => {
//   return (
//     <foreignObject width="200" height="100" x="-100" y="-50">
//       <div className={styles.nodeCard}>
//         <div className={styles.nodeName}>{nodeDatum.name}</div>
//         <div className={styles.nodeRole}>{nodeDatum.attributes?.role}</div>
//         <button
//           className={styles.inviteButton}
//           onClick={() => alert(`${nodeDatum.name} 초대!`)}
//         >
//           초대
//         </button>
//       </div>
//     </foreignObject>
//   );
// };

const Organization = ({ onCloseOrganClick }) => {
  
  const [translate, setTranslate] = useState({ x: 0, y: 0 }); //드래그앤드랍
  const [treeData, setTreeData] = useState(null);

  const treeContainer = useRef(null);


  useEffect(() =>{
    fetch("https://localhost:443/department/tree")
      .then((res) => res.json())
      .then((data) => {
      console.log("우리조직 data:", data); 
      setTreeData([data]) //react-d3-tree는 반드시 배열로 감싸야 함
    })   
      .catch((err) => console.error("불러오기 실패:", err))
  },[]);

  useEffect(() => {
    if (treeContainer.current) {
      const dimensions = treeContainer.current.getBoundingClientRect();
      setTranslate({ x: dimensions.width / 2, y: 100 });
    }
  }, []);

  if (!treeData) return <div>로딩중 ...</div>



  return (
        <div className={styles.treeContainer}>
      <button onClick={onCloseOrganClick}>❌ 닫기</button>
    <div style={{ width: '100%', height: '600px' }}>
      <Tree data={treeData} orientation="vertical" />
    </div>
    </div>//treeContainer
  );





};
export default Organization;