import React, { useEffect, useRef, useState } from "react";

const ChatRoom = ({ id }) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!id) return; // chatId가 undefined면 연결하지 않음

    const socket = new WebSocket(`wss://localhost:443/chat?chatId=${id}`);
    socketRef.current = socket;

    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    socket.onopen = () => {
      console.log("WebSocket 연결됨");
    };

    socket.onclose = () => {
      console.log("WebSocket 연결 종료");
    };

    return () => {
      socket.close();
    };
  }, [id]);

  const sendMessage = (msg) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(msg);
    }
  };

  return (
    <div>
      <h2>채팅방 {id}</h2>
      <ul>
        {messages.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
      <input
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage(e.target.value);
        }}
      />
    </div>
  );
};

export default ChatRoom;