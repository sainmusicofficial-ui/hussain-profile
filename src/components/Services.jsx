"use client";

import { useState } from "react";
import { Target, LayoutDashboard, Globe, Rocket, Smartphone } from "lucide-react";

const services = [
  {
    id: "01",
    icon: <Target size={20} />,
    title: "Brand Identity",
    description: "Crafting distinctive visual identities that capture your brand's essence and resonate with your target audience.",
    timeline: "3–6 weeks",
    deliverables: ["Logo System", "Color Palette", "Typography Guide", "Brand Guidelines", "Stationery Design", "Brand Strategy"],
    process: ["Discovery & Research", "Strategy Development", "Visual Exploration", "Design Refinement", "Final Delivery"],
  },
  {
    id: "02",
    icon: <LayoutDashboard size={20} />,
    title: "UI/UX Design",
    description: "Designing intuitive and beautiful interfaces that deliver seamless user experiences across all platforms.",
    timeline: "4–8 weeks",
    deliverables: ["Wireframes", "UI Kit", "Prototypes", "User Flows", "Design System", "Handoff Files"],
    process: ["User Research", "Information Architecture", "Wireframing", "Visual Design", "Prototype & Test"],
  },
  {
    id: "03",
    icon: <Globe size={20} />,
    title: "Website Design",
    description: "Building high-performance websites that combine stunning visuals with conversion-focused design.",
    timeline: "4–8 weeks",
    deliverables: ["Responsive Design", "CMS Integration", "SEO Setup", "Analytics", "Performance Optimization", "Launch Support"],
    process: ["Discovery", "Sitemap & Structure", "Design Mockups", "Development", "Launch"],
  },
  {
    id: "04",
    icon: <Rocket size={20} />,
    title: "Startup MVP Design",
    description: "Rapidly designing and validating your product concept to get to market faster with confidence.",
    timeline: "2–4 weeks",
    deliverables: ["MVP Scope", "UI Design", "Clickable Prototype", "User Testing", "Iteration", "Dev Handoff"],
    process: ["Problem Definition", "Feature Scoping", "Rapid Prototyping", "User Validation", "Refinement"],
  },
  {
    id: "05",
    icon: <Smartphone size={20} />,
    title: "Mobile App Design",
    description: "Creating engaging mobile experiences that users love, optimized for iOS and Android platforms.",
    timeline: "6–10 weeks",
    deliverables: ["App UI Design", "Onboarding Flow", "Design System", "Prototypes", "App Store Assets", "Dev Handoff"],
    process: ["Research & Strategy", "UX Architecture", "UI Design", "Prototyping", "Testing & Launch"],
  },
];

