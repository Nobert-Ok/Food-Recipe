import React, { useState, useEffect } from "react";
import style from "./search.module.css";

export default function Search({ foodData, setFoodData }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const URL = "https://api.spoonacular.com/recipes/complexSearch";
    const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
    async function fetchfood() {
      const res = await fetch(`${URL}?query=${query}&apiKey=${API_KEY}`);
      const data = await res.json();
      // console.log(data.results);
      setFoodData(data.results);
    }
    fetchfood();
  }, [query]);

  return (
    <div className={style.container}>
      <input
        className={style.input}
        value={query}
        type="text"
        onChange={(e) => setQuery(e.target.value)}
      ></input>
    </div>
  );
}
