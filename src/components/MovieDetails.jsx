import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Trailer from "./Trailer";
import BackgroundTrailer from "./BackgroundTrailer";
import Credits from "./Credits";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [id]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        const trailerData =
          data.results.find(
            (vid) =>
              vid.type === "Trailer" &&
              vid.site === "YouTube" &&
              vid.official === true,
          ) ||
          data.results.find(
            (vid) => vid.type === "Trailer" && vid.site === "YouTube",
          );
        setTrailer(trailerData);
      });
  }, [id]);

  if (!movie) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return (
    <div className="text-white bg-black ">
      <button
        onClick={() => window.history.back()}
        className="absolute top-2 left-6 z-50 bg-black/60 px-4 py-2 rounded hover:bg-black cursor-pointer"
      >
        ← Back
      </button>

      <BackgroundTrailer
        movieId={id}
        backdrop={movie.backdrop_path}
        poster={movie.poster_path}
      />

      <div className="absolute bottom-10 left-10 z-20 flex gap-8 items-end">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg shadow-lg w-48"
        />

        <div>
          <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>

          <p className="text-gray-300 mb-3">
            ⭐ {movie.vote_average} | 📅 {movie.release_date}
          </p>

          <p className="text-gray-400 max-w-xl leading-relaxed">
            {movie.overview}
          </p>

          {trailer ? (
            <button
              onClick={() => setShowTrailer(true)}
              className="mt-4 bg-red-600 px-6 py-2 rounded hover:bg-red-700 transition cursor-pointer"
            >
              ▶ Play Trailer
            </button>
          ) : (
            <p className="text-gray-400 mt-4 font-semibold">
              Trailer not available
            </p>
          )}
        </div>
      </div>

      {showTrailer && (
        <Trailer trailer={trailer} onClose={() => setShowTrailer(false)} />
      )}

      <Credits movieId={id} />
    </div>
  );
};

export default MovieDetails;
