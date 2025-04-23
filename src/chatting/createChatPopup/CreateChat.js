import React, { useState, useEffect } from "react";
import styles from './CreateChat.module.css';
import { useLoadScript } from "../../LoadScriptContext";

import Swal from 'sweetalert2';


const CreateChat = ({ onCloseClick, setChatrooms , chatrooms , fetchChatrooms}) => {
  const [roomName, setRoomName] = useState(""); //채팅방이름
  const [selectPj, setSelectPj] = useState(""); //프로젝트 
  const [selectPjs, setSelectPjs] = useState([]);

  const { decodedToken, token } = useLoadScript(); //  token 추가
  const empno = decodedToken.empno;

  useEffect(() => {
    const fetchCreateRoom = async () => {
      try {
        const response = await fetch("https://localhost:443/project/status");
        const data = await response.json();
        setSelectPjs(data);
      } catch (err) {
        console.error("프로젝트 리스트 불러오기 실패:", err);
      }
    };

    fetchCreateRoom();
  }, []);

  const handleCreateRoom = async () => {
    const formData = new FormData();
    formData.append("name", roomName);
    formData.append("projectId", selectPj);
    formData.append("empno", empno);

    try {
      const response = await fetch("https://localhost:443/chat", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}` // 헤더 추가
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error("서버 응답 실패: " + response.status);
      }

      const result = await response.json();
      console.log("서버 응답:", result);
      await Swal.fire({
        icon: 'success',
        title: '채팅방 생성 성공!',
        text: '새 채팅방이 성공적으로 생성되었습니다.',
        confirmButtonText: '확인'
      });
      console.log("chatrooms:", chatrooms);
      setChatrooms((prev) => [...prev, result]);
      onCloseClick?.();
      fetchChatrooms();
    } catch (err) {
      console.error("채팅방 생성 실패!", err);
      await Swal.fire({
        icon: 'error',
        title: '채팅방 생성 실패!',
        text: '채팅방을 생성하는 동안 오류가 발생했습니다. 다시 시도해주세요.',
        confirmButtonText: '확인'
      });
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.clsX} onClick={onCloseClick}>
          <i className='fas fa-xmark' style={{color: '#222'}}/>
        </button>
        <h2 className={styles.title}>채팅방 만들기</h2>

        <div className={styles.field}>
          <label>채팅방 이름</label>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="채팅방 이름을 적어주세요."
          />
        </div>

        <div className={styles.field}>
          <label>관련된 프로젝트 선택</label>
          <select
            value={selectPj}
            onChange={(e) => setSelectPj(e.target.value)}
          >
            <option value="" disabled hidden>프로젝트를 선택하세요</option>
            {selectPjs.map((pj) => (
              <option key={pj.id} value={pj.id}>{pj.name}</option>
            ))}
          </select>
        </div>

        <div>
          <button onClick={handleCreateRoom} className={styles.mkBtn}>만들기</button>
        </div>
      </div>
    </div>
  );
};

export default CreateChat;
