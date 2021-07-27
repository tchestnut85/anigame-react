import React, { useEffect } from 'react';

import { SET_ANIME_DATA } from '../../utils/context/searchActions';
import { capitalizeWords } from '../../utils/helpers';
import { getAnimeData } from '../../utils/API';
import { useSearchContext } from '../../utils/context/SearchState';

export const AnimeResults = () => {
	const [state, dispatch] = useSearchContext();
	console.log('AnimeResults index.js state:', state);
	const { gameState, animeState } = state;

	const animeSearch = async () => {
		try {
			const response = await getAnimeData(state.query);
			if (!response.ok) {
				throw Error(
					`There was an error: ${response.statusText} (${response.status})`
				);
			}
			const animeData = await response.json();
			dispatch({ type: SET_ANIME_DATA, payload: animeData.data });
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		if (gameState.length) {
			animeSearch();
		}
		//eslint-disable-next-line
	}, [gameState]);

	return (
		<>
			{animeState.length && (
				<div id='anime-container'>
					<p id='anime-results'>
						Anime found for {capitalizeWords(state.query)}:
					</p>
					<div
						id='results-container'
						className='columns is-multiline is-centered is-vcentered is-2 mt-4'
					>
						{animeState.map((anime, index) => (
							<div
								key={`anime-result-${index}`}
								id='anime-container'
								className='column anime-class anime-content search-results-anime is-two-fifths has-text-centered mx-3 my-4'
							>
								<div
									className='container has-text-centered is-size-5'
									id='anime-info'
								>
									<h3
										className='title has-text-centered is-size-3'
										id='anime-title'
									>
										{anime.attributes.canonicalTitle}
									</h3>
								</div>
								<div
									className='container is-centered'
									id='anime-vid-container'
								>
									<iframe
										src={`https://www.youtube.com/embed/${anime.attributes.youtubeVideoId}?controls=1?controls=1`}
										frameBorder='0'
										allowFullScreen
										alt={`Trailer for ${anime.attributes.canonicalTitle}`}
										title={`Trailer for ${anime.attributes.canonicalTitle}`}
										id='anime-video'
									></iframe>
								</div>
								<div className='anime-rating-stream-div columns is-vcentered container has-text-centered'>
									<span
										id='anime-rating'
										className='column container has-text-right is-size-4'
									>
										<i
											className='fa-star fas'
											aria-hidden='true'
										></i>
										<i
											className='fa-star fas'
											aria-hidden='true'
										></i>
										<i
											className='fa-star fas'
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
									</span>
									<span
										id='anime-stream-13684'
										className='anime-stream column is-size-5 anime-stream-style'
									>
										<a
											href={'URL'}
											target='_blank'
											rel='noreferrer'
										>
											Watch{' '}
											{anime.attributes.canonicalTitle}{' '}
											the Animation here!
										</a>
									</span>
								</div>
								<p
									id='anime-description'
									className='container has-text-left is-size-6'
								>
									{/* {anime.attributes.description} */}
								</p>
							</div>
						))}
					</div>
				</div>
			)}
		</>
	);
};
