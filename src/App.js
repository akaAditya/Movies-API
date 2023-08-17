import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movie, setMovie] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [error, setError] = useState(null);

  const FetchMoviesLists = useCallback(async () => {
    setIsLoader(true);
    setError(null);

    try {
      const moviesURL = await fetch(
        "https://react-movies-a9014-default-rtdb.firebaseio.com/movies.json"
      );
      if (!moviesURL.ok) {
        throw new Error("Something went wrong ....Retrying");
      }
      const data = await moviesURL.json();
      // console.log('new movies',data)
      const loadedMovies = [];
      for (let key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      // const transformedData = data.results.map((movieData) => {
      //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     openingText: movieData.opening_crawl,
      //     releaseDate: movieData.release_date,
      //   };
      // });
      setMovie(loadedMovies);
    } catch (error) {
      setError(error.message);
    }

    setIsLoader(false);
  }, []);
  // const setIntervalHandler = useCallback(async () => {
  //   intervalRef.current = setInterval(FetchMoviesLists, 5000);
  // }, [FetchMoviesLists]);

  // const removeIntervalHandler = useCallback(async () => {
  //   clearInterval(intervalRef.current);
  //   setError(null);
  // }, [intervalRef]);

  // useEffect(() => {
  //   return () => {
  //     clearInterval(intervalRef.current);
  //   };
  // }, []);

  // Fetch movies on loading the page using useEffect
  useEffect(() => {
    FetchMoviesLists();
  }, [FetchMoviesLists]);

  const addMovieHandler = async (movie) => {
    const response = await fetch(
      "https://react-movies-a9014-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  const deleteMovieHandler = async (id) => {
    const response = await fetch(
      `https://react-movies-a9014-default-rtdb.firebaseio.com/movies/${id}.json`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json(id);
    console.log("coming from delete handler ", data);
  };

  let content = <p>Found no Movies</p>;

  if (isLoader) {
    content = <p>Loading...</p>;
  }
  if (movie.length > 0) {
    content = <MoviesList movies={movie} onDeleteMovie={deleteMovieHandler} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={FetchMoviesLists}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
