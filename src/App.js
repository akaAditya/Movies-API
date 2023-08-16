import React, { useCallback, useEffect, useRef, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movie, setMovie] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);

  const FetchMoviesLists = useCallback(async () => {
    setIsLoader(true);
    setError(null);

    try {
      const moviesURL = await fetch("https://swapi.py4e.com/api/films");
      console.log("refetch");
      if (!moviesURL.ok) {
        throw new Error("Something went wrong ....Retrying");
      }
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
    } catch (error) {
      setError(error.message);
    }

    setIsLoader(false);
  }, []);

  // Time Interval
  const setIntervalHandler = useCallback(async () => {
    intervalRef.current = setInterval(FetchMoviesLists, 5000);
  }, [FetchMoviesLists]);

  const removeIntervalHandler = useCallback(async () => {
    clearInterval(intervalRef.current);
    setError(null)
  }, [intervalRef]);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

// Fetch movies on loading the page using useEffect
  useEffect(()=>{
    FetchMoviesLists()
  },[FetchMoviesLists])

  let content = <p>Found no Movies</p>;

  if (isLoader) {
    content = <p>Loading...</p>;
  }
  if (movie.length > 0) {
    content = <MoviesList movies={movie} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={setIntervalHandler}>Fetch Movies</button>
        <button onClick={removeIntervalHandler}>Cancel</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
