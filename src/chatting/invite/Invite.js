import React from "react";
import styles from "./Invite.module.css";

const Invite = ({ onOrgaClick , selectedChatRoom}) => {

  const isDisabled = !selectedChatRoom;

  return (
    <div className={`${styles.invite} ${isDisabled ? styles.disabled : ''}`}>
      <button
        onClick={onOrgaClick}
        className={styles.opOrga}
        disabled={isDisabled} // 버튼도 눌리지 않게
      >
        초대(조직도 보기)
      </button>
    </div>
  ); 
}; 

export default Invite;
