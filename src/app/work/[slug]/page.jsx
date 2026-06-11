"use client";

import { caseStudies } from "@/data/caseStudies";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  ArrowLeft,
  ArrowUpRight,
  Clock,
  Layers,
} from "lucide-react";

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug;

  const project = caseStudies.find((p) => p.slug === slug);

  if (!project) {
    return <div className="text-white p-20">Project not found</div>;
  }

  return (
    <>
      <Navbar />

      <main className="bg-[#0e0e0e] text-white">

        <section
   className="relative overflow-hidden"


  style={{
    background:
      "radial-gradient(circle at 50% 50%, rgba(0,240,255,.08), transparent 35%), #050505",
  }}
>
  {/* Noise / texture */}
  <div
    className="absolute inset-0 opacity-[0.08]"
    style={{
      backgroundImage:
        "url('https://grainy-gradients.vercel.app/noise.svg')",
      mixBlendMode: "overlay",
    }}
  />

  <div
  className="relative z-10 max-w-[1800px] mx-auto"
  style={{
    paddingLeft: "90px",
    paddingRight: "90px",
    paddingTop: "140px",
    paddingBottom: "80px",
  }}
>

    {/* Back */}
    <Link
  href="/work"
  className="
    inline-flex
    items-center
    gap-5
    text-[#7A7A7A]
    text-[15px]
    font-mono
    transition-all
    duration-300
    hover:text-[#D7FF00]
    hover:drop-shadow-[0_0_12px_#D7FF00]
  "
>
  <ArrowLeft
    size={14}
    className="transition-all duration-300"
  />
  Back to Projects
</Link>

    {/* Category */}
    <div className="mt-24">
      <p
  className="font-mono uppercase tracking-[3px] text-[14px]"
  style={{ color: "#D7FF00" }}
>
  {project.category}
</p>
    </div>

    {/* Title */}
    <h1
      className="font-bold leading-[0.88] mt-10"
      style={{
        fontSize: "clamp(90px, 8vw, 145px)",
      }}
    >
      {project.title}
    </h1>

    {/* Subtitle */}
    <p
      className="mt-10 text-[#7E7E89]"
      style={{
        fontSize: "52px",
        lineHeight: "1",
        fontWeight: "300",
      }}
    >
      {project.subtitle}
    </p>

    {/* Meta */}
    <div className="flex items-center gap-12 mt-16">
      <div className="flex items-center gap-3">
        <Clock
          size={18}
          className="text-[#6A6A6A]"
        />
        <span
          className="font-mono text-[#8A8A8A]"
          style={{
            fontSize: "18px",
          }}
        >
          {project.duration}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Layers
          size={18}
          className="text-[#6A6A6A]"
        />
        <span
          className="font-mono text-[#8A8A8A]"
          style={{
            fontSize: "18px",
          }}
        >
          {project.year}
        </span>
      </div>
    </div>
  </div>
</section>

{/* Hero Banner */}
<section
  style={{
    paddingLeft: "60px",
    paddingRight: "60px",
    marginTop: "-20px",
    marginBottom: "120px",
  }}
>
  <div
    style={{
      height: "720px",
      borderRadius: "24px",
      overflow: "hidden",
      position: "relative",
      border: "1px solid rgba(255,255,255,0.04)",
      background:
        "radial-gradient(circle at 50% 50%, rgba(0,240,255,.08), transparent 35%), #081010",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(90deg, rgba(215,255,0,.03), rgba(0,240,255,.05))",
      }}
    />

    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2
        style={{
          fontSize: "180px",
          fontWeight: 800,
          color: "rgba(255,255,255,0.03)",
          userSelect: "none",
        }}
      >
        {project.title}
      </h2>
    </div>
  </div>
</section>

{/* Overview Section */}
<section
  style={{
    padding: "120px 90px",
    borderTop: "1px solid rgba(255,255,255,0.05)",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  }}
>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1.7fr 0.8fr",
      gap: "120px",
      alignItems: "start",
    }}
  >
    {/* Left Side */}
    <div>
      <p
        style={{
          color: "#D7FF00",
          fontFamily: "monospace",
          fontSize: "15px",
          letterSpacing: "2px",
          marginBottom: "40px",
        }}
      >
        // OVERVIEW
      </p>

      <p
        style={{
          fontSize: "28px",
          lineHeight: "1.4",
          color: "#F5F5F5",
          maxWidth: "1100px",
        }}
      >
        {project.description}
      </p>
    </div>

    {/* Right Side */}
    <div
      style={{
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "24px",
        padding: "28px",
        background: "rgba(255,255,255,0.01)",
        backdropFilter: "blur(10px)",
      }}
    >
      <p
        style={{
          color: "#00F0FF",
          fontFamily: "monospace",
          fontSize: "15px",
          letterSpacing: "2px",
          marginBottom: "24px",
        }}
      >
        // TECH STACK
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        {project.techStack?.map((tech) => (
          <span
            key={tech}
            style={{
              padding: "12px 18px",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.06)",
              color: "#BDBDBD",
              fontFamily: "monospace",
              fontSize: "15px",
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  </div>
</section>

{/* Challenge & Solution */}
<section
  style={{
    padding: "120px 90px",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  }}
>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "120px",
    }}
  >
    {/* Challenge */}
    <div>
      <p
        style={{
          color: "#00F0FF",
          fontFamily: "monospace",
          fontSize: "15px",
          letterSpacing: "2px",
          marginBottom: "40px",
        }}
      >
        // THE CHALLENGE
      </p>

      <p
        style={{
          fontSize: "24px",
          lineHeight: "1.7",
          color: "#F5F5F5",
        }}
      >
        {project.challenge}
      </p>
    </div>

    {/* Solution */}
    <div>
      <p
        style={{
          color: "#D7FF00",
          fontFamily: "monospace",
          fontSize: "15px",
          letterSpacing: "2px",
          marginBottom: "40px",
        }}
      >
        // THE SOLUTION
      </p>

      <p
        style={{
          fontSize: "24px",
          lineHeight: "1.7",
          color: "#F5F5F5",
        }}
      >
        {project.solution}
      </p>
    </div>
  </div>
</section>

{/* Color Palette */}
<section
  style={{
    padding: "120px 90px",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  }}
>
  <p
    style={{
      color: "#D7FF00",
      fontFamily: "monospace",
      fontSize: "15px",
      letterSpacing: "2px",
      marginBottom: "24px",
    }}
  >
    // COLOR SYSTEM
  </p>

  <h2
    style={{
      fontSize: "72px",
      fontWeight: 700,
      marginBottom: "70px",
    }}
  >
    Color Palette
  </h2>

  <div
    style={{
      display: "flex",
      gap: "18px",
      flexWrap: "wrap",
    }}
  >
    {project.colors?.map((color) => (
      <div key={color}>
        <div
          style={{
            width: "128px",
            height: "128px",
            borderRadius: "18px",
            background: color,
            border: "1px solid rgba(255,255,255,.05)",
          }}
        />

        <p
          style={{
            marginTop: "14px",
            color: "#7A7A7A",
            fontFamily: "monospace",
            fontSize: "15px",
          }}
        >
          {color}
        </p>
      </div>
    ))}
  </div>
</section>

{/* Typography */}
<section
  style={{
    padding: "120px 90px",
    borderBottom: "1px solid rgba(255,255,255,.05)",
  }}
>
  <p
    style={{
      color: "#00F0FF",
      fontFamily: "monospace",
      fontSize: "15px",
      letterSpacing: "2px",
      marginBottom: "24px",
    }}
  >
    // TYPOGRAPHY
  </p>

  <h2
    style={{
      fontSize: "72px",
      fontWeight: 700,
      marginBottom: "60px",
    }}
  >
    Type System
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "32px",
    }}
  >
    {project.typography?.map((font) => (
      <div
        key={font.name}
        style={{
          padding: "40px",
          borderRadius: "24px",
          border: "1px solid rgba(255,255,255,.05)",
          background: "rgba(255,255,255,.01)",
        }}
      >
        <p
          style={{
            color: "#7A7A7A",
            fontFamily: "monospace",
            marginBottom: "20px",
          }}
        >
          {font.name}
        </p>

        <h3
          style={{
            fontSize: "72px",
            fontWeight: 700,
            marginBottom: "24px",
          }}
        >
          {font.sample}
        </h3>

        <p
          style={{
            color: "#6A6A6A",
            fontSize: "18px",
            lineHeight: "1.8",
          }}
        >
          ABCDEFGHIJKLMNOPQRSTUVWXYZ
          <br />
          abcdefghijklmnopqrstuvwxyz
          <br />
          0123456789
        </p>
      </div>
    ))}
  </div>
</section>

{/* Highlights */}
<section
  style={{
    padding: "120px 90px",
    borderBottom: "1px solid rgba(255,255,255,.05)",
  }}
>
  <p
    style={{
      color: "#D7FF00",
      fontFamily: "monospace",
      fontSize: "15px",
      letterSpacing: "2px",
      marginBottom: "24px",
    }}
  >
    // HIGHLIGHTS
  </p>

  <h2
    style={{
      fontSize: "72px",
      fontWeight: 700,
      marginBottom: "60px",
    }}
  >
    Project Highlights
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "24px",
    }}
  >
    {project.highlights?.map((item, index) => (
      <div
        key={index}
        style={{
          padding: "40px",
          borderRadius: "24px",
          border: "1px solid rgba(255,255,255,.05)",
          background: "rgba(255,255,255,.01)",
          minHeight: "180px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <h3
          style={{
            fontSize: "28px",
            fontWeight: 600,
            lineHeight: "1.3",
            color: "#D7FF00",
          }}
        >
          {item}
        </h3>
      </div>
    ))}
  </div>

  <div
    style={{
      textAlign: "center",
      marginTop: "120px",
    }}
  >
    <p
      style={{
        color: "#7A7A7A",
        fontFamily: "monospace",
        marginBottom: "24px",
      }}
    >
      Want to see more?
    </p>

    <Link href="/work">
      <button
        style={{
          background: "#D7FF00",
          color: "#000",
          padding: "20px 40px",
          borderRadius: "999px",
          fontWeight: 600,
          border: "none",
          cursor: "pointer",
        }}
      >
        View All Projects ↗
      </button>
    </Link>
  </div>
</section>

      </main>

      <CTASection />
      <Footer />
    </>
  );
}