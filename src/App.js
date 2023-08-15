import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movie, setMovie] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  async function fetchMoviesLists() {
    setIsLoader(true);
    const moviesURL = await fetch("https://swapi.py4e.com/api/films");
    const data = await moviesURL.json();
    const transformedData = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      };
    });
    setMovie(transformedData);
    setIsLoader(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesLists}>Fetch Movies</button>
      </section>
      <section>
        {!isLoader && movie.length > 0 && <MoviesList movies={movie} />}
        {!isLoader && movie.length === 0 && <p>No Movie Found...</p>}
        {isLoader && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
