import React from "react";

import classes from "./Movie.module.css";

const Movie = (props) => {
  console.log("props movie id", props.id);
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button onClick={() => props.onDeleteMovie(props.id)}>remove</button>
    </li>
  );
};

export default Movie;
