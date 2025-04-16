import styles from './ReceptionBubble.module.css';




/* 왼쪽(상대방 메시지) */
const ReceptionBubble = () => {
    
    return (
        <div className={styles.ReceptionBubble}>
            <div class="bubble left">채팅 메시지1</div>
            <div class="bubble left">채팅 메시지2</div>
            <div class="bubble left">채팅 메시지3</div>
        </div>
    )
};

export default ReceptionBubble;