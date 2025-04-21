import React, { useEffect, useState ,useRef} from "react";
import { useParams } from "react-router-dom";
import { Tree } from "react-arborist";
import styles from './Organization2.module.css';
import Swal from 'sweetalert2';


const Organization2 = ({onCloseOrgaClick, handleChatRoomClick, id}) => {
  const { deptNum } = useParams(); // deptNum은 문자열로 들어옴
  const DepartmentNumber = Number(deptNum) || 1; // 숫자로 변환, 없으면 1
  const [data, setData] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [inviteList, setInviteList] = useState([]);               // 초대할 직원 id들 저장

  useEffect(() => {
      console.log("data:", data); // 데이터 확인용
  }, [data]);

  useEffect(() => {
      console.log("treeData:", treeData); // 데이터 확인용
  }, [treeData]);

  // 조직도 데이터
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


  // 초대하기
  const handleAddInvite = async () => {
    const formData = new FormData();

    formData.append("empnos", inviteList.map(emp => emp.id));

    try {
      const response = await fetch(`https://localhost:443/chat/${id}`, {
        method: "PUT",
        body: formData
      });
  
      if (!response.ok) {
        throw new Error("서버 응답 실패: " + response.status);
      }
  
      const result = await response.json();
      console.log("서버 응답:", result);

      await Swal.fire({
        icon: 'success',
        title: '초대 성공!',
        text: '선택한 사원이 채팅방에 초대되었습니다.',
        confirmButtonText: '확인'
      });

      setInviteList([]);
      onCloseOrgaClick();
      
      // 초대 후 채팅방 갱신
      if (id) {
        await handleChatRoomClick(id);
      }
    } catch (err) {
      console.error("초대 실패!", err);

      await Swal.fire({
        icon: 'error',
        title: '초대 실패!',
        text: '초대 중 오류가 발생했습니다. 다시 시도해주세요.',
        confirmButtonText: '확인'
      });
    }
  }

  // 외부 클릭 감지
  const containerRef = useRef(null); // 외부 클릭 감지용 ref

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setInviteList([]);      // 리스트 비우기
        onCloseOrgaClick();      // 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  // 초대목록 설정
  const handleSelect = (selectedNodes) => {
    const leafNodes = selectedNodes.filter(node => node.isLeaf);
    const ids = leafNodes.map(node => {
      return {
        id: node.data.id.replace('emp-', ''),
        name: node.data.name,
      };
    });
    setInviteList(
      Array.from(new Map([...inviteList, ...ids].map(item => [item.id, item])).values())
    );
    console.log("초대할 직원 ID들:", inviteList);
  };

  const handleRemoveInvite = (idToRemove) => {
    const updatedList = inviteList.filter(emp => emp.id !== idToRemove);
    setInviteList(updatedList);
  };



  if (treeData.length === 0) return <div className={styles.loading}>로딩 중...</div>;


  return (
    <div ref={containerRef} className={styles.container}>
        <div className={styles.Xbutton} onClick={() => {onCloseOrgaClick(); setInviteList([]); }}>X</div>
        <Tree data={treeData} className={styles.tree} width={400} height={500}  onSelect={handleSelect} openByDefault={false} />  

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
    children: [...sortedData, ...sortedDept],
  };
} // ConvertToSortableTree

