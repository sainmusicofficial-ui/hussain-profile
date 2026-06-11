"use client";
import { useState, useEffect, useRef } from "react";

// ─── Scroll Animation Hook ───────────────────────────────────────────────────
function useFadeIn(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, ...options }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function FadeIn({ children, delay = 0, direction = "up" }) {
  const [ref, visible] = useFadeIn();

  const translateMap = {
    up: "translateY(32px)",
    left: "translateX(-32px)",
    right: "translateX(32px)",
    none: "none",
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0,0)" : translateMap[direction],
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Timeline Row ─────────────────────────────────────────────────────────────
function TimelineRow({ year, title, desc, isLast }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "180px 1fr",
        alignItems: "center",
        padding: "40px 0",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: isLast ? "1px solid rgba(255,255,255,0.06)" : "none",
        cursor: "default",
      }}
    >
      <span
        style={{
          fontWeight: "800",
          fontSize: "clamp(42px, 4vw, 60px)",
          lineHeight: "1",
          color: hovered ? "#00F0FF" : "rgba(255,255,255,0.15)",
          textShadow: hovered ? "0 0 30px rgba(0,240,255,0.6)" : "none",
          transition: "color 0.3s ease, text-shadow 0.3s ease",
        }}
      >
        {year}
      </span>
      <div>
        <h3 style={{ color: "#ffffff", fontWeight: "700", fontSize: "20px", marginBottom: "8px" }}>
          {title}
        </h3>
        <p style={{ color: "#666666", fontSize: "15px", lineHeight: "1.6", fontWeight: "400" }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

// ─── Philosophy Card ──────────────────────────────────────────────────────────
function PhilosophyCard({ icon, title, desc }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "16px",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.07)"}`,
        background: hovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        padding: "32px 28px",
        cursor: "default",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "10px",
          background: hovered ? "rgba(215,255,0,0.15)" : "rgba(215,255,0,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "28px",
          color: "#D7FF00",
          transition: "background 0.3s ease, box-shadow 0.3s ease",
          boxShadow: hovered ? "0 0 20px rgba(215,255,0,0.35)" : "none",
        }}
      >
        {icon}
      </div>
      <h3 style={{ color: "#ffffff", fontWeight: "700", fontSize: "17px", marginBottom: "12px", lineHeight: "1.2" }}>
        {title}
      </h3>
      <p style={{ color: "#666666", fontSize: "14px", lineHeight: "1.7", fontWeight: "400" }}>
        {desc}
      </p>
    </div>
  );
}

