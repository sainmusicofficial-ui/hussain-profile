"use client";

import { useEffect, useState } from "react";

export default function CursorGlow() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () =>
      window.removeEventListener(
        "mousemove",
        moveCursor
      );
  }, []);

  return (
    <div
      className="
      fixed
      pointer-events-none
      z-0
      "
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className="
        w-[150px]
        h-[150px]
        rounded-full
        bg-[#D7FF00]/22
        blur-[90px]
        "
      />
    </div>
  );
}