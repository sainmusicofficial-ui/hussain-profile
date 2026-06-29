"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// ─── Responsive Hook ───────────────────────────────────────────────────────────
function useBreakpoint() {
  const [bp, setBp] = useState("desktop");
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      if (w < 640) setBp("mobile");
      else if (w <= 1024) setBp("tablet");
      else setBp("desktop");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return bp;
}

// ─── Scroll Fade Wrapper ──────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, direction = "up", once = true }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 28 : direction === "down" ? -28 : 0,
      x: direction === "left" ? -28 : direction === "right" ? 28 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.7, delay: delay / 1000, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Glass Card ───────────────────────────────────────────────────────────────
function Card({ children, delay = 0, style = {}, glow = null }) {
  return (
    <FadeIn delay={delay}>
      <div
        style={{
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.02)",
          backdropFilter: "blur(12px)",
          overflow: "hidden",
          boxShadow: glow === "cyan"
            ? "0 0 40px rgba(0,240,255,0.06)"
            : glow === "volt"
            ? "0 0 40px rgba(215,255,0,0.06)"
            : "none",
          ...style,
        }}
      >
        {children}
      </div>
    </FadeIn>
  );
}

// ─── Terminal ─────────────────────────────────────────────────────────────────
function TerminalExperiment() {
  const lines = [
    { prompt: "$ ", text: "hussain init creative-engine", color: "#ffffff" },
    { prompt: "", text: "⚡ Initializing design system...", color: "#666666" },
    { prompt: "", text: "✓ Brand tokens loaded", color: "#D7FF00" },
    { prompt: "", text: "✓ Typography system active", color: "#D7FF00" },
    { prompt: "", text: "✓ Motion library connected", color: "#D7FF00" },
    { prompt: "", text: "✓ Grid framework initialized", color: "#D7FF00" },
    { prompt: "", text: "", color: "" },
    { prompt: "", text: "🚀 Creative engine ready.", color: "#00F0FF" },
    { prompt: "$ ", text: "█", color: "#ffffff" },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} style={{ padding: "28px", fontFamily: "monospace", fontSize: "13px", lineHeight: "1.8" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "20px" }}>
        <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(255,100,100,0.6)" }} />
        <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(255,200,100,0.6)" }} />
        <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(100,200,100,0.6)" }} />
        <span style={{ fontSize: "10px", color: "#444444", marginLeft: "8px" }}>terminal</span>
      </div>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: i * 0.15, duration: 0.4 }}
          style={{ color: line.color, wordBreak: "break-word" }}
        >
          {line.prompt && <span style={{ color: "#00F0FF" }}>{line.prompt}</span>}
          {line.text}
        </motion.div>
      ))}
    </div>
  );
}

// ─── Spring Button Demo ───────────────────────────────────────────────────────
function SpringPhysicsDemo() {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ padding: "40px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "24px" }}>
      <p style={{ fontFamily: "monospace", fontSize: "11px", color: "#555555" }}>Hover / Tap the button</p>
      <motion.button
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onTapStart={() => setHovered(true)}
        onTap={() => setHovered(false)}
        animate={{
          scale: hovered ? 1.1 : 1,
          backgroundColor: hovered ? "#D7FF00" : "#0a0a0a",
          color: hovered ? "#050505" : "#ffffff",
          borderColor: hovered ? "#D7FF00" : "rgba(255,255,255,0.1)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        style={{
          padding: "16px 32px", borderRadius: "100px",
          border: "1px solid rgba(255,255,255,0.1)",
          fontSize: "14px", fontWeight: "700", cursor: "pointer",
        }}
      >
        Spring Physics
      </motion.button>
      <div style={{ fontFamily: "monospace", fontSize: "10px", color: "#444444", textAlign: "center", lineHeight: "1.8" }}>
        stiffness: 400 · damping: 15<br />type: spring
      </div>
    </div>
  );
}

