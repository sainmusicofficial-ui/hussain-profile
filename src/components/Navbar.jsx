"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isMobile,  setIsMobile]  = useState(false);
  const [status,    setStatus]    = useState("idle");
  const [errMsg,    setErrMsg]    = useState("");
  const [form, setForm] = useState({
    name: "", email: "", projectType: "", budget: "", message: "",
  });

  const navItems = [
    { name: "Work",     href: "/work"     },
    { name: "About",    href: "/about"    },
    { name: "Services", href: "/services" },
    { name: "Lab",      href: "/lab"      },
    { name: "Contact",  href: "/contact"  },
  ];

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (menuOpen || modalOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, modalOpen]);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit() {
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      setErrMsg("Please fill in Name, Email, and Message.");
      return;
    }
    setStatus("sending");
    setErrMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      setForm({ name: "", email: "", projectType: "", budget: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrMsg(err.message || "Failed to send. Please try again.");
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "16px 18px",
    background: "#111111",
    border: "1px solid #222222",
    borderRadius: "10px",
    color: "#ffffff",
    fontSize: "15px",
    fontFamily: "var(--font-geist-mono, monospace)",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block",
    fontSize: "11px",
    letterSpacing: "0.12em",
    color: "#555555",
    fontFamily: "var(--font-geist-mono, monospace)",
    marginBottom: "8px",
    textTransform: "uppercase",
  };

  return (
    <>
      {/* ── HEADER ─────────────────────────────────────────────── */}
      <header style={{
        position: "fixed", top: 0, left: 0, width: "100%", zIndex: 50,
        backdropFilter: "blur(20px)",
        backgroundColor: "rgba(0,0,0,0.4)",
      }}>
        <div style={{ padding: isMobile ? "16px 24px" : "16px 60px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

            <Link href="/" style={{
              color: "white", fontSize: "26px", fontWeight: "bold",
              letterSpacing: "-0.03em", textDecoration: "none",
            }}
              onMouseEnter={(e) => e.currentTarget.style.textShadow = "0 0 12px rgba(215,255,0,0.5)"}
              onMouseLeave={(e) => e.currentTarget.style.textShadow = "none"}
            >
              HK<span style={{ color: "#D7FF00" }}>.</span>
            </Link>

            {!isMobile && (
              <div style={{ display: "flex", alignItems: "center", gap: "80px" }}>
                <nav>
                  <ul style={{
                    display: "flex", alignItems: "center", gap: "46px",
                    fontSize: "16px", color: "#686868", letterSpacing: "0.08em",
                    listStyle: "none", margin: 0, padding: 0,
                    fontFamily: "var(--font-geist-mono)",
                  }}>
                    {navItems.map((item) => (
                      <li key={item.name}
                        style={{ cursor: "pointer", transition: "color 0.3s" }}
                        onMouseEnter={(e) => e.currentTarget.style.color = "white"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "#686868"}
                      >
                        <Link href={item.href} style={{ color: "inherit", textDecoration: "none" }}>
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <button
                  onClick={() => setModalOpen(true)}
                  style={{
                    height: "52px", padding: "0 32px", borderRadius: "999px",
                    backgroundColor: "#D7FF00", color: "black", fontSize: "16px",
                    fontWeight: "600", border: "none", cursor: "pointer",
                    transition: "transform 0.3s",
                    fontFamily: "var(--font-geist-mono)", letterSpacing: "0.05em",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                  Let's Talk ↗
                </button>
              </div>
            )}

            {isMobile && (
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: "8px", display: "flex", flexDirection: "column",
                  gap: "5px", zIndex: 60,
                }}
                aria-label="Toggle menu"
              >
                <span style={{
                  display: "block", width: "24px", height: "2px", background: "#ffffff",
                  transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
                  transition: "transform 0.3s ease",
                }} />
                <span style={{
                  display: "block", width: "24px", height: "2px", background: "#ffffff",
                  opacity: menuOpen ? 0 : 1,
                  transition: "opacity 0.3s ease",
                }} />
                <span style={{
                  display: "block", width: "24px", height: "2px", background: "#ffffff",
                  transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
                  transition: "transform 0.3s ease",
                }} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── MOBILE MENU ─────────────────────────────────────────── */}
      {isMobile && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 40,
          background: "rgba(5,5,5,0.97)",
          backdropFilter: "blur(20px)",
          display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "center",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.76,0,0.24,1)",
        }}>
          <nav>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, textAlign: "center" }}>
              {navItems.map((item, i) => (
                <li key={item.name} style={{
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.4s ease ${i * 80 + 100}ms, transform 0.4s ease ${i * 80 + 100}ms`,
                  padding: "16px 0",
                }}>
                  <Link href={item.href} onClick={() => setMenuOpen(false)}
                    style={{
                      color: "#888888", textDecoration: "none",
                      fontSize: "clamp(36px, 8vw, 56px)",
                      fontWeight: "800", letterSpacing: "-0.02em",
                      fontFamily: "var(--font-geist-mono)",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#D7FF00"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "#888888"}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div style={{
            marginTop: "48px",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 0.4s ease ${navItems.length * 80 + 100}ms, transform 0.4s ease ${navItems.length * 80 + 100}ms`,
          }}>
            <button
              onClick={() => { setMenuOpen(false); setModalOpen(true); }}
              style={{
                height: "52px", padding: "0 36px", borderRadius: "999px",
                backgroundColor: "#D7FF00", color: "#050505",
                fontSize: "16px", fontWeight: "700", border: "none", cursor: "pointer",
                fontFamily: "var(--font-geist-mono)", letterSpacing: "0.05em",
              }}
            >
              Let's Talk ↗
            </button>
          </div>

          <p style={{
            position: "absolute", bottom: "40px",
            fontFamily: "monospace", fontSize: "11px",
            color: "#333333", letterSpacing: "3px", textTransform: "uppercase",
            opacity: menuOpen ? 1 : 0,
            transition: "opacity 0.4s ease 600ms",
          }}>
            Hussain Khan — Designer
          </p>
        </div>
      )}

      {/* ── CONTACT MODAL ──────────────────────────────────────── */}
      {modalOpen && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) { setModalOpen(false); setStatus("idle"); } }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(0,0,0,0.80)",
            backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: isMobile ? "0" : "24px",
          }}
        >
          <div style={{
            width: "100%",
            maxWidth: "780px",
            background: "#0a0a0a",
            border: "1px solid #1e1e1e",
            borderRadius: isMobile ? "0" : "20px",
            padding: isMobile ? "40px 24px 48px" : "52px 52px 56px",
            position: "relative",
            maxHeight: isMobile ? "100dvh" : "90dvh",
            overflowY: "auto",
          }}>

            {/* Close */}
            <button
              onClick={() => { setModalOpen(false); setStatus("idle"); }}
              style={{
                position: "absolute", top: "20px", right: "20px",
                background: "#1a1a1a", border: "1px solid #2a2a2a",
                borderRadius: "50%", width: "36px", height: "36px",
                color: "#888", fontSize: "18px", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#D7FF00"; e.currentTarget.style.color = "#000"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#1a1a1a"; e.currentTarget.style.color = "#888"; }}
            >
              ✕
            </button>

            {/* Header */}
            <div style={{ marginBottom: "40px" }}>
              <p style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "11px", letterSpacing: "0.15em",
                color: "#D7FF00", textTransform: "uppercase", marginBottom: "12px",
              }}>
                [ New Project Enquiry ]
              </p>
              <h2 style={{
                fontSize: isMobile ? "28px" : "36px",
                fontWeight: "800", color: "#ffffff",
                letterSpacing: "-0.03em", margin: 0,
              }}>
                Let's build something great.
              </h2>
            </div>

            {/* SUCCESS */}
            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px", color: "#D7FF00" }}>✦</div>
                <p style={{
                  color: "#D7FF00", fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase",
                  marginBottom: "8px",
                }}>Message sent</p>
                <p style={{ color: "#555", fontSize: "14px" }}>I'll get back to you within 24 hours.</p>
                <button
                  onClick={() => { setModalOpen(false); setStatus("idle"); }}
                  style={{
                    marginTop: "32px", padding: "12px 32px", borderRadius: "999px",
                    background: "#D7FF00", color: "#000", fontWeight: "700",
                    fontSize: "14px", border: "none", cursor: "pointer",
                    fontFamily: "var(--font-geist-mono, monospace)",
                  }}
                >Close</button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "20px" }}>
                  <div>
                    <label style={labelStyle}>Name</label>
                    <input name="name" value={form.name} onChange={handleChange}
                      placeholder="Your name" style={inputStyle}
                      onFocus={(e) => e.target.style.borderColor = "#D7FF00"}
                      onBlur={(e) => e.target.style.borderColor = "#222222"}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange}
                      placeholder="your@email.com" style={inputStyle}
                      onFocus={(e) => e.target.style.borderColor = "#D7FF00"}
                      onBlur={(e) => e.target.style.borderColor = "#222222"}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "20px" }}>
                  <div>
                    <label style={labelStyle}>Project Type</label>
                    <input name="projectType" value={form.projectType} onChange={handleChange}
                      placeholder="e.g. Branding, UI/UX, Website" style={inputStyle}
                      onFocus={(e) => e.target.style.borderColor = "#D7FF00"}
                      onBlur={(e) => e.target.style.borderColor = "#222222"}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Budget Range</label>
                    <input name="budget" value={form.budget} onChange={handleChange}
                      placeholder="e.g. $2K – $5K" style={inputStyle}
                      onFocus={(e) => e.target.style.borderColor = "#D7FF00"}
                      onBlur={(e) => e.target.style.borderColor = "#222222"}
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange}
                    placeholder="Tell me about your project, goals, and timeline..."
                    rows={5}
                    style={{ ...inputStyle, resize: "vertical", minHeight: "140px", lineHeight: "1.6" }}
                    onFocus={(e) => e.target.style.borderColor = "#D7FF00"}
                    onBlur={(e) => e.target.style.borderColor = "#222222"}
                  />
                </div>

                {status === "error" && errMsg && (
                  <p style={{
                    color: "#ff4444", fontSize: "12px", margin: 0,
                    fontFamily: "var(--font-geist-mono, monospace)",
                  }}>⚠ {errMsg}</p>
                )}

                <div>
                  <button
                    onClick={handleSubmit}
                    disabled={status === "sending"}
                    style={{
                      height: "52px", padding: "0 36px", borderRadius: "999px",
                      backgroundColor: status === "sending" ? "#a8c800" : "#D7FF00",
                      color: "#000000", fontSize: "15px", fontWeight: "700",
                      border: "none", cursor: status === "sending" ? "not-allowed" : "pointer",
                      transition: "transform 0.2s",
                      fontFamily: "var(--font-geist-mono, monospace)", letterSpacing: "0.05em",
                      display: "inline-flex", alignItems: "center", gap: "8px",
                    }}
                    onMouseEnter={(e) => { if (status !== "sending") e.currentTarget.style.transform = "scale(1.03)"; }}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  >
                    {status === "sending" ? "Sending…" : "Send Message ✦"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}