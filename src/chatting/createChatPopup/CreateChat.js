import React, { useState, useEffect } from "react";
import styles from './CreateChat.module.css';
// import { fetchInitData } from "../api/chatApi";

const CreateChat = ({ onCloseClick }) => {
  const [roomName, setRoomName] = useState(""); //채팅방이름

  const [inviteName, setInviteName] = useState(""); //초대할 리스트

  const [invitedList, setInvitedList] = useState([]); //초대된 리스트
  
  const [selectPj, setSelectPj] = useState(""); //프로젝트 
  const [selectPjs, setSelectPjs] = useState([]);
  const [employees, setEmployees] = useState([]);//백에서 받아온 사원들리스트

  // useEffect(() => {
  //   fetchInitData()
  //   .then((data) => {
  //     // setInvitedList(data.empList
  //     //   // .map(emp => emp.id)
  //     // ); //초대된 리스트
  //     setEmployees(data.empList); //사원 리스트 
  //     setSelectPjs(data.pjLists);
  //     console.log("네 데이터 좀 보자:",data);
  //     // console.log("📦 네 데이터 좀 보자\n", JSON.stringify(data, null, 2));   
  //         })   
          
  // }, []);

  useEffect(() => {
    // 예: fetch 또는 axios 사용
    fetch("https://localhost:443/api/selectPj") //json 받을 url
      .then((res) => res.json())
      // .then((data) => setSelectPj(data));//이게 /api/init의 원인?
      .then((data) => {
        console.log("전체 data:", data);    
        console.log("불러온 프로젝트들:", data.pjList);
        console.log("불러온 사원들:", data.empList);
        setSelectPjs(data.pjList);
        setEmployees(data.empList);
        // setSelectPjs(data.pjList);
        // setSelectPj("");
      })
      .catch((err) => console.error("불러오기 실패:", err))
     
  }, []);
  //이렇게 하니깐 매번 팝업띄울때마다 불러옴.
  // api컴포넌트가 불러오게 하자. 시간이 너무 걸림

  //  console.log("selectPjs 담겼냐:",selectPjs);



// const handleAddInvite = () => {
//   const values = inviteName
//     .split(",")
//     .map((val) => val.trim())
//     .filter(Boolean);

//   const newIds = [];

//   values.forEach((val) => {
//     const [empnoStr] = val.split("-"); // 첫 번째 값이 empno
//     const empno = parseInt(empnoStr, 10);

//     const emp = employees.find((e) => e.empno === empno);
//     if (emp && !invitedList.includes(emp.empno)) {
//       newIds.push(emp.empno);
//     }
//   });

//   setInvitedList((prev) => [...prev, ...newIds]); // 최신 상태 기준 누적
//   setInviteName("");

//   console.log("✅ 추가된 사원 번호들:", newIds);
// };
  const handleAddInvite = () => {

    const names = inviteName.split(",").map((name) => name.trim()).filter(Boolean);
<<<<<<< Updated upstream
    const newIds =[];
  
    names.forEach(name=> {
    const emp = employees.find(e => e.name === name);
    if (emp && !invitedList.includes(emp.empno)){
      newIds.push(emp.empno);
    }
     
=======
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
>>>>>>> Stashed changes
    setInvitedList([...invitedList, ...newIds]);
    // setInvitedList(prev => [...prev, ...newIds]);
    setInviteName("");
    // console.log("names타입:{},name타입:{},emp타입:{},newIds타입:{}", typeof(names), typeof(name), typeof(emp), typeof(newIds));
    //names타입:object,name타입:string,emp타입:undefined,newIds타입:object
    console.log("초대된 리스트:", invitedList);
    console.log("초대할 이름:", inviteName);
  })};
//이름 + enter하면 실행됨. 누적 안됨.


<<<<<<< Updated upstream
  const handleCreateRoom = () => {
    const chatRoomData = {
      name: roomName
      , project: {id: parseInt(selectPj,10)} // 서버로는 ID 숫자로 보내기
      , members: invitedList.map(id => ({id}))
    };//chatRoomData

    console.log("채팅방 데이터(json):", JSON.stringify(chatRoomData, null,2));
    //json으로 가는 모습으로 콘솔 확인하기
  }//HandleCreateRoom

=======


  // const handleCreateRoom = async () => {
  //   const chatRoomData = {
  //     roomName: roomName
  //     , project: {id: parseInt(selectPj,10)} // 서버로는 ID 보내기
  //     , members: invitedList.map(id => ({id}))
  //   };//chatRoomData

  //   console.log("채팅방 데이터(json):", JSON.stringify(chatRoomData));
  //   //json으로 가는 모습으로 콘솔 확인하기

  //   //백으로 보내는 코드
  //   try{
  //     const response= await fetch("https://localhost:443/chat", {
  //       method: "POST",
  //       headers:{
  //         "Content-Type" : "application/json"
  //       },
  //       body: JSON.stringify(chatRoomData)
  //     });
  //     if (!response.ok){
  //       throw new Error("서버 응답 실패: " + response.status);
  //     }
  //   const result = await response.json();
  //   console.log("서버 응답:", result);
  //   alert("채팅방 생성 성공!");
  //   }catch (err){
  //     console.error("채팅방생성실패 !", err);
  //     alert("채팅방 생성중 오류 발생!");
  //   }
    
  // }//HandleCreateRoom

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
>>>>>>> Stashed changes





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
            placeholder="채팅방 이름을 적으세요"/>
        </div> {/*채팅방이름*/}


        {/* 프로젝트선택 */}
        <div className={styles.field}>
          <label>연관프로젝트</label>
          <select
            value={selectPj}
            onChange={(e) => setSelectPj(e.target.value)}>
            <option value="" disabled hidden>프로젝트를 선택하세요</option>
            {selectPjs.map((pj) => (
              <option key={pj.id} value={pj.id.toString()}>{pj.name}</option>
            ))} 
            
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
<<<<<<< Updated upstream

          {/* <div className={styles.avatarBox}> */}
            {invitedList.slice(0, 5).map((id, index) => (
=======
        <div className={styles.avatarBox}> 
        {invitedList.slice(0, 5).map((id, index) => (
>>>>>>> Stashed changes
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
