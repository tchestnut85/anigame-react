import {
	CLEAR_ANIME_LOADING,
	CLEAR_DATA,
	CLEAR_ERROR,
	CLEAR_GAME_LOADING,
	CLEAR_STORAGE,
	CLEAR_STREAM_URL_DATA,
	LOAD_STORAGE,
	SET_ANIME_DATA,
	SET_ANIME_LOADING,
	SET_ERROR,
	SET_GAME_DATA,
	SET_GAME_LOADING,
	SET_GAME_SCORE,
	SET_QUERY,
	SET_STORAGE,
	SET_STREAM_URL,
} from './searchActions';

import { useReducer } from 'react';

const reducer = (state, { type, payload }) => {
	switch (type) {
		case SET_QUERY:
			return {
				...state,
				query: payload,
			};
		case SET_GAME_DATA:
			return {
				...state,
				gameState: payload,
			};
		case SET_GAME_SCORE:
			return {
				...state,
				gameScore: payload,
			};
		case SET_ANIME_DATA:
			return {
				...state,
				animeState: payload,
			};
		case SET_STREAM_URL:
			return {
				...state,
				animeStreamUrls: [
					...state.animeStreamUrls,
					{
						id: payload.id,
						url: payload.url,
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
			let error = payload;

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
		case SET_STORAGE:
			if (state.savedSearches.includes(payload)) {
				return {
					...state,
					savedSearches: [...state.savedSearches],
				};
			} else {
				return {
					...state,
					savedSearches: [payload, ...state.savedSearches],
				};
			}
		case LOAD_STORAGE:
			return {
				...state,
				savedSearches: [...payload],
			};
		case CLEAR_STORAGE:
			return {
				...state,
				savedSearches: [],
			};
		default:
			return state;
	}
};

export function useSearchReducer(initialState) {
	return useReducer(reducer, initialState);
}
