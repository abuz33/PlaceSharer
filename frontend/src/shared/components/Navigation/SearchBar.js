import React, { useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { SearchContext } from '../../context/search-context';
import './SearchBar.css';

const SearchBar = () => {
  const history = useHistory();
  const { searchState, inputHandler } = useContext(SearchContext);
  const changeHandler = useCallback(
    (e) => {
      const value = e.target.value;
      const isValid = value.length > 0;
      inputHandler('search', value, isValid);
    },
    [inputHandler],
  );
  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();
      history.push('/search');
    },
    [history],
  );
  return (
    <form className="searchForm">
      <input
        className="search-input"
        value={searchState.inputs.search.value}
        type="text"
        placeholder="Search..."
        onChange={changeHandler}
      ></input>
      <button
        className="search"
        type="submit"
        onClick={submitHandler}
        disabled={!searchState.isValid}
      >
        <span className="search-emoji" role="img" aria-label="emoji">
          🔍
        </span>{' '}
      </button>
    </form>
  );
};

export default SearchBar;
