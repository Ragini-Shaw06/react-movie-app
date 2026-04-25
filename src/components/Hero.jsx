import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Trailer from "./Trailer";

const Hero = () => {
  const navigate = useNavigate();

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const intervalRef = useRef(null);

  // Fetch trending
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.results.filter(
          (item) => item.media_type === "movie" || item.media_type === "tv",
        );
        setMovies(filtered);
      });
  }, []);

  // Start auto slide
  const startAutoSlide = () => {
    if (intervalRef.current || paused) return;

    intervalRef.current = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000);
  };

  // Stop auto slide
  const stopAutoSlide = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  // Initialize auto slide
  useEffect(() => {
    if (!movies.length) return;

    startAutoSlide();

    return () => stopAutoSlide();
  }, [movies, paused]);

  // Handle infinite loop reset
  useEffect(() => {
    if (index === movies.length) {
      setTimeout(() => {
        setIsReady(false);
        setIndex(0);

        setTimeout(() => {
          setIsReady(true);
        }, 50);
      }, 1000);
    }
  }, [index]);

  useEffect(() => {
    if (movies.length) setIsReady(true);
  }, [movies]);

  //Toggle pause on click
  const handleTogglePause = () => {
    if (paused) {
      setPaused(false);
      startAutoSlide();
    } else {
      setPaused(true);
      stopAutoSlide();
    }
  };

  // Play Trailer
  const handlePlay = async (e, movieId, mediaType) => {
    e.stopPropagation();

    setPaused(true);
    stopAutoSlide();

    const endpoint = mediaType === "tv" ? "tv" : "movie";

    const res = await fetch(
      `https://api.themoviedb.org/3/${endpoint}/${movieId}/videos?api_key=${API_KEY}`,
    );

    const data = await res.json();

    const trailerData = data.results.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube",
    );

    console.log(trailerData);

    if (trailerData) {
      setTrailer(trailerData);
      setShowTrailer(true);
    } else {
      alert("Trailer not available");
    }
  };

  // Handle Info Button
  const handleInfo = (e, id) => {
    e.stopPropagation();

    setPaused(true);
    stopAutoSlide();

    navigate(`/movie/${id}`);
  };

  if (!movies.length) {
    return <div className="text-white p-10">Loading...</div>;
  }

  const movieList = [...movies, movies[0]];

  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      {/* LEFT */}
      <button
        onClick={() => {
          stopAutoSlide();
          setIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
          startAutoSlide();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black text-white p-3 rounded-full cursor-pointer"
      >
        ←
      </button>

      {/* RIGHT */}
      <button
        onClick={() => {
          stopAutoSlide();
          setIndex((prev) => prev + 1);
          startAutoSlide();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black text-white p-3 rounded-full cursor-pointer"
      >
        →
      </button>

      {/* SLIDER */}
      <div
        className={`flex h-full ${
          isReady ? "transition-transform duration-1000 ease-in-out" : ""
        }`}
        style={{
          transform: `translateX(-${index * 100}%)`,
          willChange: "transform",
        }}
      >
        {movieList.map((m, i) => (
          <div
            key={m.id + "-" + i}
            className="min-w-full h-full relative cursor-pointer"
            onClick={handleTogglePause}
          >
            {/* IMAGE */}
            <img
              src={
                m.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${m.backdrop_path}`
                  : "https://via.placeholder.com/1280x720"
              }
              alt={m.title || m.name}
              className="w-full h-full object-cover"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* TEXT */}
            <div className="absolute top-1/3 left-12 max-w-xl text-white">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
                {m.title || m.name}
              </h1>

              <p className="mb-6 text-gray-300 line-clamp-3">
                {m.overview || "No description available"}
              </p>

              <div className="flex gap-4">
                <button
                  onClick={(e) => handlePlay(e, m.id)}
                  className="bg-white text-black px-6 py-2 rounded-md font-semibold hover:bg-gray-300 cursor-pointer"
                >
                  ▶ Play
                </button>

                <button
                  onClick={(e) => handleInfo(e, m.id)}
                  className="bg-gray-700/80 px-6 py-2 rounded-md font-semibold hover:bg-gray-600 cursor-pointer"
                >
                  ℹ More Info
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showTrailer && (
        <Trailer
          trailer={trailer}
          onClose={() => {
            setShowTrailer(false);
            setPaused(false);
            startAutoSlide();
          }}
        />
      )}

      {/* BOTTOM GRADIENT */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>

      {/* PAUSE INDICATOR*/}
      {paused && (
        <div className="absolute top-4 right-4 bg-black/60 px-3 py-1 text-white text-sm rounded">
          Paused
        </div>
      )}
    </div>
  );
};

export default Hero;
