import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const Row = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const separator = fetchUrl.includes("?") ? "&" : "?";
    const url = `${fetchUrl}${separator}api_key=${API_KEY}`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((err) => console.log("ERROR:", err));
  }, [fetchUrl]);

  return (
    <div className="px-6 mb-8">
      <h2 className="text-white text-3xl font-bold mb-6 mt-15">{title}</h2>

      <div className="flex overflow-x-auto overflow-y-visible gap-4 no-scrollbar">
        {Array.isArray(movies) &&
          movies.map((movie) => (
            <div className="min-w-[250px] relative" key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Row;
