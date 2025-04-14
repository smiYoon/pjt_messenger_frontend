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
  
    fetch("https://localhost:443/api/selectPj") //json 받을 url
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

    names.forEach(name=> {
      const emp = employees.find(e => e.name === name);
      if (emp && !invitedList.includes(emp.empno)){
        newIds.push(emp.empno);
      }      
    })
    setInvitedList([...invitedList, ...newIds]);
    setInviteName("");
    console.log("초되된 리스트:", invitedList);
    console.log("초대할 이름:", inviteName);
  };//handleAddInvite

  const handleCreateRoom = () => {
    const chatRoomData = {
      roomName: roomName
      , project: {id: parseInt(selectPj,10)} // 서버로는 ID 보내기
      , members: invitedList.map(id => ({id}))
    };//chatRoomData

    console.log("채팅방 데이터(json):", JSON.stringify(chatRoomData));
    //json으로 가는 모습으로 콘솔 확인하기
  }//HandleCreateRoom


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
              type="text"
              value={inviteName}
              placeholder="초대 이름"
              onChange={(e) => setInviteName(e.target.value)}
              // className={styles.ivtNs}
              onKeyDown={(e) => {
                if (/[^a-zA-z가~-힣\s]/.test(e.key)) {
                  e.preventDefault();
                } else if (e.key === "Enter") {
                  handleAddInvite();
                }
              }}

            />
            <button onClick={handleAddInvite}>+</button>
          </div> {/*inviteRow*/}
        </div>{/*field*/}


        {/* 아바타들 */}
        <div className={styles.avatarRow} >

          {/* <div className={styles.avatarBox}> */}
            {invitedList.slice(0, 5).map((name, index) => (
              <div
                key={index}
                className={styles.avatar}
              >
                {name}
                {/* 이름이 아니고 사진으로 */}
              </div>
            ))}
            {invitedList.length > 5 && (
              <div className={styles.avatar}>
                 +{invitedList.length - 5}
              </div>
            )}
          {/* </div> avatarBox */}



        </div> {/*avatarRow */}
        <div>
        <button onClick={handleCreateRoom} className={styles.mkBtn}>만들기</button>
        </div>
      </div>{/* popup */}

    </div> //overlay 
  );//return

};//CreateChat

export default CreateChat;
