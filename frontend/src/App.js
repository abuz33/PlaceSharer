import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import'./index.css';

import HomePageText from './shared/components/UIElements/Home-page';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import SearchResults from './shared/pages/SearchResults';

import { AuthContext } from './shared/context/auth-context';
import { SearchContext } from './shared/context/search-context';

import { useAuth } from './shared/hooks/auth-hook';
import { useForm } from './shared/hooks/form-hook';

const App = () => {
  const { token, login, logout, userId } = useAuth();
  const [formState, inputHandler] = useForm({ search: { value: '', isValid: false } }, false);
  const [currentPage, setCurrentPage] = useState(1);

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Route path="/search">
          <SearchResults />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <HomePageText />
          <Auth />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <HomePageText />
          <Auth />
        </Route>
        <Route path="/search">
          <SearchResults />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <SearchContext.Provider
        value={{
          searchState: formState,
          inputHandler: inputHandler,
          currentPage: currentPage,
          setCurrentPage: setCurrentPage,
        }}
      >
        <Router>
          <MainNavigation />
          <main>{routes}</main>
        </Router>
      </SearchContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
