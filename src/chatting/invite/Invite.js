import React, { useState } from "react";
import styles from "./Invite.module.css";

const Invite = ({ onOrgaClick }) => {
  const [inviteName, setInviteName] = useState(""); //초대할 리스트
  const [invitedList, setInvitedList] = useState([]); //초대된 리스트

  //버튼들의 이 눌리면 작동하는 것들

  const handleAddInvite = () => {
    const names = inviteName
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean);

    const newNames = names.filter((id) => !invitedList.includes(id));
    setInvitedList([...invitedList, ...newNames]);
    setInviteName("");
  }; //handleAddInvite


  return (
    <div className={styles.invite}>

      
      {/* 아바타들 */}
      <div className={styles.avatarRow}>
        <div className={styles.avatarBox}>
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


      {/* 직원 검색 */}
      <div className={styles.inviteRow}>
        <input
          type="text"
          value={inviteName}
          onChange={(e) => setInviteName(e.target.value)}
          onKeyDown={(e) => {
            if (/\d/.test(e.key)) {
              e.preventDefault();                
            } else if (e.key === "Enter") handleAddInvite();
          }}
          placeholder="직원 검색"/>
        {/* <button onClick={handleAddInvite}>+</button> */}
      </div>
      {/*inviteRow*/}
      <button onClick={onOrgaClick} className={styles.opOrga}>
        조직도 보기
      </button>
    </div> //invite
  ); //return
}; //Invite

export default Invite;
