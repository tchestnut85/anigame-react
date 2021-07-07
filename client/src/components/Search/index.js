import {
	CLEAR_DATA,
	SET_GAME_DATA,
	SET_QUERY,
} from '../../utils/context/searchActions';
import React, { useState } from 'react';

import { getGameData } from '../../utils/API';
import { useSearchContext } from '../../utils/context/SearchState';

// TODO: localstorage to save searched titles - setup last
// TODO: on error, set an error component to display with error message

export const Search = () => {
	// search bar form state
	const [searchTerm, setSearchTerm] = useState('');

	// search context
	const [state, dispatch] = useSearchContext();

	const handleChange = e => setSearchTerm(e.target.value);

	const handleSubmit = async e => {
		e.preventDefault();
		// clear the context state on a new search
		dispatch({ type: CLEAR_DATA });

		try {
			if (searchTerm === '') {
				throw Error('You must enter something to search for.');
			}
			const response = await getGameData(searchTerm.trim().toLowerCase());

			if (!response.ok) {
				throw Error(
					`There was an error: ${response.statusText} (${response.status})`
				);
			}

			const gameData = await response.json();

			// set the context gameResults to the response's data
			dispatch({ type: SET_QUERY, payload: searchTerm });
			dispatch({ type: SET_GAME_DATA, payload: gameData.results });
			setSearchTerm('');
		} catch (err) {
			console.error(`There was an error: ${err.message})`);
		}
	};

	return (
		<form
			id='search-form'
			className='field is-grouped'
			onSubmit={handleSubmit}
		>
			<input
				id='search-bar'
				className='searchbar-style input is-rounded'
				type='text'
				name='search-term'
				placeholder='Game Title'
				onChange={handleChange}
				value={searchTerm}
			/>
			<button
				id='search-button'
				form='search-form'
				className='button is-black is-rounded'
				type='submit'
				value='Submit input'
			>
				Search
			</button>
		</form>
	);
};
