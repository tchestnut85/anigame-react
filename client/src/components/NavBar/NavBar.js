import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  CLEAR_DATA,
  CLEAR_GAME_LOADING,
  CLEAR_STORAGE,
} from '../../utils/context/searchActions';

import { ItemButton } from '../ItemButton/ItemButton';
import { Search } from '../Search/Search';
import { clearSearches } from '../../utils/localStorage';
import { useSearchContext } from '../../utils/context/SearchState';
import { setQuery } from '../../redux/query';
import { getGameData, getGameScore } from '../../redux/game';

export const NavBar = () => {
  const dispatch = useDispatch();
  const query = useSelector(state => state.query);

  const [{ savedSearches }, contextDispatch] = useSearchContext();

  const handleClear = () => {
    contextDispatch({ type: CLEAR_STORAGE });
    clearSearches();
  };

  const handleSearch = async e => {
    e.preventDefault();
    const searchTerm = e.target.textContent.trim().toLowerCase();

    if (searchTerm === query) return;
    contextDispatch({ type: CLEAR_DATA });

    try {
      dispatch(getGameData(searchTerm));
      dispatch(getGameScore(searchTerm));
      dispatch(setQuery(searchTerm));
    } catch (err) {
      console.error(`There was an error: ${err.message}`);
    }

    contextDispatch({ type: CLEAR_GAME_LOADING });
  };

  return (
    <nav
      id="search-display"
      className="nav-style navbar has-background-dark is-vcentered is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div id="gametitle-buttons" className="buttons">
        <button
          id="delete-btn"
          className="button is-danger is-rounded"
          onClick={handleClear}
        >
          <span className="icon is-small">
            <i className="fas fa-skull"></i>
          </span>
        </button>
        {savedSearches.length
          ? savedSearches.map((item, i) => (
              <ItemButton
                key={i}
                classes={'button game-button is-rounded is-light'}
                handleSearch={handleSearch}
                item={item}
              />
            ))
          : null}
      </div>
      <div className="navbar-end">
        <Search />
      </div>
    </nav>
  );
};