// ─── Skill Tag ────────────────────────────────────────────────────────────────
function SkillTag({ name, color = "#D7FF00" }) {
  const [hovered, setHovered] = useState(false);

  const colorMap = {
    "#D7FF00": "rgba(215,255,0,",
    "#00F0FF": "rgba(0,240,255,",
    "#FF6B6B": "rgba(255,107,107,",
    "#B794F4": "rgba(183,148,244,",
    "#68D391": "rgba(104,211,145,",
    "#F6AD55": "rgba(246,173,85,",
  };
  const base = colorMap[color] || "rgba(215,255,0,";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "12px 20px",
        borderRadius: "100px",
        border: `1px solid ${hovered ? `${base}0.3)` : `${base}0.12)`}`,
        background: hovered ? `${base}0.08)` : `${base}0.03)`,
        cursor: "default",
        transition: "all 0.25s ease",
      }}
    >
      <span
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: color,
          boxShadow: hovered ? `0 0 8px ${color}` : "none",
          transition: "box-shadow 0.25s ease",
          flexShrink: 0,
        }}
      />
      <span style={{ color: hovered ? "#ffffff" : "#999999", fontSize: "14px", fontWeight: "500", transition: "color 0.25s ease" }}>
        {name}
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function About2() {
  return (
    <div>

      {/* SECTION 1 — About Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(0,240,255,.08), transparent 35%), #050505",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
            mixBlendMode: "overlay",
          }}
        />
        <div
          className="relative z-10 max-w-[1300px] mx-auto"
          style={{ paddingTop: "180px", paddingLeft: "70px", paddingBottom: "120px" }}
        >
          <FadeIn delay={0}>
            <p className="font-mono uppercase tracking-[3px] text-[14px] mb-10" style={{ color: "#D7FF00" }}>
              // ABOUT
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <h1 className="font-bold leading-[0.88]" style={{ fontSize: "clamp(60px, 6vw, 100px)" }}>
              I design for brands
              <br />
              that want to{" "}
              <span style={{ color: "#D7FF00", textShadow: "0 0 40px rgba(215,255,0,.7)" }}>
                stand out
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p
              className="mt-10 text-[#7E7E89]"
              style={{ maxWidth: "580px", fontSize: "22px", lineHeight: "1.7", fontWeight: "300" }}
            >
              I'm Hussain Khan — a creative designer, brand strategist, and digital product thinker
              based in the intersection of design and technology. I believe great design isn't just
              aesthetic — it's strategic, intentional, and built to move people.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* SECTION 2 — The Story */}
      <section style={{ background: "#0a0a0a" }}>
        <div style={{ maxWidth: "100%", padding: "100px 60px 120px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start" }}>

            <FadeIn direction="left">
              <div>
                <p style={{ fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "3px", fontSize: "13px", color: "#00F0FF", marginBottom: "16px" }}>
                  // THE STORY
                </p>
                <h2 style={{ fontWeight: "800", fontSize: "clamp(42px, 4.5vw, 64px)", lineHeight: "1.0", marginBottom: "28px", color: "#ffffff" }}>
                  From curiosity to craft
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "18px", color: "#777777", fontSize: "15px", lineHeight: "1.8", fontWeight: "400" }}>
                  <p>My journey into design started with a fascination for how visual language shapes perception. What began as experimenting with Photoshop became a deep obsession with branding, user experience, and the art of digital storytelling.</p>
                  <p>Today, I work at the intersection of brand strategy, UI/UX design, and modern web development. I've helped startups find their visual voice, restaurants build memorable brands, and tech companies create products people love using.</p>
                  <p>Beyond screens, I'm passionate about fitness, content creation, and exploring how creativity can impact every aspect of life. This multidisciplinary mindset fuels everything I design.</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={150}>
              <div>
                <div style={{ borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", padding: "36px 44px" }}>
                  <p style={{ fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "3px", fontSize: "13px", color: "#D7FF00", marginBottom: "12px" }}>
                    // QUICK FACTS
                  </p>
                  <div>
                    {[
                      ["Location", "Available Worldwide"],
                      ["Focus", "Brand & Product Design"],
                      ["Experience", "4+ Years"],
                      ["Projects", "50+ Delivered"],
                      ["Approach", "Strategy → Design → Build"],
                    ].map(([label, value], i, arr) => (
                      <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 0", borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                        <span style={{ fontFamily: "monospace", color: "#555555", fontSize: "14px" }}>{label}</span>
                        <span style={{ color: "#ffffff", fontWeight: "700", fontSize: "16px" }}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* SECTION 3 — Philosophy */}
      <section style={{ background: "#0a0a0a", padding: "100px 60px" }}>
        <FadeIn>
          <p style={{ fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "3px", fontSize: "13px", color: "#D7FF00", marginBottom: "16px" }}>
            // PHILOSOPHY
          </p>
          <h2 style={{ fontWeight: "800", fontSize: "clamp(38px, 4vw, 56px)", lineHeight: "1.05", color: "#ffffff", marginBottom: "60px" }}>
            What I believe in
          </h2>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          {[
            {
              icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>,
              title: "Strategy First",
              desc: "Every design decision is backed by strategic thinking and business goals.",
            },
            {
              icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>,
              title: "Innovation Driven",
              desc: "Pushing boundaries with modern tools, AI workflows, and cutting-edge techniques.",
            },
            {
              icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
              title: "Systematic Design",
              desc: "Building scalable design systems that grow with your brand.",
            },
            {
              icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
              title: "Tech-Savvy Creative",
              desc: "Understanding code means designing with real-world constraints in mind.",
            },
          ].map((card, i) => (
            <FadeIn key={card.title} delay={i * 100}>
              <PhilosophyCard {...card} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* SECTION 4 — Skills & Tools */}
      <section style={{ background: "#0a0a0a", padding: "100px 60px" }}>
        <FadeIn>
          <p style={{ fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "3px", fontSize: "13px", color: "#00F0FF", marginBottom: "16px" }}>
            // TOOLKIT
          </p>
          <h2 style={{ fontWeight: "800", fontSize: "clamp(38px, 4vw, 56px)", lineHeight: "1.05", color: "#ffffff", marginBottom: "16px" }}>
            Skills & Tools
          </h2>
          <p style={{ color: "#666666", fontSize: "16px", lineHeight: "1.7", maxWidth: "520px", marginBottom: "60px" }}>
            The tools and skills I use to bring ideas from concept to reality.
          </p>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>

          {/* Design */}
          <FadeIn delay={0}>
            <div>
              <p style={{ fontFamily: "monospace", fontSize: "12px", color: "#444444", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "16px" }}>
                Design
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {["Figma", "Adobe Illustrator", "Photoshop", "After Effects", "Framer", "Spline"].map((s) => (
                  <SkillTag key={s} name={s} color="#D7FF00" />
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Development */}
          <FadeIn delay={100}>
            <div>
              <p style={{ fontFamily: "monospace", fontSize: "12px", color: "#444444", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "16px" }}>
                Development
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {["React", "Next.js", "Tailwind CSS", "TypeScript", "Framer Motion", "GSAP"].map((s) => (
                  <SkillTag key={s} name={s} color="#00F0FF" />
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Strategy */}
          <FadeIn delay={200}>
            <div>
              <p style={{ fontFamily: "monospace", fontSize: "12px", color: "#444444", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "16px" }}>
                Strategy & Direction
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {["Brand Strategy", "UI/UX Design", "Design Systems", "Creative Direction", "Content Strategy"].map((s) => (
                  <SkillTag key={s} name={s} color="#B794F4" />
                ))}
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* SECTION 5 — Career Timeline */}
      <section style={{ background: "#0a0a0a", padding: "100px 60px" }}>
        <FadeIn>
          <p style={{ fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "3px", fontSize: "13px", color: "#00F0FF", marginBottom: "16px" }}>
            // JOURNEY
          </p>
          <h2 style={{ fontWeight: "800", fontSize: "clamp(38px, 4vw, 56px)", lineHeight: "1.05", color: "#ffffff", marginBottom: "60px" }}>
            Career Timeline
          </h2>
        </FadeIn>

        <div>
          {[
            { year: "2022", title: "Started Freelancing", desc: "Began crafting brand identities and UI designs for local businesses." },
            { year: "2023", title: "First Startup Project", desc: "Designed and shipped the first MVP for a healthcare startup." },
            { year: "2024", title: "Agency Collaborations", desc: "Partnered with creative agencies on enterprise-level branding projects." },
            { year: "2025", title: "Full-Stack Creative", desc: "Expanded into motion design, web development, and creative direction." },
            { year: "2026", title: "Global Clients", desc: "Working with startups and brands worldwide, delivering premium digital experiences." },
          ].map((item, i, arr) => (
            <FadeIn key={item.year} delay={i * 80}>
              <TimelineRow {...item} isLast={i === arr.length - 1} />
            </FadeIn>
          ))}
        </div>
      </section>

    </div>
  );
}