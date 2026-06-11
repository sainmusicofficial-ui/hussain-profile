"use client";

export default function CTASection() {
  return (
    <section
      style={{
        padding: "140px 60px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-geist-mono)",
          color: "#D7FF00",
          fontSize: "12px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: "24px",
        }}
      >
        Got A Project?
      </p>

      <h2
        style={{
          fontSize: "clamp(64px, 8vw, 120px)",
          lineHeight: "0.95",
          fontWeight: "700",
          letterSpacing: "-0.05em",
          color: "white",
          maxWidth: "1100px",
          margin: 0,
        }}
      >
        Let's build your next{" "}
        <span style={{ color: "#D7FF00" }}>
          big brand
        </span>
      </h2>

      <p
        style={{
          marginTop: "32px",
          maxWidth: "650px",
          color: "#8A8A8A",
          fontSize: "18px",
          lineHeight: "1.8",
        }}
      >
        Whether you're launching a startup, refreshing your identity,
        or building a digital product, let's create something memorable.
      </p>

      <button
        style={{
          marginTop: "48px",
          height: "64px",
          padding: "0 36px",
          borderRadius: "999px",
          border: "none",
          backgroundColor: "#D7FF00",
          color: "#000",
          fontSize: "15px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "all 0.3s ease",
          fontFamily: "var(--font-geist-mono)",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "translateY(-2px)";
          e.target.style.boxShadow =
            "0 0 30px rgba(215,255,0,0.35)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "none";
        }}
      >
        Let's Talk ↗
      </button>
    </section>
  );
}