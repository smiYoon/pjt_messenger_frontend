import React from "react";
import styles from "./Invite.module.css";

const Invite = ({ onOrgaClick, id, inviteList ,onInviteChange}) => {
  const empno = "E2005003";

  const handleAddInvite = async () => {
    const formData = new FormData();

    formData.append("empnos", inviteList);
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
      if(result == true) {alert("초대 성공!"); onInviteChange([]);}
      else alert("초대 실패");
    } catch (err) {
      console.error("초대 실패!", err);
      alert("초대 중 오류 발생!");
    }
  }


  return (
    <div className={styles.invite}>

      {/* 아바타들 */}
      <div className={styles.avatarRow}>
        <div class={styles.avatarBox}>
          {inviteList.slice(0, 3).map((name, index) => (
            <div key={index} className={styles.avatar}>
              {name} {/* 이름이 아니고 사진으로 */}
            </div>
          ))}
          {inviteList.length > 3 && (
            <div className={styles.avatar}>+{inviteList.length - 3}</div>
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
