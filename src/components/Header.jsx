const Header = ({ category, setCategory, query, setQuery }) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-10 py-4 bg-black/80 backdrop-blur-md text-white">
      <h2 className="text-2xl font-bold cursor-pointer">🎬 CineVerse</h2>

      <nav className="flex gap-10 text-sm font-medium">
        <span
          onClick={() => setCategory("home")}
          className={`cursor-pointer hover:text-red-500 transition ${category === "home" && "text-red-500"}`}
        >
          Home
        </span>
        <span
          onClick={() => setCategory("popular")}
          className={`cursor-pointer hover:text-red-500 transition ${category === "popular" && "text-red-500"}`}
        >
          Popular
        </span>
        <span
          onClick={() => setCategory("top_rated")}
          className={`cursor-pointer hover:text-red-500 transition ${category === "top_rated" && "text-red-500"}`}
        >
          Top Rated
        </span>
        <span
          onClick={() => setCategory("upcoming")}
          className={`cursor-pointer hover:text-red-500 transition ${category === "upcoming" && "text-red-500"}`}
        >
          Upcoming
        </span>
        <span
          onClick={() => setCategory("tv")}
          className={`cursor-pointer hover:text-red-500 transition ${category === "tv" && "text-red-500"}`}
        >
          TV Shows
        </span>
      </nav>

      <div className="flex gap-8">
        <input
          type="text"
          placeholder="Search Movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-gray-200 dark:bg-gray-800 px-6 py-1.5 rounded-full outline-none text-sm focus:ring-2 focus:ring-red-500 w-80"
        />

        <span className="text-xl cursor-pointer">👤</span>
      </div>
    </header>
  );
};

export default Header;
