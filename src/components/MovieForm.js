import React, { useCallback, useState } from "react";

const MovieForm = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState("");

  const titleChange = useCallback((event) => {
    setTitle(event.target.value);
  },[]);

  const textChange = useCallback((event) => {
    setText(event.target.value);
  },[]);

  const dateChange = useCallback((event) => {
    setDate(event.target.value);
  },[]);
  const submithandler = (e) => {
    e.preventDefault();
    let getdetails = {
      title: title,
      text: text,
      dateToday: new Date(date),
    };
    console.log(getdetails);
    setTitle("");
    setText("");
    setDate("");
  };
  return (
    <form onSubmit={submithandler}>
    {console.log('re-rendered happen')}
      <label>Title</label>
      <input type="text" onChange={titleChange} />
      <label>Opening Text</label>
      <input type="text" onChange={textChange} />
      <label>Release Date</label>
      <input type="date" onChange={dateChange} />
      <button>Add Movie</button>
    </form>
  );
};

export default MovieForm;
