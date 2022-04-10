import React from "react";
import css from "./Search.module.scss";

const Search = () => {
  return <input className={css.input} type="text" name="search" id="search" placeholder="Search"/>;
};

export default Search;
