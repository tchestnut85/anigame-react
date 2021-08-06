import {
	CLEAR_DATA,
	CLEAR_ERROR,
	CLEAR_GAME_LOADING,
	SET_ERROR,
	SET_GAME_DATA,
	SET_GAME_LOADING,
	SET_GAME_SCORE,
	SET_QUERY,
} from '../../utils/context/searchActions';
import React, { useEffect, useState } from 'react';
import { getGameData, getGameScore } from '../../utils/API';

import { AlertModal } from '../AlertModal';
import { modalProps } from '../../constants/modalValues';
import { useSearchContext } from '../../utils/context/SearchState';

// TODO: localstorage to save searched titles - setup last
// TODO: on error, set an error component to display with error message

export const Search = () => {
	const { empty } = modalProps;

	// search bar form state
	const [searchTerm, setSearchTerm] = useState('');

	// search context
	const [state, dispatch] = useSearchContext();
	const { error } = state;

	const handleChange = e => setSearchTerm(e.target.value);

	const handleSubmit = async e => {
		e.preventDefault();
		const gameTitle = searchTerm.trim().toLowerCase();
		// clear the context state on a new search
		dispatch({ type: CLEAR_DATA });

		try {
			dispatch({ type: SET_GAME_LOADING });

			if (searchTerm === '') {
				dispatch({ type: SET_ERROR, payload: empty });
				setTimeout(() => {
					dispatch({ type: CLEAR_ERROR });
				}, 3000);
				throw Error('You must enter something to search for.');
			}

			// get the game's main data and review score
			const response = await getGameData(gameTitle);
			const scoreResponse = await getGameScore(gameTitle);

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
			dispatch({ type: SET_QUERY, payload: searchTerm });
			dispatch({ type: SET_GAME_DATA, payload: gameData.results });
			dispatch({
				type: SET_GAME_SCORE,
				payload: parseInt(scoreData?.results[0]?.score),
			});
			setSearchTerm('');
		} catch (err) {
			console.error(`There was an error: ${err.message}`);
		}

		dispatch({ type: CLEAR_GAME_LOADING });
	};

	// Display the alert modal if there's an empty search
	// const displayModal = ({ message, icon, subMessage }) => (
	// 	<AlertModal type={message} icon={icon} subMessage={subMessage} />
	// );

	// useEffect(() => {
	// 	// displayModal(error);
	// }, [error]);

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
			{error && (
				<AlertModal
					type={error?.message}
					icon={error?.icon}
					subMessage={error?.subMessage}
				/>
			)}
		</form>
	);
};
