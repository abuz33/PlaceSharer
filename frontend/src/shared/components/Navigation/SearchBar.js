import React, { useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const changeHandler = useCallback((e) => {
    const value = e.target.value;
    setSearchValue(value);
  }, []);
  const submitHandler = (e) => {
    // if (window.location.href === 'http://localhost:3000/') {
    // } else {
    //   e.preventDefault();
    // }
  };
  return (
    <form action={`/search/${searchValue}`} method="get">
      <input value={searchValue} type="text" onChange={changeHandler}></input>
      <button type="submit" onClick={submitHandler}>
        <span role="img" aria-label="emoji">
          🔍
        </span>{' '}
      </button>
    </form>
  );
};

export default SearchBar;
