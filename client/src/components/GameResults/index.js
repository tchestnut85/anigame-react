import React from 'react';
import { capitalizeWords } from '../../utils/helpers';
import { useSearchContext } from '../../utils/context/SearchState';

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
					{games.map(game => (
						<div
							key={game.id}
							id='game-columns-container'
							className='columns is-multiline is-centered is-vcentered is-2 mt-4'
						>
							<div
								id='game-column'
								data-name='Persona 5'
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
											src={game.image.original}
											className='image'
											alt={`Cover Art for ${game.name}`}
										/>
									</div>
									<div
										id='game-header'
										className='column has-text-centered'
									>
										<h1 className='title'>{game.name}</h1>
										<div
											id='game-stars'
											className='container has-text-centered'
										>
											<h3 className='title has-text-centered is-size-3'>
												<i
													className='far fa-star'
													aria-hidden='true'
												></i>
												<i
													className='far fa-star'
													aria-hidden='true'
												></i>
												<i
													className='far fa-star'
													aria-hidden='true'
												></i>
												<i
													className='far fa-star'
													aria-hidden='true'
												></i>
												<i
													className='far fa-star'
													aria-hidden='true'
												></i>
											</h3>
										</div>
									</div>
								</div>
								<div
									id='base-click'
									className='columns is-mobile'
								>
									<div
										id='column-description'
										className='column'
									>
										<p style={{ display: 'none' }}></p>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			) : null}
		</>
	);
};