// ─── Typography Showcase ──────────────────────────────────────────────────────
function TypographyShowcase({ isMobile }) {
  const types = [
    { size: isMobile ? "40px" : "56px", weight: "800", label: "Display" },
    { size: isMobile ? "28px" : "36px", weight: "700", label: "Heading" },
    { size: isMobile ? "18px" : "22px", weight: "600", label: "Subhead" },
    { size: "16px", weight: "400", label: "Body" },
    { size: "13px", weight: "400", label: "Caption" },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} style={{ padding: "28px" }}>
      <p style={{ fontFamily: "monospace", fontSize: "11px", color: "#D7FF00", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px" }}>
        Type Scale
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {types.map((t, i) => (
          <motion.div
            key={t.label}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            style={{ display: "flex", alignItems: "baseline", gap: "16px" }}
          >
            <span style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.2)", minWidth: "56px" }}>
              {t.label}
            </span>
            <span style={{ fontSize: t.size, fontWeight: t.weight, lineHeight: "1", color: "#ffffff" }}>
              Aa
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Color System ─────────────────────────────────────────────────────────────
function ColorSystemDemo() {
  const colors = [
    { name: "Void", hex: "#080809" },
    { name: "Surface", hex: "#121214" },
    { name: "Volt", hex: "#D7FF00" },
    { name: "Cyan", hex: "#00F0FF" },
    { name: "Content", hex: "#F4F4F5" },
    { name: "Subtext", hex: "#71717A" },
  ];

  const isDark = (hex) => ["#080809", "#121214", "#71717A"].includes(hex);

  return (
    <div style={{ padding: "28px" }}>
      <p style={{ fontFamily: "monospace", fontSize: "11px", color: "#00F0FF", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>
        Color Tokens
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
        {colors.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.06, y: -3 }}
            style={{
              background: c.hex, borderRadius: "12px", aspectRatio: "1",
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", border: "1px solid rgba(255,255,255,0.05)",
              cursor: "default",
            }}
          >
            <span style={{ fontFamily: "monospace", fontSize: "10px", color: isDark(c.hex) ? "#ffffff" : "#050505" }}>
              {c.name}
            </span>
            <span style={{ fontFamily: "monospace", fontSize: "8px", color: isDark(c.hex) ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }}>
              {c.hex}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Hover Reveal Cards ───────────────────────────────────────────────────────
function HoverRevealCards() {
  const items = ["Brand", "Product", "Motion", "Strategy"];

  return (
    <div style={{ padding: "28px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
      {items.map((item) => (
        <motion.div
          key={item}
          whileHover={{ scale: 1.05, y: -4, borderColor: "rgba(215,255,0,0.2)", backgroundColor: "rgba(215,255,0,0.04)" }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          style={{
            background: "rgba(255,255,255,0.02)", borderRadius: "12px",
            padding: "20px", display: "flex", alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(255,255,255,0.05)", cursor: "pointer",
          }}
        >
          <motion.span
            whileHover={{ color: "#D7FF00" }}
            style={{ fontSize: "14px", fontWeight: "700", color: "#ffffff" }}
          >
            {item}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Component Preview ────────────────────────────────────────────────────────
function ComponentPreview() {
  return (
    <div style={{ padding: "28px" }}>
      <p style={{ fontFamily: "monospace", fontSize: "11px", color: "#D7FF00", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px" }}>
        UI Components
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {["Primary", "Secondary", "Ghost"].map((label, i) => (
            <motion.div
              key={label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "8px 16px",
                background: i === 0 ? "#D7FF00" : i === 1 ? "transparent" : "rgba(255,255,255,0.05)",
                color: i === 0 ? "#050505" : "#ffffff",
                fontSize: "12px", fontWeight: "700", borderRadius: "100px",
                border: i === 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
                cursor: "pointer",
              }}
            >
              {label}
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "100px", overflow: "hidden" }}>
          <motion.div
            initial={{ width: "0%" }}
            whileInView={{ width: "72%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            style={{ height: "100%", background: "linear-gradient(90deg, #D7FF00, #00F0FF)", borderRadius: "100px" }}
          />
        </div>

        {/* Avatar */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, rgba(215,255,0,0.2), rgba(0,240,255,0.2))" }} />
          <div>
            <div style={{ fontSize: "12px", fontWeight: "700", color: "#ffffff" }}>Hussain Khan</div>
            <div style={{ fontSize: "10px", color: "#555555" }}>Designer</div>
          </div>
        </div>

        {/* Skeleton */}
        <div style={{ display: "flex", gap: "4px" }}>
          {[1,2,3,4,5].map((s) => (
            <div key={s} style={{ flex: 1, height: "32px", background: "rgba(255,255,255,0.02)", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.05)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Code Snippet ─────────────────────────────────────────────────────────────
function CodeSnippet() {
  return (
    <div style={{ padding: "28px" }}>
      <p style={{ fontFamily: "monospace", fontSize: "11px", color: "#D7FF00", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>
        Motion Config
      </p>
      <pre style={{ fontFamily: "monospace", fontSize: "12px", lineHeight: "1.8", color: "rgba(255,255,255,0.5)", margin: 0, overflowX: "auto" }}>
{`const spring = {
  type: "spring",
  stiffness: 400,
  damping: 30,
  mass: 0.8,
};

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};`}
      </pre>
    </div>
  );
}

// ─── Interaction Playground ───────────────────────────────────────────────────
function DraggableBall({ isMobile }) {
  const range = isMobile ? 40 : 80;
  return (
    <motion.div
      drag
      dragConstraints={{ left: -range, right: range, top: -range, bottom: range }}
      dragElastic={0.3}
      whileDrag={{ scale: 1.2 }}
      whileHover={{ scale: 1.1 }}
      style={{
        width: isMobile ? "52px" : "64px", height: isMobile ? "52px" : "64px", borderRadius: "50%",
        background: "linear-gradient(135deg, #D7FF00, #00F0FF)",
        cursor: "grab", display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: "20px",
        boxShadow: "0 0 30px rgba(215,255,0,0.3)",
      }}
    >
      ✦
    </motion.div>
  );
}

function MagneticButton({ children, color = "#D7FF00", isMobile }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.3);
    y.set((e.clientY - cy) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX, y: springY,
        padding: "14px 28px", borderRadius: "100px",
        border: `1px solid ${color}30`,
        background: `${color}10`, color: color,
        fontSize: "13px", fontWeight: "700",
        cursor: "pointer", fontFamily: "inherit",
      }}
      whileHover={{ backgroundColor: color, color: "#050505", borderColor: color }}
      whileTap={{ scale: 0.95, backgroundColor: color, color: "#050505", borderColor: color }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.button>
  );
}

function InteractionPlayground({ bp }) {
  const [count, setCount] = useState(0);
  const [tabs, setTabs] = useState(0);
  const tabLabels = ["Design", "Build", "Ship"];
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  return (
    <div style={{ padding: isMobile ? "60px 24px 80px" : isTablet ? "60px 40px 100px" : `60px clamp(32px, 4vw, 60px) 120px` }}>
      <FadeIn>
        <p style={{ fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "3px", fontSize: "13px", color: "#D7FF00", marginBottom: "16px" }}>
          // INTERACTION
        </p>
        <h2 style={{ fontWeight: "800", fontSize: isMobile ? "32px" : "clamp(36px, 3.5vw, 52px)", lineHeight: "1.05", color: "#ffffff", marginBottom: isMobile ? "32px" : "60px" }}>
          Play with it
        </h2>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)", gap: "16px" }}>

        {/* Drag Demo */}
        <Card delay={0} style={{ padding: isMobile ? "32px 24px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px", minHeight: "220px" }}>
          <p style={{ fontFamily: "monospace", fontSize: "11px", color: "#555555" }}>Drag me around</p>
          <DraggableBall isMobile={isMobile} />
          <p style={{ fontFamily: "monospace", fontSize: "10px", color: "#333333", textAlign: "center" }}>drag · elastic · constrained</p>
        </Card>

        {/* Magnetic Buttons */}
        <Card delay={100} style={{ padding: isMobile ? "32px 24px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", minHeight: "220px" }}>
          <p style={{ fontFamily: "monospace", fontSize: "11px", color: "#555555", marginBottom: "8px" }}>Magnetic buttons</p>
          <MagneticButton color="#D7FF00" isMobile={isMobile}>Volt</MagneticButton>
          <MagneticButton color="#00F0FF" isMobile={isMobile}>Cyan</MagneticButton>
        </Card>

        {/* Counter */}
        <Card delay={200} style={{ padding: isMobile ? "32px 24px" : "40px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px", minHeight: "220px" }}>
          <p style={{ fontFamily: "monospace", fontSize: "11px", color: "#555555" }}>Animated counter</p>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={count}
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              style={{ fontSize: isMobile ? "48px" : "64px", fontWeight: "800", color: "#D7FF00", lineHeight: "1", display: "block" }}
            >
              {count}
            </motion.span>
          </AnimatePresence>
          <div style={{ display: "flex", gap: "8px" }}>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setCount(c => c - 1)}
              style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", fontSize: "18px", cursor: "pointer" }}
            >−</motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setCount(c => c + 1)}
              style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#D7FF00", border: "none", color: "#050505", fontSize: "18px", cursor: "pointer", fontWeight: "700" }}
            >+</motion.button>
          </div>
        </Card>

        {/* Animated Tabs */}
        <div style={{ gridColumn: isMobile ? "1 / -1" : isTablet ? "1 / -1" : "span 3" }}>
          <Card delay={300}>
            <div style={{ padding: isMobile ? "24px" : "32px" }}>
              <p style={{ fontFamily: "monospace", fontSize: "11px", color: "#555555", marginBottom: "20px" }}>Animated tabs</p>
              <div style={{ display: "flex", gap: "4px", background: "rgba(255,255,255,0.03)", padding: "4px", borderRadius: "100px", width: isMobile ? "100%" : "fit-content", marginBottom: "24px", overflowX: "auto" }}>
                {tabLabels.map((tab, i) => (
                  <button
                    key={tab}
                    onClick={() => setTabs(i)}
                    style={{ position: "relative", padding: isMobile ? "8px 16px" : "8px 24px", borderRadius: "100px", border: "none", background: "transparent", color: tabs === i ? "#050505" : "#555555", fontSize: "13px", fontWeight: "600", cursor: "pointer", zIndex: 1, transition: "color 0.2s ease", flex: isMobile ? 1 : "none", whiteSpace: "nowrap" }}
                  >
                    {tabs === i && (
                      <motion.div
                        layoutId="tabBg"
                        style={{ position: "absolute", inset: 0, background: "#D7FF00", borderRadius: "100px", zIndex: -1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    {tab}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={tabs}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  style={{ fontSize: isMobile ? "14px" : "15px", color: "#666666", lineHeight: "1.7" }}
                >
                  {tabs === 0 && "Every project starts with a deep understanding of the brand, audience, and goals — strategy before aesthetics."}
                  {tabs === 1 && "From wireframes to high-fidelity UI, built with modern tools, real design systems, and pixel-perfect execution."}
                  {tabs === 2 && "Launch-ready assets, handoff documentation, and support to make sure everything goes live exactly as designed."}
                </motion.p>
              </AnimatePresence>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}

// ─── Creative Playground ──────────────────────────────────────────────────────
function CreativePlayground({ bp }) {
  const [logo, setLogo] = useState("HK.");
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  const logos = ["HK.", "HK_", "HK//", "H.K", "HK°", "HK+"];

  const prompts = [
    "Design a luxury biryani brand",
    "Create a fintech mobile app",
    "Build a premium coffee identity",
    "Design a fitness startup website",
    "Create a healthcare dashboard",
    "Build a modern travel brand",
  ];

  const [prompt, setPrompt] = useState(prompts[0]);

  const generatePrompt = () => {
    setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
  };

  const generateLogo = () => {
    setLogo(logos[Math.floor(Math.random() * logos.length)]);
  };

  return (
    <div style={{ padding: isMobile ? "60px 24px" : isTablet ? "80px 40px" : `100px clamp(32px, 4vw, 60px)` }}>

      <FadeIn>
        <p style={{ fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "3px", fontSize: "13px", color: "#D7FF00", marginBottom: "16px" }}>
          // CREATIVE PLAYGROUND
        </p>
        <h2 style={{ fontWeight: "800", fontSize: isMobile ? "32px" : "clamp(36px,4vw,60px)", color: "#ffffff", marginBottom: isMobile ? "32px" : "60px" }}>
          Play with ideas.
        </h2>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: isMobile || isTablet ? "1fr" : "repeat(2,1fr)", gap: "16px" }}>

        {/* LOGO SHUFFLE */}
        <Card>
          <div style={{ padding: isMobile ? "32px 24px" : "50px", textAlign: "center" }}>
            <p style={{ color: "#666", marginBottom: "20px", fontSize: "12px" }}>
              Logo Generator
            </p>

            <motion.div
              key={logo}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ fontSize: isMobile ? "56px" : "80px", fontWeight: "800", color: "#D7FF00" }}
            >
              {logo}
            </motion.div>

            <button
              onClick={generateLogo}
              style={{
                marginTop: "24px",
                padding: "12px 24px",
                borderRadius: "999px",
                border: "none",
                background: "#D7FF00",
                color: "#050505",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Generate Logo
            </button>
          </div>
        </Card>

        {/* DESIGN BRIEF */}
        <Card>
          <div style={{ padding: isMobile ? "32px 24px" : "50px" }}>
            <p style={{ color: "#666", marginBottom: "20px", fontSize: "12px" }}>
              Design Challenge
            </p>

            <h3 style={{ color: "#fff", fontSize: isMobile ? "20px" : "28px", lineHeight: "1.4", marginBottom: "30px" }}>
              {prompt}
            </h3>

            <button
              onClick={generatePrompt}
              style={{
                padding: "12px 24px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,.1)",
                background: "transparent",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Generate Brief
            </button>
          </div>
        </Card>

      </div>
    </div>
  );
}

// ─── Mood Mixer ────────────────────────────────────────────────────────────────
function MoodMixer({ bp }) {
  const [chaos, setChaos] = useState(50);
  const [energy, setEnergy] = useState(50);
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  const moodNames = {
    lowlow: "Quiet Static",
    lowhigh: "Electric Calm",
    highlow: "Slow Burn",
    highhigh: "Controlled Chaos",
  };

  const moodKey = `${chaos > 50 ? "high" : "low"}${energy > 50 ? "high" : "low"}`;

  const hue1 = 70 + chaos * 1.8;
  const hue2 = 180 + energy * 0.6;
  const blur = 40 + chaos * 0.6;
  const scale = 0.8 + energy / 100;
  const speed = Math.max(1.5, 6 - energy / 20);

  return (
    <div style={{ padding: isMobile ? "60px 24px" : isTablet ? "80px 40px" : `100px clamp(32px, 4vw, 60px)` }}>
      <FadeIn>
        <p style={{ fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "3px", fontSize: "13px", color: "#00F0FF", marginBottom: "16px" }}>
          // MOOD MIXER
        </p>
        <h2 style={{ fontWeight: "800", fontSize: isMobile ? "32px" : "clamp(36px, 4vw, 60px)", color: "#ffffff", marginBottom: isMobile ? "32px" : "60px" }}>
          Mix a mood.
        </h2>
      </FadeIn>

      <Card glow="cyan">
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", minHeight: isMobile ? "auto" : "360px" }}>
          {/* Blob preview */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", minHeight: isMobile ? "260px" : "auto" }}>
            <motion.div
              animate={{
                background: `radial-gradient(circle at 50% 50%, hsl(${hue1}, 100%, 60%), hsl(${hue2}, 100%, 55%))`,
                scale,
                rotate: [0, 360],
              }}
              transition={{
                background: { duration: 0.6, ease: "easeOut" },
                scale: { duration: 0.6, ease: "easeOut" },
                rotate: { duration: speed * 6, repeat: Infinity, ease: "linear" },
              }}
              style={{
                width: isMobile ? "160px" : "220px",
                height: isMobile ? "160px" : "220px",
                borderRadius: "42% 58% 65% 35% / 45% 40% 60% 55%",
                filter: `blur(${blur * 0.3}px)`,
                boxShadow: `0 0 ${blur}px hsla(${hue1},100%,60%,0.35)`,
              }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={moodKey}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "absolute",
                  bottom: "32px",
                  fontFamily: "monospace",
                  fontSize: "12px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.6)",
                  background: "rgba(0,0,0,0.4)",
                  backdropFilter: "blur(8px)",
                  padding: "8px 18px",
                  borderRadius: "100px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  whiteSpace: "nowrap",
                }}
              >
                {moodNames[moodKey]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div style={{ padding: isMobile ? "32px 24px" : "48px", display: "flex", flexDirection: "column", justifyContent: "center", gap: isMobile ? "28px" : "40px", borderLeft: isMobile ? "none" : "1px solid rgba(255,255,255,0.05)", borderTop: isMobile ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontFamily: "monospace", fontSize: "11px", color: "#555555" }}>
                <span>CHAOS</span>
                <span style={{ color: "#D7FF00" }}>{chaos}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={chaos}
                onChange={(e) => setChaos(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#D7FF00", cursor: "pointer" }}
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontFamily: "monospace", fontSize: "11px", color: "#555555" }}>
                <span>ENERGY</span>
                <span style={{ color: "#00F0FF" }}>{energy}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={energy}
                onChange={(e) => setEnergy(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#00F0FF", cursor: "pointer" }}
              />
            </div>

            <p style={{ fontFamily: "monospace", fontSize: "10px", color: "#333333", lineHeight: "1.8" }}>
              hue, blur, spin speed and scale all respond live —<br />
              find the combo that feels like your brand.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Lab() {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  return (
    <div style={{ background: "#050505", minHeight: "100vh" }}>

      {/* Hero */}
      <section style={{ position: "relative", overflow: "hidden", padding: isMobile ? "100px 24px 60px" : isTablet ? "140px 40px 80px" : `180px clamp(32px, 4vw, 60px) 120px` }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{
            position: "absolute", top: 0, right: "33%",
            width: "400px", height: "400px",
            background: "rgba(0,240,255,0.05)",
            borderRadius: "50%", filter: "blur(150px)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1300px" }}>
          <FadeIn delay={0}>
            <p style={{ fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "3px", fontSize: "13px", color: "#00F0FF", marginBottom: "24px" }}>
              // PLAYGROUND
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <h1 style={{ fontWeight: "800", fontSize: isMobile ? "clamp(36px, 10vw, 44px)" : isTablet ? "64px" : "clamp(60px, 6vw, 100px)", lineHeight: "0.95", marginBottom: "24px" }}>
              Creative{" "}
              <motion.span
                animate={{ textShadow: ["0 0 20px rgba(0,240,255,0.4)", "0 0 60px rgba(0,240,255,0.8)", "0 0 20px rgba(0,240,255,0.4)"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ color: "#00F0FF" }}
              >
                Lab
              </motion.span>
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p style={{ fontSize: isMobile ? "16px" : "20px", color: "#777777", maxWidth: "520px", lineHeight: "1.7", fontWeight: "300" }}>
              Experiments in motion, typography, interaction, and design systems.
              This is where ideas are tested and boundaries are pushed.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", margin: isMobile ? "0 24px" : isTablet ? "0 40px" : `0 clamp(32px, 4vw, 60px)` }} />

      {/* Bento Grid */}
      <section style={{ padding: isMobile ? "40px 24px 20px" : isTablet ? "50px 40px 20px" : `60px clamp(32px, 4vw, 60px) 40px` }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: "16px" }}>

          <div style={{ gridColumn: isMobile ? "1 / -1" : isTablet ? "1 / -1" : "span 2" }}>
            <Card delay={0} glow="cyan">
              <TerminalExperiment />
            </Card>
          </div>

          <Card delay={100}>
            <SpringPhysicsDemo />
          </Card>

          <Card delay={150}>
            <TypographyShowcase isMobile={isMobile} />
          </Card>

          <Card delay={200}>
            <ColorSystemDemo />
          </Card>

          <Card delay={250}>
            <HoverRevealCards />
          </Card>

          <div style={{ gridColumn: isMobile ? "1 / -1" : isTablet ? "1 / -1" : "span 2" }}>
            <Card delay={300}>
              <ComponentPreview />
            </Card>
          </div>

          <Card delay={350}>
            <CodeSnippet />
          </Card>

        </div>
      </section>

      {/* Divider */}
      <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", margin: isMobile ? "0 24px" : isTablet ? "0 40px" : `0 clamp(32px, 4vw, 60px)` }} />

      {/* Interaction Playground */}
      <InteractionPlayground bp={bp} />

      <CreativePlayground bp={bp} />

      <MoodMixer bp={bp} />

    </div>
  );
}