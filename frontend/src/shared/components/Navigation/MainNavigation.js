import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import SearchBar from './SearchBar';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';
import './MainNavigation.css';

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className="main-navigation__header-mobile-search">
          <button
            className="search mobile"
            type="submit"
            onClick={() => {
              setIsMobileSearchOpen((currentState) => {
                return !currentState;
              });
              console.log(isMobileSearchOpen);
            }}
          >
            <span className="search-emoji mobile" role="img" aria-label="emoji">
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </button>

          <CSSTransition
            classNames="slide-in-top"
            in={isMobileSearchOpen}
            mountOnEnter
            unmountOnExit
            timeout={200}
          >
            <SearchBar isMobile={true} closeSearchBarHandler={setIsMobileSearchOpen} />
          </CSSTransition>
        </nav>
        <nav className="main-navigation__header-search">
          <SearchBar />
        </nav>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
