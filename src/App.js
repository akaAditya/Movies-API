import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movie, setMovie] = useState([]);
  async function fetchMoviesLists() {
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
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesLists}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movie} />
      </section>
    </React.Fragment>
  );
}

export default App;
