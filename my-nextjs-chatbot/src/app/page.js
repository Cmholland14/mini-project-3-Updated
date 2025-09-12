"use client";

import { useState } from "react";
import "./chatbot.css"; // global CSS

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello! I’m Gemini 🤖" },
  ]);

  function formatResult(geminiRawResult) {
    return geminiRawResult.trim();
  }

  async function sendPrompt() {
    if (!prompt) return;

    // add user message
    setMessages((prev) => [...prev, { role: "user", text: prompt }]);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    const formattedResult = formatResult(data.content || data.error);

    // add bot response
    setMessages((prev) => [...prev, { role: "bot", text: formattedResult }]);

    setPrompt(""); // clear input
  }

  return (
    <div className="chatbot">
      {/* Messages */}
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message ${msg.role === "bot" ? "bot" : "user"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="chat-input">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendPrompt}>Send</button>
      </div>
    </div>
  );
}
