"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

const STORAGE_KEY = "ask-hussain-chat-history";

export default function AskHussainChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hey! I'm Ask Hussain — I can answer questions about Hussain's work, services, and process. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [leadJustCaptured, setLeadJustCaptured] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage = { role: "user", content: trimmed };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/ask-hussain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);

      if (data.leadCaptured) {
        setLeadJustCaptured(true);
        setTimeout(() => setLeadJustCaptured(false), 4000);
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open Ask Hussain chat"}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "58px",
          height: "58px",
          borderRadius: "50%",
          background: "#D7FF00",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 24px rgba(215,255,0,0.35)",
          zIndex: 9998,
          transition: "transform 0.25s ease, box-shadow 0.25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.08)";
          e.currentTarget.style.boxShadow = "0 4px 32px rgba(215,255,0,0.55)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 24px rgba(215,255,0,0.35)";
        }}
      >
        {isOpen ? <X size={24} color="#000" /> : <MessageCircle size={24} color="#000" />}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "94px",
            right: "24px",
            width: "min(380px, calc(100vw - 48px))",
            height: "min(560px, calc(100vh - 160px))",
            background: "#0a0a0a",
            border: "1px solid #1e1e1e",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9998,
            boxShadow: "0 12px 48px rgba(0,0,0,0.5)",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "18px 20px",
              borderBottom: "1px solid #1a1a1a",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#D7FF00",
                boxShadow: "0 0 8px rgba(215,255,0,0.6)",
              }}
            />
            <div>
              <p style={{ color: "#fff", fontWeight: "700", fontSize: "14px", margin: 0 }}>
                Ask Hussain
              </p>
              <p
                style={{
                  color: "#666",
                  fontSize: "11px",
                  margin: 0,
                  fontFamily: "var(--font-geist-mono, monospace)",
                }}
              >
                AI assistant
              </p>
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                }}
              >
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                    background: msg.role === "user" ? "#D7FF00" : "#161616",
                    color: msg.role === "user" ? "#000" : "#e0e0e0",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ alignSelf: "flex-start" }}>
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "14px 14px 14px 4px",
                    background: "#161616",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Loader2 size={14} color="#D7FF00" className="animate-spin" />
                  <span style={{ color: "#888", fontSize: "13px" }}>Thinking…</span>
                </div>
              </div>
            )}

            {leadJustCaptured && (
              <div
                style={{
                  alignSelf: "center",
                  padding: "8px 14px",
                  borderRadius: "999px",
                  background: "rgba(215,255,0,0.1)",
                  border: "1px solid rgba(215,255,0,0.3)",
                  color: "#D7FF00",
                  fontSize: "12px",
                  fontFamily: "var(--font-geist-mono, monospace)",
                }}
              >
                ✓ Details sent to Hussain
              </div>
            )}

            {error && (
              <p style={{ color: "#ff6b6b", fontSize: "12px", textAlign: "center" }}>
                {error}
              </p>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: "14px",
              borderTop: "1px solid #1a1a1a",
              display: "flex",
              gap: "8px",
              alignItems: "flex-end",
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Hussain's work…"
              rows={1}
              style={{
                flex: 1,
                resize: "none",
                background: "#111",
                border: "1px solid #222",
                borderRadius: "12px",
                padding: "10px 14px",
                color: "#fff",
                fontSize: "14px",
                outline: "none",
                fontFamily: "inherit",
                maxHeight: "100px",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#D7FF00")}
              onBlur={(e) => (e.target.style.borderColor = "#222")}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: loading || !input.trim() ? "#222" : "#D7FF00",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                flexShrink: 0,
                transition: "background 0.2s ease",
              }}
            >
              <Send size={16} color={loading || !input.trim() ? "#555" : "#000"} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}