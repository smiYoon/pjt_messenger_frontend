import React, { useState, useEffect } from "react";
import styles from './CreateChat.module.css';

const CreateChat = ({ onCloseClick }) => {
  const [roomName, setRoomName] = useState(""); //채팅방이름

  const [inviteName, setInviteName] = useState(""); //초대할 리스트

  const [invitedList, setInvitedList] = useState([]); //초대된 리스트
  
  const [selectPj, setSelectPj] = useState(""); //프로젝트 
  const [selectPjs, setSelectPjs] = useState([]);
  const [employees, setEmployees] = useState([]);//백에서 받아온 사원들리스트

  useEffect(() => {
  
    fetch("https://localhost:443/chat/init") //json 받을 url
      .then((res) => res.json())
      .then((data) => {
        console.log("전체 data:", data);    
        console.log("불러온 프로젝트들:", data.pjList);
        console.log("불러온 사원들:", data.empList);
        setSelectPjs(data.pjList);
        setEmployees(data.empList);
  })     
      .catch((err) => console.error("불러오기 실패:", err))
},[]);


  const handleAddInvite = () => {

    const names = inviteName.split(",").map((name) => name.trim()).filter(Boolean);
    const newIds=[];


    names.forEach((raw) => {
      const empno = raw.split("-")[0]; // "1001-홍길동-과장" → "1001"
           
      const emp = employees.find(e => e.empno === empno);
        if (emp && !invitedList.includes(emp.empno)) {
          newIds.push(emp.empno);
        }
        console.log("초되된 리스트:", invitedList);
      }
     
    );
    setInvitedList([...invitedList, ...newIds]);
    setInviteName("");
    console.log("초되된 리스트:", invitedList);
    console.log("초대할 이름:", inviteName);
  };//handleAddInvite


  //FromData버전

  const handleCreateRoom = async () => {
    const formData = new FormData();
  
    formData.append("roomName", roomName);
    formData.append("projectId", selectPj); // 문자열이라도 백에서 파싱하면 OK
  
    invitedList.forEach((id, index) => {
      formData.append(`members[${index}].id`, id); // 백에서 List<MemberDTO>로 받을 수 있도록
    });
  
    console.log("📦 보낼 FormData:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
  
    try {
      const response = await fetch("https://localhost:443/chat", {
        method: "POST",
        body: formData // headers에 Content-Type 안 넣는다! 브라우저가 자동으로 multipart 붙임
      });
  
      if (!response.ok) {
        throw new Error("서버 응답 실패: " + response.status);
      }
  
      const result = await response.json();
      console.log("서버 응답:", result);
      alert("채팅방 생성 성공!");
    } catch (err) {
      console.error("채팅방 생성 실패!", err);
      alert("채팅방 생성 중 오류 발생!");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.clsX}
          onClick={onCloseClick}>X</button>
        <h2 className={styles.title}>채팅방 만들기</h2>


        {/* 채팅방이름 */}
        <div className={styles.field}>
          <label>채팅방 이름</label>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="채팅방 이름을 적으세요"
          />
        </div>    {/* 채팅방이름 */}


        {/* 프로젝트선택 */}
        <div className={styles.field}>
          <label>연관프로젝트</label>
          <select
            value={selectPj}
            onChange={(e) => setSelectPj(e.target.value)}>
            <option value="" disabled selected hidden>프로젝트를 선택하세요</option>
            {selectPjs.map((pj) => (
              <option key={pj.id} value={pj.id}>{pj.name}</option>
            ))};
          </select>
        </div>{/*프로젝트선택*/}


        {/* 인원 초대 */}
        <div className={styles.field}>
          <label>인원 초대</label>
          
          <div className={styles.inviteRow}>
            <input
              list="empName"
              type="text"
              value={inviteName}
              placeholder="초대 이름"
              onChange={(e) => setInviteName(e.target.value)}
              onKeyDown={(e) => {
                if (/[^a-zA-z가~-힣]/.test(e.key)) {
                  e.preventDefault();
                } else if (e.key === "Enter") {
                  handleAddInvite();
                }
              }}/>
              <datalist id="empName">
                {employees.map((emp)=>(
                  <option key={emp.empno} 
                  // value={emp.name} //이름만 검색
                  // value={'${emp.name}(${emp.position})'}//직급도 검색
                  value={`${emp.empno}-${emp.name}-${emp.position}`}
                  />
                ))}
              </datalist>
            <button onClick={handleAddInvite}>+</button>
          </div> {/*inviteRow*/}

        </div>{/* 인원 초대 */}


        {/* 아바타들 */}
        <div className={styles.avatarRow} >
        <div className={styles.avatarBox}> 
        {invitedList.slice(0, 5).map((id, index) => (
              <div
                key={index}
                className={styles.avatar}
              >
                {id}
                {/* 이름이 아니고 사진으로 */}
              </div>
            ))}
            {invitedList.length > 5 && (
              <div className={styles.avatar}>
                 +{invitedList.length - 5}
              </div>
            )}
</div>
        </div> {/*avatarRow */}


        <div>
        <button onClick={handleCreateRoom} className={styles.mkBtn}>만들기</button>
        </div>
      </div>{/* popup */}

    </div> //overlay 
  );//return

};//CreateChat

export default CreateChat;
