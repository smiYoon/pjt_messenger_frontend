import React, {useState} from "react";

const createChat=() =>{
    const [roomName, setRoomName]= useState(""); //채팅방이름
    const [selectPj, setSelectPj] =useState("AI 협업메신저"); //프로젝트 
    const [inviteName,setInviteName] = useState(""); //초대할 리스트
    const [invitedList, setInvitedList] =useState([]); //초대된 리스트

// 닫기X 버튼, 만들기 버튼

const handleAddInvite= ()=>{
    // if (inviteName.trim() != ""){ //조직도에서 리스트로 받아오지 못하는 것 같음.
    //     setInvitedList([...invitedList,inviteName]);
    //     setInviteName("")//추가 했으니 빈문자로 바꿔 중복 선택 되는가?

    // }//if

    const names=inviteName.split(",").map((name)=>name.trim()).filter((name) => name !== "");

    if (names.length >0){
        setInvitedList([...invitedList,...names]);
        setInviteName(""); //추가하고 빈칸으로 만들기
    };
};//handleAddInvite

const HandleCreateRoom = () => {
    const chatRoomData ={
        roomName: roomName
        ,project: selectPj // 서버로는 ID 보내기
        ,members:invitedList
    };//chatRoomData

    console.log("채팅데이터: {}",chatRoomData);

}//HandleCreateRoom

//둘 비교 해보기
// const handleCreateRoom = () => {
//     const data = {
//       roomName,
//       projectId: selectedProject, // 서버로는 ID 보내기
//       members: invitedList,
//     };
//     console.log("보낼 데이터:", data);
//   };




useEffect(() => {
    // 예: fetch 또는 axios 사용
    fetch("/api/selectPj") //json 받을 url
      .then((res) => res.json())
      .then((data) => setSelectPj(data));
  }, []);

retrun(
    <div className="backg css: fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <div className="sect css: w-[666px] h-[730px] bg-[#e6ddf6] rounded-xl p-8 shadow-xl relative">
            <button className="close css: absolute top-4 right-4 text-xl font-bold">X</button>
            <h2 className="title css: text-2xl font-semibold text-center mb-8">채팅방 만들기</h2>

            <div className="mkName">
                <label className="mkChatr">채팅방 만들기</label>
                <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="inputN css: w-full p-3 rounded border border-gray-300"
                placeholder="채팅방 이름을 적으세요"
                />
            </div> {/*mkName*/}

            <div className="mkPj">
                <label className="chPjN">연관프로젝트</label>
                <select
                value={selectPj}
                onChange={(e)=>setSelectPj(e.target.value)}
                className="chPj w-full p-3 rounded border border-gray-300"
                >
                    <option value="" disabled selected hidden>프로젝트를 선택하세요</option>
                    {selectPjs.map((pj) => (
                        <option key={pj.id} value={pj.id}>{pj.name}</option>
                    ))};  
                </select>
            </div>{/*mkPj*/}

            <div className="mb-4">
          <label className="block mb-2">인원 초대</label>
          <div className="flex">
            <input
              type="text"
              value={inviteName}
              onChange={(e) => setInviteName(e.target.value)}
              className="flex-grow p-3 rounded-l border border-gray-300"
              placeholder="초대 이름"
            />
            <button
              onClick={handleAddInvite}
              className="p-3 bg-[#7046d3] text-white rounded-r"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex gap-2 mb-8 mt-2">
          {invitedList.map((name, index) => (
            <div
              key={index}
              className="w-10 h-10 rounded-full bg-[#ccc] flex items-center justify-center text-sm font-semibold"
            >
              {name[0]}
            </div>
          ))}
        </div>

        <button
          onClick={handleCreateRoom}
          className="w-full p-4 bg-[#7046d3] text-white text-lg rounded-lg hover:bg-[#5b38a8]"
        >
          만들기
        </button>




        </div> {/*sect*/}
    </div> //backg
);




};//createChat