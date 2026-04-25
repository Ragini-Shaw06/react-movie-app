import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Row from "./components/Row";
import MovieList from "./components/MovieList";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function App() {
  const [category, setCategory] = useState("home");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (category === "home" && !query) return;

    setLoading(true);

    let url = "";

    if (debouncedQuery) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${debouncedQuery}`;
    } else if (category === "tv") {
      url = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`;
    } else {
      url = `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results || []);
        setLoading(false);
      });
  }, [category, debouncedQuery]);

  return (
    <>
      <Header
        category={category}
        setCategory={setCategory}
        query={query}
        setQuery={setQuery}
      />

      {query ? (
        <MovieList movies={movies} />
      ) : category === "home" ? (
        <>
          <Hero />

          <Row
            title="🔥 Popular"
            fetchUrl="https://api.themoviedb.org/3/movie/popular?"
          />
          <Row
            title="⭐ Top Rated"
            fetchUrl="https://api.themoviedb.org/3/movie/top_rated?"
          />

          <Row
            title="📺 TV Shows"
            fetchUrl="https://api.themoviedb.org/3/tv/popular?"
          />
        </>
      ) : loading ? (
        <div className="text-white text-center mt-20 text-xl">
          Loading movies...
        </div>
      ) : (
        <MovieList movies={movies} />
      )}
    </>
  );
}

export default App;
