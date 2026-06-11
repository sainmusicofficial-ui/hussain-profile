"use client";

import { useEffect, useState } from "react";

export default function CodePanel() {
  const tabs = [
    "brand.config.js",
    "website.tsx",
    "ui-system.ts",
  ];

  const codeContent = [
  {
    name: "Premium",
    strategy: "defineVision()",
    design: "craftExperience()",
    impact: "measureSuccess()",
  },

  {
    name: "Portfolio",
    strategy: "buildWebsite()",
    design: "createUI()",
    impact: "generateLeads()",
  },

  {
    name: "Design System",
    strategy: "scaleGrowth()",
    design: "buildComponents()",
    impact: "improveUX()",
  },
];

  const words = [
    "Premium",
    "Luxury",
    "Modern",
  ];

  const [activeTab, setActiveTab] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
      setActiveTab((prev) => (prev + 1) % tabs.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">

      {/* Glow */}
      <div
        className="
        absolute
        -inset-6
        bg-cyan-400/6
        blur-[60px]
        rounded-[40px]
        "
      />

      {/* Card */}
      <div
        className="
        relative
        w-[500px]
        rounded-[24px]
        border border-[#202020]
        bg-[#080808]/95
        backdrop-blur-xl
        overflow-hidden
        shadow-[0_0_40px_rgba(0,0,0,0.4)]
        transition-transform
        duration-300
        hover:scale-[1.02]
        "
        style={{
          animation: "floatPanel 3s ease-in-out infinite",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-5 py-4 border-b border-[#161616]">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />

          <span className="ml-3 text-[#666] text-sm transition-all duration-500">
            {tabs[activeTab]}
          </span>
        </div>

        {/* Code */}
        <div className="p-10 font-mono text-[16px] leading-[2.2]">

          <div>
            <span className="text-cyan-400">const</span>{" "}
            <span className="text-white">brand</span>{" "}
            <span className="text-white">=</span>{" "}
            <span className="text-white">createIdentity</span>
            <span className="text-white">(</span>
            <span className="text-white">{`{`}</span>
          </div>

          <div className="pl-6 text-[#7A7A7A]">
            name:{" "}
            <span
              className="
              text-[#D7FF00]
              transition-all
              duration-700
              "
            >
              {codeContent[activeTab].name}
            </span>
            ,
          </div>

          <div className="pl-6 text-[#7A7A7A]">
            strategy:
            <span className="text-cyan-400">
              {" "}
              {codeContent[activeTab].strategy}
            </span>
            ,
          </div>

          <div className="pl-6 text-[#7A7A7A]">
            design:
            <span className="text-cyan-400">
              {" "}
              {codeContent[activeTab].design}
            </span>
            ,
          </div>

          <div className="pl-6 text-[#7A7A7A]">
            impact:
            <span className="text-cyan-400">
              {" "}
              {codeContent[activeTab].impact}
            </span>
            ,
          </div>

          <div>{`}`});</div>

          <div className="mt-5">
            <span className="text-cyan-400">
              export default
            </span>{" "}
            <span className="text-white">
              brand;
            </span>

            <span
              className="
              ml-1
              text-[#D7FF00]
              cursor-blink
              "
            >
              |
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}