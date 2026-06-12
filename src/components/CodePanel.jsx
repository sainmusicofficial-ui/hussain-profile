"use client";
import { useEffect, useState } from "react";

export default function CodePanel() {
  const tabs = ["brand.config.js", "website.tsx", "ui-system.ts"];

  const codeContent = [
    {
      name: "Premium",
      strategy: "defineVision()",
      design: "craftExperience()",
      impact: "measureSuccess()",
    },
    {
      name: "Portfolio",
      strategy: "buildWebsite()",
      design: "createUI()",
      impact: "generateLeads()",
    },
    {
      name: "Design System",
      strategy: "scaleGrowth()",
      design: "buildComponents()",
      impact: "improveUX()",
    },
  ];

  const [activeTab, setActiveTab] = useState(0);
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const check = () => setIsSmall(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabs.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Hide completely on mobile & tablet
  if (isSmall) return null;

  return (
    <>
      <style>{`
        @keyframes floatPanel {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .cursor-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>

      <div style={{ position: "relative" }}>

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            inset: "-24px",
            background: "rgba(0,240,255,0.04)",
            filter: "blur(60px)",
            borderRadius: "40px",
            pointerEvents: "none",
          }}
        />

        {/* Card */}
        <div
          style={{
            position: "relative",
            width: "500px",
            borderRadius: "24px",
            border: "1px solid #202020",
            background: "rgba(8,8,8,0.95)",
            backdropFilter: "blur(20px)",
            overflow: "hidden",
            boxShadow: "0 0 40px rgba(0,0,0,0.4)",
            animation: "floatPanel 3s ease-in-out infinite",
          }}
          onMouseEnter={(e) => e.currentTarget.style.animationPlayState = "paused"}
          onMouseLeave={(e) => e.currentTarget.style.animationPlayState = "running"}
        >
          {/* Header */}
          <div
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "14px 20px", borderBottom: "1px solid #161616",
            }}
          >
            <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ef4444" }} />
            <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#eab308" }} />
            <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#22c55e" }} />
            <span style={{ marginLeft: "12px", color: "#666666", fontSize: "13px", fontFamily: "monospace", transition: "all 0.5s ease" }}>
              {tabs[activeTab]}
            </span>
          </div>

          {/* Code Body */}
          <div style={{ padding: "40px", fontFamily: "monospace", fontSize: "15px", lineHeight: "2.2" }}>
            <div>
              <span style={{ color: "#00F0FF" }}>const</span>{" "}
              <span style={{ color: "#ffffff" }}>brand</span>{" "}
              <span style={{ color: "#ffffff" }}>=</span>{" "}
              <span style={{ color: "#ffffff" }}>createIdentity</span>
              <span style={{ color: "#ffffff" }}>({"{"}</span>
            </div>
            <div style={{ paddingLeft: "24px", color: "#7A7A7A" }}>
              name:{" "}
              <span style={{ color: "#D7FF00", transition: "all 0.7s ease" }}>
                {codeContent[activeTab].name}
              </span>,
            </div>
            <div style={{ paddingLeft: "24px", color: "#7A7A7A" }}>
              strategy:
              <span style={{ color: "#00F0FF" }}> {codeContent[activeTab].strategy}</span>,
            </div>
            <div style={{ paddingLeft: "24px", color: "#7A7A7A" }}>
              design:
              <span style={{ color: "#00F0FF" }}> {codeContent[activeTab].design}</span>,
            </div>
            <div style={{ paddingLeft: "24px", color: "#7A7A7A" }}>
              impact:
              <span style={{ color: "#00F0FF" }}> {codeContent[activeTab].impact}</span>,
            </div>
            <div style={{ color: "#ffffff" }}>{`}`});</div>
            <div style={{ marginTop: "20px" }}>
              <span style={{ color: "#00F0FF" }}>export default</span>{" "}
              <span style={{ color: "#ffffff" }}>brand;</span>
              <span className="cursor-blink" style={{ marginLeft: "4px", color: "#D7FF00" }}>|</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}