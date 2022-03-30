import React from 'react';
import { useDispatch } from 'react-redux';

import {
  CLEAR_DATA,
  CLEAR_ERROR,
  CLEAR_GAME_LOADING,
  CLEAR_STORAGE,
  SET_ERROR,
  SET_GAME_DATA,
  SET_GAME_LOADING,
  SET_GAME_SCORE,
  SET_QUERY,
} from '../../utils/context/searchActions';
import { getGameData, getGameScore } from '../../utils/API';

import { ItemButton } from '../ItemButton/ItemButton';
import { Search } from '../Search/Search';
import { clearSearches } from '../../utils/localStorage';
import { messages } from '../../constants/messages';
import { modalProps } from '../../constants/modalValues';
import { useSearchContext } from '../../utils/context/SearchState';
import { setQuery } from '../../redux/query';

export const NavBar = () => {
  const dispatch = useDispatch();

  const { empty: emptyError } = modalProps;
  const [{ savedSearches, query }, contextDispatch] = useSearchContext();

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
      contextDispatch({ type: SET_GAME_LOADING });

      if (searchTerm === '') {
        contextDispatch({ type: SET_ERROR, payload: emptyError });
        setTimeout(() => {
          contextDispatch({ type: CLEAR_ERROR });
        }, 3000);
        throw Error(messages.errors.empty);
      }

      const gameResponse = await getGameData(searchTerm);
      const scoreResponse = await getGameScore(searchTerm);

      if (!gameResponse.ok) {
        throw Error(
          `There was an error: ${gameResponse.statusText} (${gameResponse.status})`
        );
      }
      if (!scoreResponse.ok) {
        throw Error(
          `There was an error: ${scoreResponse.statusText} (${scoreResponse.status})`
        );
      }

      const gameData = await gameResponse.json();
      const scoreData = await scoreResponse.json();

      dispatch(setQuery(searchTerm));
      contextDispatch({ type: SET_QUERY, payload: searchTerm }); // TODO - remove this
      contextDispatch({ type: SET_GAME_DATA, payload: gameData.results });
      contextDispatch({
        type: SET_GAME_SCORE,
        payload: parseInt(scoreData?.results[0]?.score),
      });
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
