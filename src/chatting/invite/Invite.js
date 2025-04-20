import React from "react";
import styles from "./Invite.module.css";

const Invite = ({ onOrgaClick}) => {

  return (
    <div className={styles.invite}>
      <button onClick={onOrgaClick} className={styles.opOrga}>초대(조직도 보기)</button>
    </div> 
  ); 
}; 

export default Invite;
