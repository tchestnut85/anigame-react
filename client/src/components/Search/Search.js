import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setQuery } from '../../redux/query';
import { getGameData, getGameScore, clearGameData } from '../../redux/game';
import { getSavedSearches, saveSearch } from '../../redux/savedSearches';

export const Search = () => {
  // search bar form state
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();

  // Load saved searches if any in localstorage,
  useEffect(() => {
    dispatch(getSavedSearches());
  }, []); // eslint-disable-line

  const handleChange = e => setSearchTerm(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();
    const gameTitle = searchTerm.trim().toLowerCase();

    dispatch(clearGameData());

    try {
      dispatch(getGameData(gameTitle));
      dispatch(getGameScore(gameTitle));
      dispatch(setQuery(gameTitle));
      dispatch(saveSearch(gameTitle));

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
