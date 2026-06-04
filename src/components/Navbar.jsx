export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-[1600px] mx-auto px-[40px] pt-[32px]">

        <div className="flex items-center justify-between">

          {/* Logo */}
          <div className="-ml-[20px] text-white text-[22px] font-bold tracking-[-0.03em]">
            HK<span className="text-[#D7FF00]">.</span>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-[80px]">

            <nav>
              <ul className="flex items-center gap-[42px] text-[14px] text-[#686868] uppercase tracking-[0.08em]">

                <li className="cursor-pointer hover:text-white transition-all duration-300">
                  Work
                </li>

                <li className="cursor-pointer hover:text-white transition-all duration-300">
                  About
                </li>

                <li className="cursor-pointer hover:text-white transition-all duration-300">
                  Services
                </li>

                <li className="cursor-pointer hover:text-white transition-all duration-300">
                  Lab
                </li>

                <li className="cursor-pointer hover:text-white transition-all duration-300">
                  Contact
                </li>

              </ul>
            </nav>

            <button
              className="
              h-[52px]
              px-[32px]
              rounded-full
              bg-[#D7FF00]
              text-black
              text-[15px]
              font-medium
              hover:scale-[1.03]
              transition-all
              duration-300
              "
            >
              Let's Talk 
            </button>

          </div>

        </div>

      </div>
    </header>
  );
}