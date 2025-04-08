import React, {useState,useEffect} from "react";
import styles from './CreateChat.module.css';

const CreateChat=({onCloseClick}) =>{
    const [roomName, setRoomName]= useState(""); //채팅방이름
    const [selectPj, setSelectPj] =useState("AI 협업메신저"); //프로젝트 
    const [inviteName,setInviteName] = useState(""); //초대할 리스트
    const [invitedList, setInvitedList] =useState([]); //초대된 리스트
    const [selectPjs, setSelectPjs] = useState([]);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
      // 예: fetch 또는 axios 사용
      fetch("/api/selectPj") //json 받을 url
        .then((res) => res.json())
        .then((data) => setSelectPj(data));
  }, []);

  const handleAddInvite= ()=>{
      // if (inviteName.trim() != ""){ //조직도에서 리스트로 받아오지 못하는 것 같음.
      //     setInvitedList([...invitedList,inviteName]);
      //     setInviteName("")//추가 했으니 빈문자로 바꿔 중복 선택 되는가?
      // }//if 첫번째

      // const names=inviteName.split(",").map((name)=>name.trim()).filter((name) => name !== "");
      // if (names.length >0){
      //     setInvitedList([...invitedList,...names]);
      //     setInviteName(""); //추가하고 빈칸으로 만들기
      // }; 두번째

 
        const names = inviteName
          .split(",")
          .map((name) => name.trim())
          .filter(Boolean);
        const newNames = names.filter((id) => !invitedList.includes(id));
        //중복된 id제거        
        setInvitedList([...invitedList, ...newNames]);
        setInviteName("");


  //     <ul>
  // {invitedList.map(({ id, name }) => (
  //   <li key={id}>{name}</li>
  // ))}
  // </ul>

  };//handleAddInvite

  const handleCreateRoom = () => {
      const chatRoomData ={
          roomName: roomName
          ,project: selectPj // 서버로는 ID 보내기
          ,members:invitedList
      };//chatRoomData

      console.log("채팅방 데이터(json):",JSON.stringify(chatRoomData));
      //json으로 가는 모습으로 콘솔 확인하기
  }//HandleCreateRoom

  //둘 비교 해보기
  // const handleCreateRoom = () => {
  //     const data = {
  //       roomName,
  //       projectId: selectedProject, // 서버로는 ID 보내기
  //       members: invitedList,
  //     };
  //     console.log("보낼 데이터:", data);invitedList
  //   };







  return(
      <div className={styles.overlay }>
          <div className={styles.popup }>
              <button className={styles.clsX}
              onClick={onCloseClick}>X</button>
              <h2 className={styles.title}>채팅방 만들기</h2>

              {/* div 1 */}   
              <div className={styles.field}>
                  <label 
                  // className={styles.mkChatT}
                  >채팅방 이름</label>
                  <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  // className={styles.inputN}
                  placeholder="채팅방 이름을 적으세요"
                  />
              </div> {/*mkName*/}

              {/* div 2 */} 
              <div className={styles.field}>
                  <label
                  // className={styles.pjT}
                  >연관프로젝트</label>
                  <select
                  value={selectPj}
                  onChange={(e)=>setSelectPj(e.target.value)}
                  // className={styles.selecPj}
                  >
                      <option value="" disabled selected hidden>프로젝트를 선택하세요</option>
                      {selectPjs.map((pj) => (
                        <option key={pj.id} value={pj.id}>{pj.name}</option>
                      ))};  
                  </select>
              </div>{/*mkPj*/}

              {/* div 3 */}
              <div className={styles.field}>
                <label 
                // className={styles.ivtT}
                >인원 초대</label>
                <div className={styles.inviteRow}>
                  <input
                  type="text"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  // className={styles.ivtNs}
                  placeholder="초대 이름"
                  />
                  <button
                  onClick={handleAddInvite}
                  className={styles.ivtBtn}
                  >+</button>
                </div> {/*flex*/}
              </div>{/*inviteEm*/}

          <div className={styles.avatarRow} >
            {invitedList.map((name, index) => (
              <div
                key={index}
                className={styles.avatar}
              >
                {name}
              </div>
            ))}
          </div>

          <button
            onClick={handleCreateRoom}
            className={styles.mkBtn}
          >
            만들기
          </button>


          </div> {/*popup */}
      </div> //overlay 
  );

};//CreateChat

export default CreateChat;
