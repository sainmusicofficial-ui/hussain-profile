"use client";

import Link from "next/link";

export default function Navbar() {

  const navItems = [
                { name: "Work", href: "/work" },
                { name: "About", href: "/about" }, 
                { name: "Services", href: "/services" },
                { name: "Lab", href: "/lab" },
                { name: "Contact", href: "/contact" },
                              ];
                              
  return (
    <header style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 50, backdropFilter: "blur(20px)", backgroundColor: "rgba(0,0,0,0.4)" }}>
      <div style={{ padding: "16px 60px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <Link
  href="/"
  style={{
    color: "white",
    fontSize: "26px",
    fontWeight: "bold",
    letterSpacing: "-0.03em",
    textDecoration: "none",
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.textShadow = "0 0 12px rgba(215,255,0,0.5)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.textShadow = "none";
  }}
>
  HK<span style={{ color: "#D7FF00" }}>.</span>
</Link>

          {/* Right Side */}
          <div style={{ display: "flex", alignItems: "center", gap: "80px" }}>
            <nav>
              <ul
  style={{
    display: "flex",
    alignItems: "center",
    gap: "46px",
    fontSize: "16px",
    color: "#686868",
    letterSpacing: "0.08em",
    listStyle: "none",
    margin: 0,
    padding: 0,
    fontFamily: "var(--font-geist-mono)",
  }}
>

                {navItems.map((item) => (
  <li
    key={item.name}
    style={{
      cursor: "pointer",
      transition: "color 0.3s",
    }}
    onMouseEnter={(e) => (e.target.style.color = "white")}
    onMouseLeave={(e) => (e.target.style.color = "#686868")}
  >
    <Link
      href={item.href}
      style={{
        color: "inherit",
        textDecoration: "none",
      }}
    >
      {item.name}
    </Link>
  </li>
))}
              </ul>
            </nav>

            <button
  style={{
    height: "52px",
    padding: "0 32px",
    borderRadius: "999px",
    backgroundColor: "#D7FF00",
    color: "black",
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    transition: "transform 0.3s",
    fontFamily: "var(--font-geist-mono)",
    letterSpacing: "0.05em",
  }}
              onMouseEnter={e => e.target.style.transform = "scale(1.03)"}
              onMouseLeave={e => e.target.style.transform = "scale(1)"}>
              Let's Talk ↗
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}