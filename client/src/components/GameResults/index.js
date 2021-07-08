import { capitalizeWords, formatDate } from '../../utils/helpers';

import React from 'react';
import { ReviewStars } from '../ReviewStars';
import { useSearchContext } from '../../utils/context/SearchState';

// TODO - add function to toggle hiding game description on clicking game card

export const GameResults = () => {
	const [state, dispatch] = useSearchContext();
	const games = state?.gameState;
	console.log('Results state:', state);

	return (
		<>
			{games.length ? (
				<div id='game-container'>
					<p id='game-results'>
						Games found for {capitalizeWords(state.query)}:
					</p>
					<div
						id='game-columns-container'
						className='columns is-multiline is-centered is-vcentered is-2 mt-4'
					>
						{games.map(game => (
							<div
								key={game.id}
								id='game-column'
								data-name={state.query}
								className='column search-results is-two-fifths mx-3 my-4'
							>
								<div
									id='base-search'
									className='columns is-vcentered'
								>
									<div
										id='column-image'
										className='game-col-img column is-one-fith is-narrow'
									>
										<img
											id='game-image'
											src={game?.image?.original}
											className='image'
											alt={`Cover Art for ${game?.name}`}
										/>
									</div>
									<div
										id='game-header'
										className='column has-text-centered'
									>
										<h1 className='title'>{game.name}</h1>
										<ReviewStars number={state.gameScore} />
									</div>
								</div>
								<div
									id='base-click'
									className='columns is-mobile'
								>
									<div
										id='column-description'
										className='column has-text-centered'
									>
										<p>
											Release date:{' '}
											{formatDate(game.release_date)}
										</p>
										<p>
											<a
												href={game.site_detail_url}
												rel='noreferrer'
												target='_blank'
											>
												Read More at GameSpot
											</a>
										</p>
									</div>
									{/* <div
										id='column-description'
										className='column'
									>
										<p>{game.description}</p>
									</div> */}
								</div>
							</div>
						))}
					</div>
				</div>
			) : null}
		</>
	);
};