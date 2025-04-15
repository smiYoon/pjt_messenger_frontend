import React, { useEffect, useRef, useState } from "react";
import Tree from 'react-d3-tree';
import styles from './Organization.module.css';





const Organization = ({ onCloseOrganClick }) => {
  
  const [translate, setTranslate] = useState({ x: 0, y: 0 }); //드래그앤드랍
  const [treeData, setTreeData] = useState(null);

  const treeContainer = useRef(null);

  const convertOrgaToChildren = (node) => {
    const { orga, ...rest } = node;
    return {
      ...rest,
      children: orga?.map(convertOrgaToChildren) || []
    };
  };

  useEffect(() =>{
    fetch("https://localhost:443/department/tree")
      .then((res) => res.json())
      .then((data) => {
      console.log("우리조직 data:", data); 
      const converted = convertOrgaToChildren(data);
      setTreeData([converted]);  //react-d3-tree는 반드시 배열로 감싸야 함
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
