import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tree } from "react-arborist";
import styles from './Organization2.module.css';


const Organization2 = ({onCloseOrgaClick}) => {
  const { deptNum } = useParams(); // deptNum은 문자열로 들어옴
  const DepartmentNumber = Number(deptNum) || 1; // 숫자로 변환, 없으면 1
  const [data, setData] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [inviteList, setInviteList] = useState([]);

  useEffect(() => {
      console.log("data:", data); // 데이터 확인용
  }, [data]);

  useEffect(() => {
      console.log("treeData:", treeData); // 데이터 확인용
  }, [treeData]);

  useEffect(() =>{
    const fetchData = async () => {
        try {
            const response = await fetch(`https://localhost:443/department/${DepartmentNumber}`);
            if (!response.ok) {
             throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setData(data); // 원본 데이터 저장
            const convertedData = convertToSortableTree(data);
            setTreeData([convertedData].filter(Boolean)); // 배열로 감싸고 null 제거
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };
    fetchData();
  },[]);

  if (treeData.length === 0) return <div>로딩 중...</div>;


  // 노드 클릭 핸들러
  const handleInvite = (node) => {
    // 이미 초대리스트에 있으면 추가하지 않음
    if (!inviteList.some(item => item.id === node.data.id)) {
      setInviteList([...inviteList, node.data]);
    }
    console.log("invited:", inviteList);
  };

  const NodeRenderer = ({ node, style, handlers }) => {
    return (
      <div
        style={style}
        className={node.isLeaf ? "leaf" : "folder"}
        onClick={(e) => {
          if (node.isLeaf) {
            handleInvite(node.data);
            handlers.select(e);
          }
        }}
      >
        {!node.isLeaf && (
          <span 
            className="arrow"
            onClick={(e) => {
              e.stopPropagation();
              handlers.toggle();
            }}
          >
            {node.isOpen ? "▼" : "▶"}
          </span>
        )}
        {node.data.name}
      </div>
    );
  };


  return (
    <div className={styles.container}>
        <div onClick={onCloseOrgaClick}>X</div>
        <Tree data={treeData} className={styles.tree} width={400} height={500}>
            {NodeRenderer}
        </Tree>
        <div>
        <h3>초대리스트</h3>
        <ul>
          {inviteList.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );

}; // Organization
export default Organization2;


const convertToSortableTree = (node) => {
  if (!node) return null; // 안전장치

  function getPositionName(number) {
    switch(number){
      case 1: return "팀원";
      case 2: return "팀장";
      case 3: return "부서장";
      case 4: return "CEO";
      case 5: return "인사관리자";
      case 9: return "시스템관리자";
      default: return "직급을알수없는사원";
    }
  }

  // 부서 children 처리
  const deptChildren = (node.children || []).map(convertToSortableTree).filter(Boolean);

  // 직원 children 처리 (고유 ID 생성)
  const empChildren = (node.employees || []).map(emp => ({
    id: `emp-${emp.empno}`,  // 직원 고유 ID
    name: `(${getPositionName(emp.position)}) `+emp.name,
    isEmployee: true,
    position: emp.position,
  }));

  const sortedDept = deptChildren.sort((a, b) =>a.id - b.id);

  // 기본적으로 id 기준 내림차순으로 정렬
  const sortedData = empChildren.sort((a, b) => b.position - a.position);


  return {
    id: `dept-${node.id}`,    // 부서 고유 ID
    name: node.name,
    isDepartment: true,
    depth: node.depth,
    children: [...sortedData, ...sortedDept]
  };
} // ConvertToSortableTree

