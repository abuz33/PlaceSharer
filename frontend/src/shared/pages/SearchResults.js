import React, { useEffect, useState, useContext } from 'react';
import { useHttpClient } from '../hooks/http-hook';
import { SearchContext } from '../context/search-context';
import LoadingSpinner from '../components/UIElements/LoadingSpinner';
import ErrorModal from '../components/UIElements/ErrorModal';
import UsersList from '../../user/components/UsersList';
import PlaceList from '../../places/components/PlaceList';
import Card from '../components/UIElements/Card';
import './SearchResults.css';

const SearchResults = (props) => {
  const { searchState } = useContext(SearchContext);
  const searchInput = searchState.inputs.search.value;
  const [users, setUsers] = useState([]);
  const [places, setPlaces] = useState([]);
  const [categorization, setCategorization] = useState({ all: true, users: false, places: false });
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const categorizeResultsHandler = (e) => {
    const id = e.target.id;

    setCategorization({
      all: false,
      users: false,
      places: false,
      [id]: true,
    });
  };
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/search?q=${searchInput}`,
        );

        setUsers(await responseData.users);
        setPlaces(await responseData.places);
      } catch (err) {}
    };
    fetchResults();
  }, [sendRequest, searchInput]);

  let result;
  if (searchInput === '') {
    result = (
      <Card className="search-not-found">
        <span> Please enter at least one character! </span>
      </Card>
    );
  } else {
    result = (
      <div>
        {error && <ErrorModal error={error} onClear={clearError} />}
        {!isLoading && !users.length && !places.length && (
          <Card className="search-not-found">
            <span> No users or places found similar to '{searchInput}'!</span>
          </Card>
        )}
        {!isLoading && categorization.all && !!users.length && <UsersList items={users} />}
        {!isLoading && categorization.all && !!places.length && <PlaceList items={places} />}
        {!isLoading && categorization.users && <UsersList items={users} />}
        {!isLoading && categorization.places && <PlaceList items={places} />}
        {/* {!isLoading && !!users.length && <UsersList items={users} />}
        {!isLoading && !!places.length && <PlaceList items={places} />} */}{' '}
      </div>
    );
  }
  return (
    <div>
      <div className="center padding-y">
        <button
          className={`button ${categorization.all ? 'active' : ''}`}
          id="all"
          onClick={categorizeResultsHandler}
        >
          All ({searchInput === '' ? 0 : users.length + places.length})
        </button>
        <button
          className={`button ${categorization.users ? 'active' : ''}`}
          id="users"
          onClick={categorizeResultsHandler}
        >
          Users
        </button>
        <button
          className={`button ${categorization.places ? 'active' : ''}`}
          id="places"
          onClick={categorizeResultsHandler}
        >
          Places
        </button>
      </div>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {result}
    </div>
  );
};

export default SearchResults;
