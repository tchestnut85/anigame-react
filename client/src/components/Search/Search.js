import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { LOAD_STORAGE, SET_STORAGE } from '../../utils/context/searchActions';
import { getSavedSearches, saveSearch } from '../../utils/localStorage';
import { useSearchContext } from '../../utils/context/SearchState';
import { setQuery } from '../../redux/query';
import { getGameData, getGameScore, clearGameData } from '../../redux/game';

export const Search = () => {
  // search bar form state
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();

  // search context
  const [{ savedSearches }, reactDispatch] = useSearchContext();

  // Load saved searches if any in localstorage, if not set an empty array to savedSearches state
  useEffect(() => {
    const searches = getSavedSearches();
    reactDispatch({ type: LOAD_STORAGE, payload: searches }); // TODO - convert to redux
    //eslint-disable-next-line
  }, []);

  const handleChange = e => setSearchTerm(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();
    const gameTitle = searchTerm.trim().toLowerCase();

    dispatch(clearGameData());

    try {
      dispatch(getGameData(gameTitle));
      dispatch(getGameScore(gameTitle));
      dispatch(setQuery(gameTitle));

      reactDispatch({ type: SET_STORAGE, payload: gameTitle }); // TODO - convert to redux
      saveSearch(savedSearches, gameTitle);

      setSearchTerm('');
    } catch (err) {
      console.error(`There was an error: ${err.message}`);
    }
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
        disabled={!searchTerm}
      >
        Search
      </button>
    </form>
  );
};
