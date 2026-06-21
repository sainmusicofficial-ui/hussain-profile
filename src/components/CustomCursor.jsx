"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    const checkMobile = () => setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    checkMobile();
    if (checkMobile()) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      requestAnimationFrame(animateRing);
    };

    window.addEventListener("mousemove", onMouseMove);
    const raf = requestAnimationFrame(animateRing);

    // Hover detection for interactive elements
    const interactiveSelector = "a, button, input, textarea, select, [role='button'], .cursor-hover";
    const onMouseEnter = () => setHovering(true);
    const onMouseLeave = () => setHovering(false);

    const attachListeners = () => {
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnter);
        el.addEventListener("mouseleave", onMouseLeave);
      });
    };

    attachListeners();

    // Re-attach on DOM changes (for dynamically rendered content like modals)
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      <style jsx global>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>

      {/* Dot — follows instantly */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: "6px", height: "6px",
          borderRadius: "50%",
          background: "#D7FF00",
          pointerEvents: "none",
          zIndex: 99999,
          mixBlendMode: "difference",
          transition: "width 0.2s ease, height 0.2s ease",
        }}
      />

      {/* Ring — follows with delay */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: hovering ? "56px" : "32px",
          height: hovering ? "56px" : "32px",
          borderRadius: "50%",
          border: "1px solid rgba(215,255,0,0.5)",
          background: hovering ? "rgba(215,255,0,0.08)" : "transparent",
          pointerEvents: "none",
          zIndex: 99998,
          transition: "width 0.3s ease, height 0.3s ease, background 0.3s ease",
        }}
      />
    </>
  );
}