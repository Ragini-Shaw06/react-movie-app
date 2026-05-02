import { FaInstagram, FaTwitter, FaYoutube, FaGlobe } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-black text-gray-400 px-10 py-14 mt-20 border-t border-gray-800">
      {/* 🔥 TOP GRADIENT GLOW */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-40"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        {/* LEFT */}
        <div className="max-w-sm">
          <h2 className="text-white text-2xl font-bold mb-4 tracking-wide">
            🎬 CineVerse
          </h2>

          <p className="text-sm leading-relaxed text-gray-400">
            Discover movies, trailers and trending entertainment anytime,
            anywhere. Your personal streaming companion.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-5 mt-6 text-xl">
            <FaGlobe className="hover:text-white hover:scale-110 transition cursor-pointer" />
            <FaInstagram className="hover:text-pink-500 hover:scale-110 transition cursor-pointer" />
            <FaTwitter className="hover:text-blue-400 hover:scale-110 transition cursor-pointer" />
            <FaYoutube className="hover:text-red-600 hover:scale-110 transition cursor-pointer" />
          </div>
        </div>

        {/* LINKS */}
        <div className="flex gap-20 text-sm">
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wide">
              Explore
            </h3>
            <ul className="space-y-3">
              {["Home", "Popular", "Top Rated", "TV Shows"].map((item) => (
                <li
                  key={item}
                  className="hover:text-white hover:translate-x-1 transition cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wide">
              Company
            </h3>
            <ul className="space-y-3">
              {["About", "Contact", "Privacy Policy"].map((item) => (
                <li
                  key={item}
                  className="hover:text-white hover:translate-x-1 transition cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 🔻 BOTTOM SECTION */}
      <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} CineVerse. All rights reserved.</p>

        <p className="mt-3 md:mt-0 text-gray-400">
          Built with <span className="text-red-500">❤️</span> using React & TMDB
          API
        </p>
      </div>
    </footer>
  );
};

export default Footer;
