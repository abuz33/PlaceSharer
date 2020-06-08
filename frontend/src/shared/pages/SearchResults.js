import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../hooks/http-hook';
import LoadingSpinner from '../components/UIElements/LoadingSpinner';
import ErrorModal from '../components/UIElements/ErrorModal';
import UsersList from '../../user/components/UsersList';
import PlaceList from '../../places/components/PlaceList';

const SearchResults = (props) => {
  const [users, setUsers] = useState([]);
  const [places, setPlaces] = useState([]);
  const searchInput = useParams().searchInput;
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

  return (
    <div>
      {' '}
      Hello search results {searchInput}
      {isLoading && <LoadingSpinner />}
      {error && <ErrorModal />}
      {!isLoading && users && <UsersList items={users} />}
      {!isLoading && places && <PlaceList items={places} />}
    </div>
  );
};

export default SearchResults;
