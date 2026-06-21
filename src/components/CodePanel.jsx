"use client";
import { useEffect, useState, useRef } from "react";

export default function CodePanel() {
  const tabs = ["brand.config.js", "website.tsx", "ui-system.ts"];

  const codeContent = [
    { name: "Premium", strategy: "defineVision()", design: "craftExperience()", impact: "measureSuccess()" },
    { name: "Portfolio", strategy: "buildWebsite()", design: "createUI()", impact: "generateLeads()" },
    { name: "Design System", strategy: "scaleGrowth()", design: "buildComponents()", impact: "improveUX()" },
  ];

  const [activeTab, setActiveTab] = useState(0);
  const [isSmall, setIsSmall] = useState(false);
  const cardRef = useRef(null);
  const rafRef = useRef(null);

  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [hovering, setHovering] = useState(false);

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

  function handleMouseMove(e) {
    const card = cardRef.current;
    if (!card) return;

    // Throttle with requestAnimationFrame to avoid janky/overlapping updates
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      const clampedPx = Math.min(Math.max(px, 0), 1);
      const clampedPy = Math.min(Math.max(py, 0), 1);

      const maxTilt = 7; // reduced for a calmer, less glitchy feel
      const ry = (clampedPx - 0.5) * maxTilt * 2;
      const rx = (0.5 - clampedPy) * maxTilt * 2;

      setTilt({ rx, ry });
      setGlow({ x: clampedPx * 100, y: clampedPy * 100 });
    });
  }

  function handleMouseEnter() {
    setHovering(true);
  }

  function handleMouseLeave() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setHovering(false);
    setTilt({ rx: 0, ry: 0 });
  }

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (isSmall) return null;

  return (
    <>
      <style>{`
        @keyframes floatPanel {
          0%, 100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
          50% { transform: translateY(-10px) rotateX(0deg) rotateY(0deg); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .cursor-blink {
          animation: blink 1s step-end infinite;
        }
        .codepanel-tilt-wrap {
          perspective: 1400px;
          perspective-origin: 50% 50%;
        }
        .codepanel-card {
          transform-style: preserve-3d;
          will-change: transform;
        }
      `}</style>

      {/* Perspective lives on a stable, non-positioned wrapper */}
      <div className="codepanel-tilt-wrap" style={{ position: "relative" }}>

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

        {/* Card — 3D tilt container */}
        <div
          ref={cardRef}
          className="codepanel-card"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            position: "relative",
            width: "500px",
            borderRadius: "24px",
            border: "1px solid #202020",
            background: "rgba(8,8,8,0.95)",
            backdropFilter: "blur(20px)",
            overflow: "hidden",
            boxShadow: hovering
              ? "0 30px 60px rgba(0,0,0,0.55), 0 0 50px rgba(0,240,255,0.12)"
              : "0 0 40px rgba(0,0,0,0.4)",
            transform: hovering
              ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale3d(1.015,1.015,1.015)`
              : "rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
            transition: hovering
              ? "transform 0.15s ease-out, box-shadow 0.3s ease"
              : "transform 0.5s ease-out, box-shadow 0.4s ease",
            animation: hovering ? "none" : "floatPanel 3s ease-in-out infinite",
          }}
        >
          {/* Sheen / glare layer that follows cursor */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              opacity: hovering ? 1 : 0,
              transition: "opacity 0.3s ease",
              background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(215,255,0,0.10), transparent 45%)`,
              zIndex: 2,
            }}
          />

          {/* Header */}
          <div
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "14px 20px", borderBottom: "1px solid #161616",
              position: "relative", zIndex: 1,
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
          <div style={{ padding: "40px", fontFamily: "monospace", fontSize: "15px", lineHeight: "2.2", position: "relative", zIndex: 1 }}>
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