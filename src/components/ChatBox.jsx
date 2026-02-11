import { useState, useRef, useEffect, useCallback } from "react";
import { sendMessageToCerebras } from "../api";
import SessionRefresher from "./SessionRefresher";
import "./chatStyles.css";

export default function ChatBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const resetSession = useCallback(() => {
    setMessages([]);
    setInput("");
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const cleanAndFormat = text => {
    if (!text) return "";
    return text
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/^\s*-\s*/gm, "• ")
      .replace(/\n{2,}/g, "\n\n")
      .replace(/\n/g, "<br />");
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const newUserMessage = { sender: "user", content: input };
    setMessages(prev => [...prev, newUserMessage]);
    setInput("");
    setIsTyping(true);

    const botResponse = await sendMessageToCerebras([...messages, newUserMessage]);
    const formattedResponse = cleanAndFormat(botResponse);

    setMessages(prev => [...prev, { sender: "bot", content: formattedResponse }]);
    setIsTyping(false);
  };

  const handleKeyPress = e => {
    if (e.key === "Enter" && !isTyping) handleSend();
  };

  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="chat-header">
          <div className="window-dot"></div>
          <div className="window-dot"></div>
          <div className="window-dot"></div>
        </div>
        <SessionRefresher onReset={resetSession} />

        <div className="chat-messages">
  {messages.length === 0 && (
    <div className="chat-empty">
      <div className="chat-empty-line animate-pop">MEET LEON</div>
      <div className="chat-empty-line-sub animate-pop delay-1">YOUR PERSONAL WILDCAT ASSISTANT</div>

    </div>

  )}

  {messages.map((msg, idx) => (
    <div
      key={idx}
      className={`chat-message ${msg.sender === "user" ? "user" : "bot"}`}
    >
      {msg.sender === "bot" ? (
        <span dangerouslySetInnerHTML={{ __html: msg.content }} />
      ) : (
        msg.content
      )}
    </div>
  ))}

  {isTyping && (
    <div className="chat-message bot typing-indicator">
      <span></span><span></span><span></span><span></span>
    </div>
  )}
  <div ref={messagesEndRef} />
</div>


        <div className="chat-input-container">
          <input
            className={`chat-input ${isTyping ? "disabled" : ""}`}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask something..."
            disabled={isTyping}
          />
          <button
            className={`chat-button ${isTyping ? "disabled" : ""}`}
            onClick={handleSend}
            disabled={isTyping}
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
}
