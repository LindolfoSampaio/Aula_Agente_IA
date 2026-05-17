import React, { useState, type JSX } from "react";
import "./App.css";

const API_URL = "http://localhost:3001";

type Message = { role: "user" | "agent"; text: string };

function App(): JSX.Element {
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async (): Promise<void> => {
    if (!message) return;

    setLoading(true);

    const res = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, sessionId })
    });

    const data = await res.json();

    setSessionId(data.sessionId);

    setChat((prev: Message[]) => [
      ...prev,
      { role: "user", text: message },
      { role: "agent", text: String(data.reply) }
    ]);

    setMessage("");
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Teste de Agente de IA</h1>

      <div className="chat-box">
        {chat.map((msg: Message, i: number) => (
          <div
            key={i}
            className={`msg ${msg.role === "user" ? "user" : "agent"}`}
          >
            {msg.text}
          </div>
        ))}

        {loading && <div className="loading">⏳ Pensando...</div>}
      </div>

      <div className="input-area">
        <input
          value={message}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
        />
        <button onClick={sendMessage} disabled={loading}>
          Enviar
        </button>
      </div>
    </div>
  );
}

export default App;