import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const api_url = `https://www.omdbapi.com/?i=tt3896198&apikey=${process.env.REACT_APP_API_KEY}`;

export default function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // eb01f497
  async function searchMovies(movie) {
    const res = await fetch(`${api_url}&s=${movie}`);
    let data = await res.json();
    setMovies(data.Search);
  }
  function searchEnterKey(e) {
    if (e.key === "Enter") {
      searchMovies(searchTerm);
    }
  }

  useEffect(() => {
    searchMovies();
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="search for the movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={searchEnterKey}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}{" "}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Card</h2>
        </div>
      )}
    </div>
  );
}
