import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  CLEAR_DATA,
  CLEAR_ERROR,
  CLEAR_GAME_LOADING,
  LOAD_STORAGE,
  SET_ERROR,
  SET_GAME_DATA,
  SET_GAME_LOADING,
  SET_GAME_SCORE,
  SET_QUERY,
  SET_STORAGE,
} from '../../utils/context/searchActions';
import { getGameData, getGameScore } from '../../utils/API';
import { getSavedSearches, saveSearch } from '../../utils/localStorage';
import { modalProps } from '../../constants/modalValues';
import { useSearchContext } from '../../utils/context/SearchState';
import { setQuery } from '../../redux/query';

export const Search = () => {
  // search bar form state
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();

  // search context
  const [{ savedSearches }, reactDispatch] = useSearchContext();
  const { empty: emptyError } = modalProps;

  // Load saved searches if any in localstorage, if not set an empty array to savedSearches state
  useEffect(() => {
    const searches = getSavedSearches();
    reactDispatch({ type: LOAD_STORAGE, payload: searches });
    //eslint-disable-next-line
  }, []);

  const handleChange = e => setSearchTerm(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();
    const gameTitle = searchTerm.trim().toLowerCase();

    // clear the context state on a new search
    reactDispatch({ type: CLEAR_DATA });

    try {
      reactDispatch({ type: SET_GAME_LOADING });

      if (searchTerm === '') {
        reactDispatch({ type: SET_ERROR, payload: emptyError });
        setTimeout(() => {
          reactDispatch({ type: CLEAR_ERROR });
        }, 3000);
        throw Error('You must enter something to search for.');
      }

      // get the game's main data and review score
      const response = await getGameData(gameTitle);
      const scoreResponse = await getGameScore(gameTitle);

      reactDispatch({ type: SET_STORAGE, payload: gameTitle });
      saveSearch(savedSearches, gameTitle);

      if (!response.ok) {
        throw Error(
          `There was an error: ${response.statusText} (${response.status})`
        );
      }
      if (!scoreResponse.ok) {
        throw Error(
          `There was an error: ${scoreResponse.statusText} (${scoreResponse.status})`
        );
      }

      // get the game's data and review score
      const gameData = await response.json();
      const scoreData = await scoreResponse.json();

      // set the context gameResults to the response's data
      dispatch(setQuery(gameTitle));
      reactDispatch({ type: SET_QUERY, payload: gameTitle }); // TODO - remove this
      reactDispatch({ type: SET_GAME_DATA, payload: gameData.results });
      reactDispatch({
        type: SET_GAME_SCORE,
        payload: parseInt(scoreData?.results[0]?.score),
      });
      setSearchTerm('');
    } catch (err) {
      console.error(`There was an error: ${err.message}`);
    }

    reactDispatch({ type: CLEAR_GAME_LOADING });
  };

  return (
    <form id="search-form" className="field is-grouped" onSubmit={handleSubmit}>
      <input
        id="search-bar"
        className="searchbar-style input is-rounded"
        type="text"
        name="search-term"
        placeholder="Game Title"
        onChange={handleChange}
        value={searchTerm}
      />
      <button
        id="search-button"
        form="search-form"
        className="button is-black is-rounded"
        type="submit"
        value="Submit input"
      >
        Search
      </button>
    </form>
  );
};
