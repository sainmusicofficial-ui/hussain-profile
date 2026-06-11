"use client";

const tools = [
  "Figma",
  "Photoshop",
  "Illustrator",
  "Canva",
  "After Effects",

  "HTML5",
  "CSS3",
  "JavaScript",
  "React",
  "Next.js",
  "Tailwind CSS",

  "Framer Motion",
  "Git",
  "GitHub",
  "VS Code",

  "WordPress",
  "Elementor",

  "Vercel",
  "Firebase",

  "ChatGPT",
  "Claude",
];

export default function TechStack() {
  return (
    <section
      style={{
        padding: "140px 80px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "#00E5FF",
            fontSize: "12px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: "600",
            marginBottom: "24px",
          }}
        >
          // TECH STACK
        </p>

        <h2
          style={{
            color: "#fff",
            fontSize: "64px",
            fontWeight: "700",
            letterSpacing: "-0.04em",
            marginBottom: "70px",
          }}
        >
          Tools & Technologies
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "14px",
            maxWidth: "950px",
            margin: "0 auto",
          }}
        >

          {tools.map((tool) => (
            <div
              key={tool}
              style={{
                padding: "14px 24px",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.02)",
                color: "#B8B8B8",
                fontSize: "18px",
                fontFamily: "var(--font-geist-mono)",
                transition: "all 0.3s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#D7FF00";
                e.currentTarget.style.color = "#D7FF00";
                e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(215,255,0,0.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor =
                  "rgba(255,255,255,0.08)";
                e.currentTarget.style.color = "#B8B8B8";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {tool}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}