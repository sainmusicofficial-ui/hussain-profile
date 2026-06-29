"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Clock, Send } from "lucide-react";

const COLORS = {
  void: "#050505",
  surface: "#121214",
  volt: "#D7FF00",
  cyan: "#00F0FF",
  content: "#F4F4F5",
  subtext: "#71717A",
};

const socials = [
  { label: "Dribbble", url: "#" },
  { label: "Behance", url: "https://www.behance.net/hussainkhan018" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/hussain-khan-667b1b227/" },
  { label: "Twitter / X", url: "#" },
  { label: "Instagram", url: "#" },
];

const fieldVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const labelStyle = {
  fontFamily: "monospace",
  fontSize: "11px",
  color: COLORS.subtext,
  letterSpacing: "1px",
  textTransform: "uppercase",
  marginBottom: "8px",
  display: "block",
};

const inputStyle = {
  width: "100%",
  height: "48px",
  background: COLORS.surface,
  border: "1px solid rgba(255,255,255,0.05)",
  borderRadius: "10px",
  padding: "0 16px",
  color: COLORS.content,
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  boxSizing: "border-box",
};

function FormField({ label, children, custom }) {
  return (
    <motion.div
      custom={custom}
      variants={fieldVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <label style={labelStyle}>{label}</label>
      {children}
    </motion.div>
  );
}

function StyledInput(props) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      {...props}
      onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
      style={{
        ...inputStyle,
        borderColor: focused ? "rgba(215,255,0,0.5)" : "rgba(255,255,255,0.05)",
        boxShadow: focused ? "0 0 20px rgba(215,255,0,0.08)" : "none",
      }}
    />
  );
}

