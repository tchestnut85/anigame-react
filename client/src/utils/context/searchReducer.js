import {
	CLEAR_ANIME_LOADING,
	CLEAR_DATA,
	CLEAR_ERROR,
	CLEAR_GAME_LOADING,
	CLEAR_STREAM_URL_DATA,
	SET_ANIME_DATA,
	SET_ANIME_LOADING,
	SET_ERROR,
	SET_GAME_DATA,
	SET_GAME_LOADING,
	SET_GAME_SCORE,
	SET_QUERY,
	SET_STREAM_URL,
} from './searchActions';

import { useReducer } from 'react';

const reducer = (state, action) => {
	switch (action.type) {
		case SET_QUERY:
			return {
				...state,
				query: action.payload,
			};
		case SET_GAME_DATA:
			return {
				...state,
				gameState: action.payload,
			};
		case SET_GAME_SCORE:
			return {
				...state,
				gameScore: action.payload,
			};
		case SET_ANIME_DATA:
			return {
				...state,
				animeState: action.payload,
			};
		case SET_STREAM_URL:
			return {
				...state,
				animeStreamUrls: [
					...state.animeStreamUrls,
					{
						id: action.payload.id,
						url: action.payload.url,
					},
				],
			};
		case SET_GAME_LOADING:
			return {
				...state,
				gameLoading: true,
			};
		case CLEAR_GAME_LOADING:
			return {
				...state,
				gameLoading: false,
			};
		case SET_ANIME_LOADING:
			return {
				...state,
				animeLoading: true,
			};
		case CLEAR_ANIME_LOADING:
			return {
				...state,
				animeLoading: false,
			};
		case CLEAR_DATA:
			return {
				...state,
				query: '',
				gameState: [],
				gameScore: null,
				animeState: [],
				animeStreamUrls: [],
				error: null,
				loading: false,
			};
		case SET_ERROR:
			let error = action.payload;

			return {
				...state,
				error,
			};
		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};
		case CLEAR_STREAM_URL_DATA:
			return {
				...state,
				animeStreamUrls: [],
			};
		default:
			return state;
	}
};

export function useSearchReducer(initialState) {
	return useReducer(reducer, initialState);
}
