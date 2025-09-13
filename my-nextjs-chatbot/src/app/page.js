"use client";

import { useState } from "react";
import "./chatbot.css"; 

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello! I’m Gemini 🤖" },
  ]);

function formatResult(geminiRawResult) {
  let formattedResult = geminiRawResult
    .replace(/\*\*(.*?)\*\*/g, "$1")           // remove bold
    .replace(/`([^`]+)`/g, "$1")               // remove inline code
    .replace(/```[\s\S]*?```/g, match =>
      match.replace(/```[a-zA-Z]*\n?/g, "").replace(/```/g, "")
    )
    .replace(/^\*\s+/gm, "")                    // remove bullet * at start of line
    .replace(/\*(.*?)\*/g, "$1")               // remove remaining italics
    .replace(/\n{2,}/g, "\n")                  // collapse multiple newlines
    .replace(/\s{2,}/g, " ")                   // collapse multiple spaces
    .trim();

  return formattedResult;
}

  async function sendPrompt() {
    if (!prompt) return;

    setMessages(prev => [...prev, { role: "user", text: prompt }]);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    const formattedResult = formatResult(data.content || data.error);

    setMessages(prev => [...prev, { role: "bot", text: formattedResult }]);
    setPrompt(""); 
  }

  return (
    <div className="chatbot">
      <div className="chat-header">Chatbot</div>

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
