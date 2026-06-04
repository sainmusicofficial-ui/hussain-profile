export default function Hero() {
  return (
    <section className="min-h-screen bg-[#050505]">
      <div className="max-w-[1600px] mx-auto px-[20px]">

        <div className="pt-[190px]">

          <p
            className="
            text-[#D7FF00]
            text-[11px]
            tracking-[0.24em]
            uppercase
            font-[700]
            mb-[30px]
            "
          >
            Creative Designer & Brand Strategist
          </p>

          <h1
            className="
            text-white
            text-[100px]
            font-[700]
            leading-[0.90]
            tracking-[-0.03em]
            max-w-[1150px]
            "
          >
            Designing Brands,
            <br />
            Interfaces &{" "}
            <span
              className="text-[#D7FF00]"
              style={{
                textShadow:
                  "0 0 18px rgba(215,255,0,0.65), 0 0 42px rgba(215,255,0,0.30)",
              }}
            >
              Digital
            </span>{" "}
            Experiences
          </h1>

        </div>

      </div>

      {/* Description + Buttons */}
<div className="ml-[190px]">

  <p
    className="
    mt-[28px]
    max-w-[700px]
    text-[#6A6A6A]
    text-[20px]
    leading-[1.6]
    "
  >
    Creative direction meets modern digital execution.
    I help startups and brands build unforgettable
    visual identities and products.
  </p>

  <div className="flex items-center gap-5 mt-[42px]">

    <button
      className="
      h-[60px]
      px-[36px]
      rounded-full
      bg-[#D7FF00]

      text-black

      font-semibold

      transition-all

      duration-300

      hover:scale-105

      hover:shadow-[0_0_40px_rgba(215,255,0,0.55)]

      "
    >
      View Work 
    </button>

    <button
      className="

      h-[60px]

      px-[36px]

      rounded-full

      border

      border-[#2A2A2A]

      text-white

      transition-all

      duration-300

      hover:border-[#D7FF00]

      hover:text-[#D7FF00]

      hover:shadow-[0_0_20px_rgba(215,255,0,0.15)]

      "
    >
      About Me
    </button>

  </div>

</div>

<div
  className="
  absolute
  bottom-[50px]
  left-1/2
  -translate-x-1/2
  text-[#666]
  text-[11px]
  tracking-[0.25em]
  uppercase
  "
>
  Scroll
</div>



    </section>
  );
}