export default function Services() {
  const [openId, setOpenId] = useState(null);
  const [hovered, setHovered] = useState(null);

  return (
    <section style={{ backgroundColor: "#0a0a0a", padding: "120px 80px" }}>

      {/* Header */}
      <p style={{ color: "#00e5ff", fontSize: "12px", fontWeight: "600", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px" }}>
        // What I Do
      </p>
      <h2 style={{ color: "white", fontSize: "64px", fontWeight: "650", letterSpacing: "-0.03em", marginBottom: "80px" }}>
        Services
      </h2>

      {/* List */}
      <div>
        {services.map((service) => {
          const isOpen = openId === service.id;
          return (
            <div
  key={service.id}
  style={{
    borderTop: "1px solid #1f1f1f",
    cursor: "pointer"
  }}
  onClick={() => setOpenId(isOpen ? null : service.id)}
  onMouseEnter={() => setHovered(service.id)}
  onMouseLeave={() => setHovered(null)}
>
              {/* Row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "24px",
                  padding: "32px 0",
                  transition: "all 0.3s",
                }}
              >
                {/* Number */}
                <span style={{ color: "#333", fontSize: "12px", fontWeight: "500", minWidth: "24px" }}>
                  {service.id}
                </span>

                {/* Icon */}
                <span
  style={{
    color:
      isOpen || hovered === service.id
        ? "#D7FF00"
        : "#444",
    transition: "color 0.3s"
  }}
>
                  {service.icon}
                </span>

                {/* Title */}
                <span
                  style={{
                    color:
  isOpen || hovered === service.id
    ? "#D7FF00"
    : "white",
                    fontSize: "28px",
                    fontWeight: "700",
                    letterSpacing: "-0.02em",
                    flex: 1,
                    transition: "color 0.3s",
                  }}
                >
                  {service.title}
                </span>

                {/* Arrow */}
                <span style={{ color:
  isOpen || hovered === service.id
    ? "#D7FF00"
    : "#444", fontSize: "20px", transition: "all 0.3s", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}>
                  ↗
                </span>
              </div>

              {/* Expanded Content */}
              {isOpen && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "60px", paddingBottom: "48px", paddingLeft: "48px" }}>

                  {/* Title + Description */}
                  <div>
                    <h3 style={{ color: "white", fontSize: "22px", fontWeight: "700", marginBottom: "12px" }}>
                      {service.title}
                    </h3>
                    <p style={{ color: "#888", fontSize: "14px", lineHeight: "1.7" }}>
                      {service.description}
                    </p>
                  </div>

                  {/* Deliverables */}
                  <div>
                    <p style={{ color: "#D7FF00", fontSize: "11px", fontWeight: "600", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "20px" }}>
                      Deliverables
                    </p>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                      {service.deliverables.map((item, i) => (
                        <li key={i} style={{ color: "#ccc", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ color: "#D7FF00", fontSize: "16px" }}>•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Process + Timeline */}
                  <div>
                    <p style={{ color: "#00e5ff", fontSize: "11px", fontWeight: "600", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "20px" }}>
                      Process
                    </p>
                    <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", marginBottom: "40px" }}>
                      {service.process.map((step, i) => (
                        <li key={i} style={{ color: "#ccc", fontSize: "14px", display: "flex", alignItems: "center", gap: "12px" }}>
                          <span style={{ color: "#444", fontSize: "12px", minWidth: "20px" }}>0{i + 1}</span> {step}
                        </li>
                      ))}
                    </ol>

                    <p style={{ color: "#555", fontSize: "11px", fontWeight: "600", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}>
                      Timeline
                    </p>
                    <p style={{ color: "white", fontSize: "22px", fontWeight: "700", marginBottom: "24px" }}>
                      {service.timeline}
                    </p>
                    <button
                      style={{
                        height: "48px", padding: "0 28px", borderRadius: "999px",
                        backgroundColor: "#D7FF00", color: "black", fontSize: "14px",
                        fontWeight: "600", border: "none", cursor: "pointer",
                        display: "flex", alignItems: "center", gap: "8px",
                      }}
                    >
                      Get Started ↗
                    </button>
                  </div>

                </div>
              )}
            </div>
          );
        })}

        {/* Bottom border */}
        <div style={{ borderTop: "1px solid #1f1f1f" }} />
      </div>

       
      <div style={{ marginTop: "60px" }}>
  <button
  style={{
    height: "60px",
    padding: "0 36px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "white",
    background: "transparent",
    transition: "all 0.3s",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = "#D7FF00";
    e.currentTarget.style.color = "#000";
    e.currentTarget.style.boxShadow =
      "0 0 40px rgba(215,255,0,0.6)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "transparent";
    e.currentTarget.style.color = "#fff";
    e.currentTarget.style.boxShadow = "none";
  }}
>
  Explore All Services ↗
</button>

<div
  style={{
    marginTop: "140px",
    paddingTop: "80px",
    borderTop: "1px solid rgba(255,255,255,0.1)",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "40px",
  }}
>
  
  <div>
    <h3 className="text-white text-[72px] font-bold leading-none">
      50+
    </h3>
    <p className="text-[#6f6f6f] text-[15px] tracking-[0.08em] mt-3">
      Projects Completed
    </p>
  </div>

  <div>
    <h3 className="text-white text-[72px] font-bold leading-none">
      30+
    </h3>
    <p className="text-[#6f6f6f] text-[15px] tracking-[0.08em] mt-3">
      Happy Clients
    </p>
  </div>

  <div>
    <h3 className="text-white text-[72px] font-bold leading-none">
      4+
    </h3>
    <p className="text-[#6f6f6f] text-[15px] tracking-[0.08em] mt-3">
      Years Experience
    </p>
  </div>

  <div>
    <h3 className="text-white text-[72px] font-bold leading-none">
      100%
    </h3>
    <p className="text-[#6f6f6f] text-[15px] tracking-[0.08em] mt-3">
      Client Satisfaction
    </p>
  </div>
</div>

</div>


    </section>
  );
}