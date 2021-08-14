import { CLEAR_STORAGE } from '../../utils/context/searchActions';
import React from 'react';
import { Search } from '../Search/Search';
import { capitalizeWords } from '../../utils/helpers';
import { clearSearches } from '../../utils/localStorage';
import { useSearchContext } from '../../utils/context/SearchState';

// TODO 1 - Add handleSearch function to search for a saved title when clicked its button
// TODO 2 - Seperate the mapped buttons out into a separate component

export const NavBar = () => {
	const [{ savedSearches }, dispatch] = useSearchContext();

	const handleClear = () => {
		dispatch({ type: CLEAR_STORAGE });
		clearSearches();
	};

	// const handleSearch = () => {};

	return (
		<nav
			id='search-display'
			className='nav-style navbar has-background-dark is-vcentered is-fixed-top'
			role='navigation'
			aria-label='main navigation'
		>
			<div id='gametitle-buttons' className='buttons'>
				<button
					id='delete-btn'
					className='button is-danger is-rounded'
					onClick={handleClear}
				>
					<span className='icon is-small'>
						<i className='fas fa-skull'></i>
					</span>
				</button>
				{savedSearches.length
					? savedSearches.map((item, i) => {
							console.log(`item ${i}:`, item);
							return (
								<button
									key={i}
									className='button game-button is-rounded is-light'
									// onClick={handleSearch}
								>
									{capitalizeWords(item)}
								</button>
							);
					  })
					: null}
			</div>
			<div className='navbar-end'>
				<Search />
			</div>
		</nav>
	);
};
