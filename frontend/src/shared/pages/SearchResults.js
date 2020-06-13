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
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

  if (searchInput === '') {
    return (
      <Card className="search-not-found">
        <span> Please enter at least one character! </span>
      </Card>
    );
  } else {
    return (
      <div>
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}
        {error && <ErrorModal error={error} onClear={clearError} />}
        {!isLoading && !users.length && !places.length && (
          <Card className="search-not-found">
            <span> No users or places found similar to '{searchInput}'!</span>
          </Card>
        )}
        {!isLoading && !!users.length && <UsersList items={users} />}
        {!isLoading && !!places.length && <PlaceList items={places} />}
      </div>
    );
  }
};

export default SearchResults;
