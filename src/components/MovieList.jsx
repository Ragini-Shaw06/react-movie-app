import MovieCard from "./MovieCard";

const MovieList = ({ movies }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 p-6">
      {Array.isArray(movies) &&
        movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
    </div>
  );
};

export default MovieList;
