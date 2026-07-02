"use client";
import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&<>/\\|!?";
const SESSION_KEY = "hk_preloader_shown";

function scramble(setText, setGlitch, finalText, duration, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      setGlitch(true);
      const len = finalText.length;
      let frame = 0;
      const totalFrames = duration / 40;
      const iv = setInterval(() => {
        const next = finalText
          .split("")
          .map((char, i) => {
            if (char === " " || char === ".") return char;
            if (frame / totalFrames > i / len) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
        setText(next);
        frame++;
        if (frame >= totalFrames) {
          setText(finalText);
          setGlitch(false);
          clearInterval(iv);
          resolve();
        }
      }, 40);
    }, delay);
  });
}

export default function Preloader({ onComplete }) {
  // Start hidden so server-rendered content is never blocked and repeat
  // visits show nothing. We decide whether to actually run inside useEffect.
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  const [nameText, setNameText] = useState("");
  const [nameOpacity, setNameOpacity] = useState(0);
  const [nameGlitch, setNameGlitch] = useState(false);

  const [titleText, setTitleText] = useState("");
  const [titleOpacity, setTitleOpacity] = useState(0);

  const [dividerVisible, setDividerVisible] = useState(false);

  const [progress, setProgress] = useState(0);
  const [s1Done, setS1Done] = useState(false);
  const [s2Done, setS2Done] = useState(false);
  const [s3Done, setS3Done] = useState(false);

  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    // ── Session gate ────────────────────────────────────────────────
    // If we've already shown the preloader this session, skip entirely.
    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch (e) {
      // sessionStorage unavailable (privacy mode etc.) — treat as first visit
      alreadyShown = false;
    }

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (alreadyShown || prefersReduced) {
      // Mark as shown and fire completion immediately — no animation, no block
      try { sessionStorage.setItem(SESSION_KEY, "1"); } catch (e) {}
      onComplete && onComplete();
      return;
    }

    // First visit of the session — run the full intro
    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch (e) {}
    setVisible(true);

    let cancelled = false;

    function animateCounter() {
      return new Promise((resolve) => {
        let val = 0;
        const iv = setInterval(() => {
          val = Math.min(val + Math.floor(Math.random() * 5) + 1, 100);
          setProgress(val);
          if (val >= 30) setS1Done(true);
          if (val >= 65) setS2Done(true);
          if (val >= 100) {
            setS3Done(true);
            clearInterval(iv);
            resolve();
          }
        }, 28);
      });
    }

    async function runIntro() {
      setNameOpacity(1);
      await scramble(setNameText, setNameGlitch, "HUSSAIN KHAN", 1000, 800);
      if (cancelled) return;
      setDividerVisible(true);
      setTitleOpacity(1);
      await scramble(setTitleText, () => {}, "Strategy → Design → Build.", 750, 300);
      if (cancelled) return;
      await new Promise((r) => setTimeout(r, 200));
      await animateCounter();
      if (cancelled) return;
      await new Promise((r) => setTimeout(r, 400));

      setExiting(true);
      setTimeout(() => {
        setVisible(false);
        onComplete && onComplete();
      }, 900);
    }

    runIntro();

    return () => {
      cancelled = true;
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#060606",
        color: "#f0ede8",
        fontFamily: "'Space Grotesk', sans-serif",
        overflow: "hidden",
        transform: exiting ? "translateY(-100%)" : "translateY(0)",
        transition: exiting ? "transform 0.9s cubic-bezier(0.76,0,0.24,1)" : "none",
      }}
    >
      {/* Noise overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999,
          pointerEvents: "none",
          opacity: 0.04,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Corners */}
      {[
        { pos: "tl", style: { top: 32, left: 32 }, transform: "none", delay: 0.1 },
        { pos: "tr", style: { top: 32, right: 32 }, transform: "scaleX(-1)", delay: 0.2 },
        { pos: "bl", style: { bottom: 32, left: 32 }, transform: "scaleY(-1)", delay: 0.3 },
        { pos: "br", style: { bottom: 32, right: 32 }, transform: "scale(-1)", delay: 0.4 },
      ].map((c) => (
        <div
          key={c.pos}
          style={{
            position: "absolute",
            width: "20px",
            height: "20px",
            opacity: 0,
            transform: c.transform,
            animation: `preloaderFadeIn 0.4s ease forwards ${c.delay}s`,
            ...c.style,
          }}
        >
          <div style={{ position: "absolute", width: "100%", height: "1px", top: 0, left: 0, background: "#c8f55a" }} />
          <div style={{ position: "absolute", width: "1px", height: "100%", top: 0, left: 0, background: "#c8f55a" }} />
        </div>
      ))}

      {/* Scanline */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, #c8f55a, transparent)",
          opacity: 0,
          top: 0,
          animation: "preloaderScan 1.6s cubic-bezier(0.4,0,0.2,1) forwards 0.3s",
        }}
      />

      {/* Grid lines */}
      <div style={{ position: "absolute", left: 0, right: 0, height: "1px", top: "50%", background: "#ffffff05", opacity: 0, animation: "preloaderFadeIn 0.5s ease forwards 0.2s" }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, width: "1px", left: "50%", background: "#ffffff05", opacity: 0, animation: "preloaderFadeIn 0.5s ease forwards 0.2s" }} />

      {/* Center content */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", zIndex: 2 }}>
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "10px",
            letterSpacing: "0.4em",
            color: "#444",
            textTransform: "uppercase",
            opacity: 0,
            animation: "preloaderFadeInUp 0.5s ease forwards 0.6s",
          }}
        >
          Portfolio — 2026
        </div>

        <div
          data-text={nameText || "HUSSAIN KHAN"}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(36px, 7vw, 80px)",
            fontWeight: "700",
            letterSpacing: "0.12em",
            color: "#f0ede8",
            opacity: nameOpacity,
            textAlign: "center",
            position: "relative",
          }}
        >
          {nameText}
          {nameGlitch && (
            <>
              <span
                aria-hidden="true"
                style={{
                  content: "''",
                  position: "absolute",
                  inset: 0,
                  color: "#ff003c",
                  animation: "preloaderGlitchA 0.15s steps(2) infinite",
                  clipPath: "polygon(0 20%, 100% 20%, 100% 40%, 0 40%)",
                }}
              >
                {nameText}
              </span>
              <span
                aria-hidden="true"
                style={{
                  content: "''",
                  position: "absolute",
                  inset: 0,
                  color: "#00f0ff",
                  animation: "preloaderGlitchB 0.15s steps(2) infinite",
                  clipPath: "polygon(0 60%, 100% 60%, 100% 80%, 0 80%)",
                }}
              >
                {nameText}
              </span>
            </>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            width: "300px",
            opacity: dividerVisible ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, #c8f55a)" }} />
          <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#c8f55a" }} />
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, #c8f55a, transparent)" }} />
        </div>

        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(10px, 1.4vw, 13px)",
            letterSpacing: "0.3em",
            color: "#c8f55a",
            textTransform: "uppercase",
            opacity: titleOpacity,
            textAlign: "center",
          }}
        >
          {titleText}
        </div>
      </div>

      {/* Progress area */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(320px, 80vw)",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          opacity: 0,
          animation: "preloaderFadeIn 0.4s ease forwards 0.4s",
        }}
      >
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "8px",
              letterSpacing: "0.2em",
              color: s1Done ? "#333" : "#2a2a2a",
              textTransform: "uppercase",
              opacity: 0,
              animation: "preloaderFadeIn 0.3s ease forwards 0.5s",
            }}
          >
            [ Loading Assets ]
          </span>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "8px",
              letterSpacing: "0.2em",
              color: s2Done ? "#333" : "#2a2a2a",
              textTransform: "uppercase",
              opacity: 0,
              animation: "preloaderFadeIn 0.3s ease forwards 0.7s",
            }}
          >
            [ Rendering UI ]
          </span>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "8px",
              letterSpacing: "0.2em",
              color: s3Done ? "#333" : "#2a2a2a",
              textTransform: "uppercase",
              opacity: 0,
              animation: "preloaderFadeIn 0.3s ease forwards 0.9s",
            }}
          >
            [ Ready ]
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "9px",
              letterSpacing: "0.25em",
              color: "#333",
              textTransform: "uppercase",
            }}
          >
            Initializing
          </span>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              color: "#c8f55a",
              letterSpacing: "0.1em",
            }}
          >
            {progress}%
          </span>
        </div>

        <div style={{ width: "100%", height: "1px", background: "#1a1a1a", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: `${progress}%`,
              background: "#c8f55a",
              boxShadow: "0 0 8px #c8f55a",
              transition: "width 0.05s linear",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes preloaderFadeIn {
          to { opacity: 1; }
        }
        @keyframes preloaderFadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes preloaderScan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes preloaderGlitchA {
          0% { transform: translate(-2px, 1px); }
          50% { transform: translate(2px, -1px); }
          100% { transform: translate(-1px, 2px); }
        }
        @keyframes preloaderGlitchB {
          0% { transform: translate(2px, -1px); }
          50% { transform: translate(-2px, 1px); }
          100% { transform: translate(1px, -2px); }
        }
      `}</style>
    </div>
  );
}