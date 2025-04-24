import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Tree } from "react-arborist";
import styles from './Organization2.module.css';
import Swal from 'sweetalert2';
import { useLoadScript } from "../../LoadScriptContext";

const Organization2 = ({ onCloseOrgaClick, handleChatRoomClick, id , socket}) => {
  const { deptNum } = useParams();
  const DepartmentNumber = Number(deptNum) || 1;

  const [data, setData] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [inviteList, setInviteList] = useState([]);

  const containerRef = useRef(null);

  const { token } = useLoadScript(); //  token 가져옴

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://localhost:443/department/${DepartmentNumber}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        const json = await res.json();
        setData(json);
        const converted = convertToSortableTree(json);
        if (converted) setTreeData([converted]);
      } catch (err) {
        console.error("조직도 데이터 fetch 실패:", err);
      }
    };
    fetchData();
  }, [DepartmentNumber]);

  // 초대 요청
  const handleAddInvite = async () => {
    const formData = new FormData();
    inviteList.forEach(emp => formData.append("empnos", emp.id));

    try {
      const res = await fetch(`https://localhost:443/chat/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, //  토큰 추가
        },
        body: formData
        
      });
      const result = await res.json();
      console.log("서버 응답:", result);

      await Swal.fire({
        icon: 'success',
        title: '초대 성공!',
        text: '선택한 사원이 채팅방에 초대되었습니다.',
        confirmButtonText: '확인'
      });

      setInviteList([]);
      onCloseOrgaClick();
      handleChatRoomClick?.(id);
    } catch (err) {
      console.error("초대 실패!", err);

      await Swal.fire({
        icon: 'error',
        title: '초대 실패!',
        text: '초대 중 오류가 발생했습니다. 다시 시도해주세요.',
        confirmButtonText: '확인'
      });
    }
  };

  // 외부 클릭 → 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setInviteList([]);
        onCloseOrgaClick();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 초대할 직원 설정
  const handleSelect = (nodes) => {
    const leafNodes = nodes.filter(n => n.isLeaf);
    const newInvites = leafNodes.map(n => ({
      id: n.data.id.replace('emp-', ''),
      name: n.data.name
    }));

    const combined = [...inviteList, ...newInvites];
    const unique = Array.from(new Map(combined.map(item => [item.id, item])).values());
    setInviteList(unique);
  };

  const handleRemoveInvite = (id) => {
    setInviteList(prev => prev.filter(emp => emp.id !== id));
  };

  if (treeData.length === 0) return <div className={styles.loading}>로딩 중...</div>;

  return (
    <div ref={containerRef} className={styles.container}>
        <div className={styles.Xbutton} onClick={() => {onCloseOrgaClick(); setInviteList([]); }}><i className='fas fa-xmark' style={{color: '#222'}}/></div>
        <Tree data={treeData} className={styles.tree} width={400} height={500} onSelect={handleSelect} />  
    
        <div className={styles.inviteBox}>
          <div className={styles.inviteList}>
            <h3>초대할 직원 ID들:</h3>
            <ul>
              {inviteList.map(({ id, name }) => (
                <li key={id} onClick={() => handleRemoveInvite(id)}>
                  {name}
                </li>
              ))}
            </ul>
          </div>
          <button className={styles.inviteBtn} disabled={inviteList.length === 0} onClick={handleAddInvite}>초대하기</button>
        </div>
      </div>

  );
};

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
    children: [...sortedData, ...sortedDept],
  };
} // ConvertToSortableTree