function StyledTextarea(props) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      {...props}
      onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
      style={{
        ...inputStyle,
        height: "auto",
        padding: "14px 16px",
        resize: "none",
        fontFamily: "inherit",
        lineHeight: "1.6",
        borderColor: focused ? "rgba(215,255,0,0.5)" : "rgba(255,255,255,0.05)",
        boxShadow: focused ? "0 0 20px rgba(215,255,0,0.08)" : "none",
      }}
    />
  );
}

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    project: "",
    budget: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          projectType: form.project,
          budget: form.budget,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setForm({ name: "", email: "", project: "", budget: "", message: "" });
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      setErrMsg(err.message || "Failed to send. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ background: COLORS.void, minHeight: "100vh", paddingTop: "112px" }}>

      {/* Hero */}
      <section className="contact-hero" style={{ position: "relative", overflow: "hidden", padding: `80px clamp(32px, 4vw, 60px) 120px` }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          style={{
            position: "absolute", top: 0, left: "20%",
            width: "400px", height: "400px",
            background: "rgba(215,255,0,0.05)",
            borderRadius: "50%", filter: "blur(150px)",
            pointerEvents: "none",
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          style={{
            position: "absolute", bottom: 0, right: "20%",
            width: "300px", height: "300px",
            background: "rgba(0,240,255,0.05)",
            borderRadius: "50%", filter: "blur(120px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "1300px" }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "3px", fontSize: "13px", color: COLORS.volt, marginBottom: "24px" }}
          >
            // Contact
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ fontWeight: "800", fontSize: "clamp(48px, 6vw, 96px)", lineHeight: "0.95", marginBottom: "24px", color: COLORS.content }}
          >
            Let's work{" "}
            <motion.span
              animate={{
                textShadow: [
                  "0 0 20px rgba(215,255,0,0.4)",
                  "0 0 50px rgba(215,255,0,0.7)",
                  "0 0 20px rgba(215,255,0,0.4)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ color: COLORS.volt }}
            >
              together
            </motion.span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ fontSize: "18px", color: COLORS.subtext, maxWidth: "520px", lineHeight: "1.7", fontWeight: "300" }}
          >
            Have a project in mind? Let's discuss how we can bring your vision
            to life with strategic design and creative execution.
          </motion.p>
        </div>
      </section>

      <div className="contact-divider" style={{ height: "1px", background: "rgba(255,255,255,0.05)", margin: `0 clamp(20px, 4vw, 60px)` }} />

      {/* Form + Info */}
      <section className="contact-section" style={{ padding: `64px clamp(32px, 4vw, 60px) 128px` }}>
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "80px" }}>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div className="contact-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                <FormField label="Name" custom={0}>
                  <StyledInput
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    required
                  />
                </FormField>
                <FormField label="Email" custom={1}>
                  <StyledInput
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                  />
                </FormField>
              </div>

              <div className="contact-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                <FormField label="Project Type" custom={2}>
                  <StyledInput
                    value={form.project}
                    onChange={(e) => setForm({ ...form, project: e.target.value })}
                    placeholder="e.g. Branding, UI/UX, Website"
                  />
                </FormField>
                <FormField label="Budget Range" custom={3}>
                  <StyledInput
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    placeholder="e.g. $2K - $5K"
                  />
                </FormField>
              </div>

              <FormField label="Message" custom={4}>
                <StyledTextarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project, goals, and timeline..."
                  required
                  rows={6}
                />
              </FormField>

              {/* Error */}
              {errMsg && (
                <p style={{
                  color: "#ff4444", fontSize: "12px", margin: 0,
                  fontFamily: "monospace", letterSpacing: "0.05em",
                }}>
                  ⚠ {errMsg}
                </p>
              )}

              <motion.div
                custom={5}
                variants={fieldVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: "16px 36px",
                    background: COLORS.volt,
                    color: COLORS.void,
                    fontWeight: "700",
                    fontSize: "15px",
                    borderRadius: "100px",
                    border: "none",
                    cursor: sending ? "default" : "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    opacity: sending ? 0.7 : 1,
                  }}
                >
                  {sending ? (
                    <>
                      <span style={{
                        width: "16px", height: "16px", borderRadius: "50%",
                        border: "2px solid rgba(5,5,5,0.3)",
                        borderTopColor: COLORS.void,
                        display: "inline-block",
                        animation: "contact-spin 0.8s linear infinite",
                      }} />
                      Sending...
                    </>
                  ) : sent ? (
                    <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                      Sent ✓
                    </motion.span>
                  ) : (
                    <>
                      Send Message
                      <motion.span
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                        style={{ display: "flex" }}
                      >
                        <Send size={16} />
                      </motion.span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ display: "flex", flexDirection: "column", gap: "40px" }}
          >
            {/* Availability */}
            <motion.div
              whileHover={{ y: -2, borderColor: "rgba(215,255,0,0.15)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.02)",
                backdropFilter: "blur(12px)",
                padding: "24px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <motion.span
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ width: "12px", height: "12px", borderRadius: "50%", background: COLORS.volt, boxShadow: `0 0 12px ${COLORS.volt}` }}
                />
                <span style={{ fontFamily: "monospace", fontSize: "13px", color: COLORS.volt }}>
                  Available for new projects
                </span>
              </div>
              <p style={{ fontSize: "14px", color: COLORS.subtext, lineHeight: "1.7", margin: 0 }}>
                Currently accepting new clients for Q3 2026. Typical response time is within 24 hours.
              </p>
            </motion.div>

            {/* Contact Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {[
                {
                  icon: <Mail size={16} color={COLORS.volt} />,
                  label: "Email",
                  value: (
                    <a href="mailto:hello@hussainkhan.co.in" style={{ fontSize: "14px", color: COLORS.content, textDecoration: "none" }}>
                      hello@hussainkhan.co.in
                    </a>
                  ),
                },
                {
                  icon: <MapPin size={16} color={COLORS.cyan} />,
                  label: "Location",
                  value: <p style={{ fontSize: "14px", color: COLORS.content, margin: 0 }}>Available Worldwide</p>,
                },
                {
                  icon: <Clock size={16} color={COLORS.subtext} />,
                  label: "Response Time",
                  value: <p style={{ fontSize: "14px", color: COLORS.content, margin: 0 }}>Within 24 hours</p>,
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ x: 4 }}
                  style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    style={{
                      width: "40px", height: "40px", borderRadius: "12px",
                      background: "rgba(255,255,255,0.05)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </motion.div>
                  <div>
                    <p style={{ fontFamily: "monospace", fontSize: "11px", color: COLORS.subtext, marginBottom: "4px" }}>
                      {item.label}
                    </p>
                    {item.value}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Socials */}
            <div>
              <p style={{ fontFamily: "monospace", fontSize: "11px", color: COLORS.subtext, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>
                Connect
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {socials.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    whileHover={{ scale: 1.05, y: -2, borderColor: "rgba(215,255,0,0.2)", color: COLORS.volt }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      padding: "10px 18px",
                      borderRadius: "100px",
                      border: "1px solid rgba(255,255,255,0.07)",
                      background: "rgba(255,255,255,0.02)",
                      backdropFilter: "blur(12px)",
                      fontFamily: "monospace",
                      fontSize: "12px",
                      color: COLORS.subtext,
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    {s.label}
                    <ArrowUpRight size={12} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @keyframes contact-spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 1024px) {
          .contact-hero { padding: 64px 40px 100px !important; }
          .contact-section { padding: 56px 40px 112px !important; }
          .contact-divider { margin: 0 40px !important; }
          .contact-grid { gap: 56px !important; }
        }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .contact-hero { padding: 56px 32px 80px !important; }
          .contact-section { padding: 48px 32px 96px !important; }
          .contact-divider { margin: 0 32px !important; }
        }
        @media (max-width: 640px) {
          .contact-hero { padding: 40px 20px 56px !important; }
          .contact-section { padding: 32px 20px 72px !important; }
          .contact-form-row { grid-template-columns: 1fr !important; gap: 20px !important; }
          .contact-grid { gap: 40px !important; }
          .contact-divider { margin: 0 20px !important; }
        }
      `}</style>
    </div>
  );
}