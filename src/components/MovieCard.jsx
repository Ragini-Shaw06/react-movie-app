import { useNavigate } from "react-router-dom";
import Trailer from "./Trailer";
import { useState } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const [trailer, setTrailer] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const handlePlay = async (e) => {
    e.stopPropagation();

    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`,
    );

    const data = await res.json();

    const trailerData = data.results.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube",
    );

    if (trailerData) {
      setTrailer(trailerData);
      setShowTrailer(true);
    } else {
      alert("Trailer not available");
    }
  };

  return (
    <>
      <div
        onClick={() => {
          navigate(`/movie/${movie.id}`);
        }}
        className="relative group rounded-lg overflow-hidden cursor-pointer"
      >
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/300x450"
          }
          alt={movie.title || movie.name}
          className="w-full h-72 object-cover transition duration-300 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out flex flex-col justify-center text-center px-4 translate-y-6 group-hover:translate-y-0 ">
          <h3 className="text-white text-lg font-bold mb-2 leading-tight">
            {movie.title || movie.name}
          </h3>
          <p className="text-yellow-400 text-sm mb-4">
            ⭐ {movie.vote_average.toFixed(1)}
          </p>

          <div className="flex gap-4">
            <button
              onClick={handlePlay}
              className="bg-white text-black px-5 py-2 rounded-md font-semibold hover:bg-gray-300 transition shadow-md cursor-pointer"
            >
              ▶ Play
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/movie/${movie.id}`);
              }}
              className="bg-gray-700 text-white px-5 py-2 text-sm rounded-md font-semibold hover:bg-gray-600 transition shadow-md cursor-pointer"
            >
              ℹ Info
            </button>
          </div>
        </div>
      </div>
      {showTrailer && (
        <Trailer trailer={trailer} onClose={() => setShowTrailer(false)} />
      )}
    </>
  );
};

export default MovieCard;
