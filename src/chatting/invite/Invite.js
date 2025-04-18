import React, { useState } from "react";
import styles from "./Invite.module.css";

const Invite = ({ onOrgaClick, id }) => {
  const empno = "E2005003";
  const [invitedList, setInvitedList] = useState([]); //초대된 리스트

  const handleAddInvite = async () => {
    const formData = new FormData();

    formData.append("empno", invitedList);
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
      if(result == true) alert("채팅방 생성 성공!");
      else alert("채팅방 생성 실패");
    } catch (err) {
      console.error("채팅방 생성 실패!", err);
      alert("채팅방 생성 중 오류 발생!");
    }
  }


  return (
    <div className={styles.invite}>

      {/* 아바타들 */}
      <div className={styles.avatarRow}>
        <div class={styles.avatarBox}>
          {invitedList.slice(0, 3).map((name, index) => (
            <div key={index} className={styles.avatar}>
              {name} {/* 이름이 아니고 사진으로 */}
            </div>
          ))}
          {invitedList.length > 3 && (
            <div className={styles.avatar}>+{invitedList.length - 3}</div>
          )}
        </div>
        {/* avatarBox */}
        <button onClick={handleAddInvite} className={styles.inviteBtn}>
          초대하기
        </button>
      </div>
      {/* avatarRow */}
      {/*inviteRow*/}
      <button onClick={onOrgaClick} className={styles.opOrga}>
        조직도 보기
      </button>
    </div> //invite
  ); //return
}; //Invite

export default Invite;
