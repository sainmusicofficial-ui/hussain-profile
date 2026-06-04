export default function CodePanel() {
  return (
    <div
      className="
      relative
      w-[420px]
      rounded-[24px]
      border border-[#1a1a1a]
      bg-[#0B0B0B]/90
      backdrop-blur-xl
      overflow-hidden
      "
    >
      <div className="flex items-center gap-2 px-5 py-4 border-b border-[#161616]">

        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />

        <span className="ml-3 text-[#666] text-sm">
          brand.config.js
        </span>

      </div>

      <div className="p-8 font-mono text-[16px] leading-[2]">

        <div>
          <span className="text-cyan-400">const</span>{" "}
          <span className="text-white">brand</span>{" "}
          <span className="text-white">=</span>{" "}
          <span className="text-white">
            createIdentity
          </span>
          <span className="text-white">(</span>
          <span className="text-white">{`{`}</span>
        </div>

        <div className="pl-6 text-[#7A7A7A]">
          name: <span className="text-[#D7FF00]">"Premium"</span>,
        </div>

        <div className="pl-6 text-[#7A7A7A]">
          strategy:
          <span className="text-cyan-400">
            {" "}defineVision()
          </span>,
        </div>

        <div className="pl-6 text-[#7A7A7A]">
          design:
          <span className="text-cyan-400">
            {" "}craftExperience()
          </span>,
        </div>

        <div className="pl-6 text-[#7A7A7A]">
          impact:
          <span className="text-cyan-400">
            {" "}measureSuccess()
          </span>,
        </div>

        <div>{`}`});</div>

        <div className="mt-5">
          <span className="text-cyan-400">
            export default
          </span>{" "}
          <span className="text-white">
            brand;
          </span>
        </div>

      </div>
    </div>
  );
}