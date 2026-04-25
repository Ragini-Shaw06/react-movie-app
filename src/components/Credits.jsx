import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const Credits = ({ movieId }) => {
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setCast(data.cast || []);
        setCrew(data.crew || []);
      });
  }, [movieId]);

  const actors = cast.slice(0, 10);

  const director = crew.find((p) => p.job === "Director");

  const mainProducers = crew.filter(
    (p) => p.job === "Producer" || p.job === "Executive Producer",
  );

  const productionFallback =
    mainProducers.length > 0
      ? mainProducers
      : crew.filter((p) => p.department === "Production");

  const producers = productionFallback
    .filter((p) => p.id !== director?.id)
    .slice(0, 6);

  const renderPeople = (people) => (
    <div className="flex gap-5 overflow-x-auto no-scrollbar py-4 scroll-smooth">
      {people.map((person) => (
        <div
          key={person.id}
          className="min-w-[190px] text-center text-white flex flex-col items-center"
        >
          <img
            src={
              person.profile_path
                ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                : "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(person.name) +
                  "&background=1f2937&color=9ca3af&size=200"
            }
            alt={person.name}
            className="w-[150px] h-[150px] md:w-[170px] md:h-[170px] rounded-full object-cover border border-gray-600 shadow-md mb-3 hover:scale-105 hover:shadow-xl transition duration-300"
          />

          <p className="text-base font-semibold mt-1">{person.name}</p>

          <p className="text-xs text-gray-400">
            {person.character || person.job}
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="px-8 mt-10">
      <h2 className="text-white text-2xl font-bold mb-2">🎭 Cast</h2>
      {renderPeople(actors)}

      {director && (
        <>
          <h2 className="text-white text-2xl font-bold mt-6 mb-2">
            🎬 Director
          </h2>
          {renderPeople([director])}
        </>
      )}

      <h2 className="text-white text-2xl font-bold mt-6 mb-2">🏭 Production</h2>
      {renderPeople(producers)}
    </div>
  );
};

export default Credits;
