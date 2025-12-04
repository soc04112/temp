import { useState, useEffect, useRef } from 'react';
import '../../styles/trade/ChatBot.css';

export default function ChatBot() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const textContainerRef = useRef(null);

  const handleSend = () => {
    if (!msg.trim()) return;

    // 유저 메시지 추가
    const userMessage = { id: Date.now(), role: 'user', text: msg };
    setMessages(prev => [...prev, userMessage]);

    // 챗봇 메시지 (예: echo) HTTP POST로 받아오는걸로
    const botMessage = { id: Date.now() + 1, role: 'bot', text: "Echo: " + msg };
    setTimeout(() => setMessages(prev => [...prev, botMessage]), 300);

    setMsg("");
  };

  // 메시지 업데이트 시 자동 스크롤
  useEffect(() => {
    if (textContainerRef.current) {
      textContainerRef.current.scrollTop = textContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat">
    <h2>Chat Assistant</h2>
      <div className="chat-container">
        <div className="chat-navi">
          <button>Chat</button>
          <button>History</button>
        </div>

        <div className="respone-container">
          <div className="text-container" ref={textContainerRef}>
            {messages.map(m => (
              <div
                key={m.id}
                className={`message ${m.role === 'user' ? 'user-msg' : 'bot-msg'}`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <form
            className="input-area"
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
          >
            <textarea
              className="msg-search"
              value={msg}
              onChange={e => setMsg(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <button type="submit" className="msg-export-button">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
