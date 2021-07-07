import { CLEAR_DATA, SET_ERROR, SET_GAME_DATA } from './searchActions';

import { useReducer } from 'react';

const reducer = (state, action) => {
	switch (action.type) {
		case SET_GAME_DATA:
			return {
				...state,
				gameResults: action.payload,
			};
		case CLEAR_DATA:
			return {
				...state,
				gameResults: null,
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
