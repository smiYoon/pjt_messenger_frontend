import React from "react";
import styles from "./Invite.module.css";

const Invite = ({ onOrgaClick , selectedChatRoom}) => {

  const isDisabled = !selectedChatRoom;

  return (
    <div className={styles.invite}>
      <button
        onClick={onOrgaClick}
        className={`${styles.opOrga} ${isDisabled ? styles.disabled : ''}`}
        disabled={isDisabled} // 버튼도 눌리지 않게
      >
        대화상대 초대
      </button>
    </div>
  ); 
}; 

export default Invite;
