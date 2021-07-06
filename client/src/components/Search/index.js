import React, { useState } from 'react';

import { getGameData } from '../../utils/API';

// TODO: handleSubmit function

// TODO: Setup Context to save search results

// TODO: localstorage to save searched titles - setup last
// TODO: on error, set an error component to display with error message

export const Search = () => {
	const [searchTerm, setSearchTerm] = useState('');

	const handleChange = e => setSearchTerm(e.target.value);

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			if (searchTerm === '') {
				throw Error('You must enter something to search for.');
			}
			const response = await getGameData(searchTerm.trim().toLowerCase());
			console.log('response:', response);

			if (!response.ok) {
				throw Error(
					`There was an error: ${response.statusText} (${response.status})`
				);
			}

			const gameData = await response.json();
			console.log('gameData:', gameData);
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
