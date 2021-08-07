import React from 'react';
import { Search } from '../Search/Search';

export const NavBar = () => {
	return (
		<nav
			id='search-display'
			className='nav-style navbar has-background-dark is-vcentered is-fixed-top'
			role='navigation'
			aria-label='main navigation'
		>
			<div id='gametitle-buttons' className='buttons'>
				<button id='delete-btn' className='button is-danger is-rounded'>
					<span className='icon is-small'>
						<i className='fas fa-skull'></i>
					</span>
				</button>
			</div>
			<div className='navbar-end'>
				<Search />
			</div>
		</nav>
	);
};
