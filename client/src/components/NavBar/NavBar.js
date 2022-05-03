import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ItemButton } from '../ItemButton/ItemButton';
import { Search } from '../Search/Search';

import { setQuery } from '../../redux/query';
import { getGameData, getGameScore, clearGameData } from '../../redux/game';
import { clearSearches } from '../../redux/savedSearches';

export const NavBar = () => {
  const dispatch = useDispatch();
  const query = useSelector(state => state.query);
  const savedSearches = useSelector(state => state.savedSearches);

  const handleClear = () => dispatch(clearSearches());

  const handleClearData = () => dispatch(clearGameData());

  const handleSearch = async e => {
    e.preventDefault();
    const searchTerm = e.target.textContent.trim().toLowerCase();

    if (searchTerm === query) return;
    handleClearData();

    try {
      dispatch(getGameData(searchTerm));
      dispatch(getGameScore(searchTerm));
      dispatch(setQuery(searchTerm));
    } catch (err) {
      console.error(`There was an error: ${err.message}`);
    }
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
