import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BackgroundTrailer = ({ movieId, backdrop, poster }) => {
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    console.log("API call started....");
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`,
    )
      .then((res) => res.json())
      .then((data) => {
        const trailerData = data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube",
        );
        console.log("Trailer Data", trailerData);
        setTrailer(trailerData);
      });
  }, [movieId]);

  const imagePath = backdrop || poster;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {trailer ? (
        <iframe
          src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&loop=1&playlist=${trailer.key}&controls=0`}
          className="absolute top-0 left-0 w-full h-full scale-125 object-cover"
          allow="autoplay"
          title="Trailer"
        />
      ) : (
        <>
          <img
            src={
              imagePath
                ? `https://image.tmdb.org/t/p/original${imagePath}`
                : "https://via.placeholder.com/1280x720?text=No+Image"
            }
            alt="movie"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-lg">
            🎬 Trailer not available
          </div>
        </>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
    </div>
  );
};

export default BackgroundTrailer;
