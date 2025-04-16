import styles from './SendBubble.module.css';



/* 오른쪽(내 메시지) */
const SendBubble = () => {

    return (
        <div className={styles.sendBubble}>
            <div class="bubble right">채팅 메시지</div>
        </div>
    );
};

export default SendBubble;