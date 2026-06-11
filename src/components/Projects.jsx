import { featuredProjects } from "@/data/projects";
import Image from "next/image";

export default function Projects() {
  return (
    <section className="relative px-[80px] py-[140px]">

      {/* Heading */}

      <div className="flex items-end justify-between mb-16">

        <div>

          <p
            className="
            text-[#D7FF00]
            text-[11px]
            tracking-[0.25em]
            uppercase
            mb-4
            "
          >
            // Featured Projects
          </p>

          <h2
            className="
            text-white
            text-[64px]
            font-bold
            leading-none
            "
          >
            Selected Work
          </h2>

        </div>

        <button
          className="
          text-[#888]
          text-sm
          hover:text-white
          transition-all
          "
        >
          View All →
        </button>

      </div>

      {/* Grid */}

      <div className="grid grid-cols-2 gap-6">

        {featuredProjects.map((project) => (

          <div
  key={project.slug}
  className="
  group
  relative
  h-[520px]
  rounded-[28px]
  overflow-hidden
  border
  border-[#1B1B1B]
  cursor-pointer

  transition-all
  duration-500

  hover:-translate-y-2
  hover:border-[#D7FF00]/30
  "
>

            {/* Glow */}

            <div
              className={`
              absolute
              inset-0
              opacity-40
              transition-all
              duration-500
              group-hover:opacity-80

              ${
                project.accent === "cyan"
                  ? "bg-cyan-500/10"
                  : "bg-[#D7FF00]/10"
              }
              `}
            />

            {/* Dark Overlay */}

            <div className="absolute inset-0 bg-black/70" />
<div className="absolute inset-0 overflow-hidden">

  <Image
    src={project.image}
    alt={project.title}
    fill
    className="
    object-cover
    transition-all
    duration-700
    group-hover:scale-105
    "
  />

  <div className="absolute inset-0 bg-black/55" />

</div>

            {/* Content */}

            <div
              className="
              relative
              h-full
              p-8
              flex
              flex-col
              justify-end
              "
            >

              <p
                className="
                text-[#D7FF00]
                text-[10px]
                uppercase
                tracking-[0.15em]
                mb-4
                "
              >
                {project.services.join(" • ")}
              </p>

              <h3
                className="
                text-white
                text-[34px]
                font-bold
                mb-2
                "
              >
                {project.title}
              </h3>

              <div className="flex items-center justify-between">

  <p className="text-[#7A7A7A]">
    {project.category}
  </p>

  
</div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}