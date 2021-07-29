import {
	CLEAR_ANIME_LOADING,
	CLEAR_STREAM_URL_DATA,
	SET_ANIME_DATA,
	SET_ANIME_LOADING,
	SET_STREAM_URL,
} from '../../utils/context/searchActions';
import React, { useEffect } from 'react';
import { getAnimeData, getAnimeStreamUrl } from '../../utils/API';

import { capitalizeWords } from '../../utils/helpers';
import { useSearchContext } from '../../utils/context/SearchState';

export const AnimeResults = () => {
	const [state, dispatch] = useSearchContext();
	// console.log('state:', state);
	const { gameState, animeState, animeStreamUrls } = state;

	const animeSearch = async () => {
		dispatch({ type: CLEAR_STREAM_URL_DATA });
		try {
			dispatch({ type: SET_ANIME_LOADING });

			const animeResponse = await getAnimeData(state.query);

			if (!animeResponse.ok) {
				throw Error(
					`There was an error: ${animeResponse.statusText} (${animeResponse.status})`
				);
			}

			const { data } = await animeResponse.json();
			const animeData = data.slice(0, 6);

			dispatch({ type: SET_ANIME_DATA, payload: animeData });
		} catch (err) {
			console.error(err);
		}
		dispatch({ type: CLEAR_ANIME_LOADING });
	};

	const streamUrlSearch = async animeId => {
		try {
			const streamUrlResponse = await getAnimeStreamUrl(animeId);

			if (!streamUrlResponse.ok) {
				throw Error(
					`There was an error: ${streamUrlResponse.statusText} (${streamUrlResponse.status})`
				);
			}

			const streamUrl = await streamUrlResponse.json();
			dispatch({
				type: SET_STREAM_URL,
				payload: {
					id: animeId,
					url: streamUrl?.data[0]?.attributes?.url,
				},
			});
		} catch (err) {
			console.error(err);
		}
	};

	// run the animeSearch function if gameState is populated/exists after initial game search
	useEffect(() => {
		if (gameState) {
			animeSearch();
		}

		//eslint-disable-next-line
	}, [gameState]);

	// run the streamUrlSearch when the anime search is done, aka anime.length === 10
	// TODO - figure out a better way to determine when the anime search is done in order to run the stream url search
	useEffect(() => {
		if (animeState.length === 6) {
			animeState.forEach(anime => {
				streamUrlSearch(anime.id);
			});
		}
		//eslint-disable-next-line
	}, [animeState]);

	// function to get the matching stream url for the anime by ID
	const findStreamUrl = animeId => {
		const foundUrl = animeStreamUrls.find(url => url.id === animeId);
		return foundUrl?.url;
	};

	// flag to determine if there is a stream url for the anime
	const hasStreamUrl = animeId => {
		return findStreamUrl(animeId) ? true : false;
	};

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
						{animeState.map((anime, index) => {
							return (
								<div
									key={`anime-result-${anime.id}`}
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
										{hasStreamUrl(anime.id) ? (
											<div
												id={`anime-stream-${anime.id}`}
												className='anime-stream column is-size-5 anime-stream-style'
											>
												<a
													href={findStreamUrl(
														anime.id
													)}
													target='_blank'
													rel='noreferrer'
												>
													Watch{' '}
													{
														anime.attributes
															.canonicalTitle
													}{' '}
													the Animation here!
												</a>
											</div>
										) : (
											<div className='anime-stream column is-size-5 anime-stream-style'>
												Sorry, no streaming info is
												available for this title.
											</div>
										)}
									</div>
									<p
										id='anime-description'
										className='container has-text-left is-size-6'
									>
										{/* Todo - make a seperate description component using react-router for this... or maybe a modal 
											{anime.attributes.description} 
										*/}
									</p>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</>
	);
};
