import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tree } from "react-arborist";
import styles from './Organization.module.css';

const Organization = ({ onDeptSelect }) => {
  const { deptNum } = useParams();
  const DepartmentNumber = 1;
  const [treeData, setTreeData] = useState([]);

  // 데이터 패치
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://localhost/department/2`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        const convertedData = convertToSortableTree(data);
        setTreeData([convertedData].filter(Boolean));
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, []);

  const handleSelect = (selectedNodes) => {
    const deptIds = selectedNodes
    .filter(node => node.data.isDepartment) // 부서 노드만 필터링
    .map(node => node.data.id.replace('dept-', '')); // dept- 제거
    console.log("선택된 부서 ID들:", deptIds);

    if(deptIds.length > 0 && onDeptSelect) {
      onDeptSelect(deptIds[0]);
    }
  };


  if (treeData.length === 0) return <div>로딩 중...</div>;

  return (
    <div className={styles.container}>
      <Tree
        data={treeData}
        width={400}
        height={850}
        className={styles.arborist}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default Organization;

// 부서 데이터 변환 함수
const convertToSortableTree = (node) => {
  if (!node) return null;

  const deptChildren = (node.children || [])
    .map(convertToSortableTree)
    .filter(Boolean)
    .sort((a, b) => {
      const numA = parseInt(a.id.replace('dept-', ''), 10);
      const numB = parseInt(b.id.replace('dept-', ''), 10);
      return numA - numB;
    });

  return {
    id: `dept-${node.id}`, // 부서 ID 포맷
    name: node.name,
    isDepartment: true,
    children: deptChildren,
  };
};
