import {
	CLEAR_DATA,
	SET_ANIME_DATA,
	SET_ERROR,
	SET_GAME_DATA,
	SET_GAME_SCORE,
	SET_QUERY,
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
		case CLEAR_DATA:
			return {
				...state,
				gameState: [],
				animeState: [],
			};
		case SET_ERROR:
			let errorMsg = action.payload;
			setTimeout(() => {
				errorMsg = null;
			}, 3000);
			return {
				...state,
				error: errorMsg,
			};
		default:
			return state;
	}
};

export function useSearchReducer(initialState) {
	return useReducer(reducer, initialState);
}
