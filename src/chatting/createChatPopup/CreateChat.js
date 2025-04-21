import React, { useState, useEffect } from "react";
import styles from './CreateChat.module.css';
import { useLoadScript } from "../../LoadScriptContext";

const CreateChat = ({ onCloseClick, setChatrooms }) => {
  const [roomName, setRoomName] = useState("");
  const [selectPj, setSelectPj] = useState("");
  const [selectPjs, setSelectPjs] = useState([]);

  const { decodedToken, token } = useLoadScript(); // ✅ token 추가
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
          Authorization: `Bearer ${token}` // ✅ 헤더 추가
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error("서버 응답 실패: " + response.status);
      }

      const result = await response.json();
      alert("채팅방 생성 성공!");
      setChatrooms((prev) => [...prev, result]);
      onCloseClick?.();
    } catch (err) {
      console.error("채팅방 생성 실패!", err);
      alert("채팅방 생성 중 오류 발생!");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.clsX} onClick={onCloseClick}>X</button>
        <h2 className={styles.title}>채팅방 만들기</h2>

        <div className={styles.field}>
          <label>채팅방 이름</label>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="채팅방 이름을 적으세요"
          />
        </div>

        <div className={styles.field}>
          <label>연관프로젝트</label>
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
