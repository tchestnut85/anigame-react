// Action Types
export const SET_QUERY = 'SET_QUERY';
export const CLEAR_DATA = 'CLEAR_DATA';

export const SET_GAME_DATA = 'SET_GAME_DATA';
export const SET_GAME_SCORE = 'SET_GAME_SCORE';

export const SET_ANIME_DATA = 'SET_ANIME_DATA';
export const SET_STREAM_URL = 'SET_STREAM_URL';
export const CLEAR_STREAM_URL_DATA = 'CLEAR_STREAM_URL_DATA';

export const SET_DETAILS = 'SET_DETAILS';
export const CLEAR_DETAILS = 'CLEAR_DETAILS';

export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export const SET_GAME_LOADING = 'SET_GAME_LOADING';
export const CLEAR_GAME_LOADING = 'CLEAR_GAME_LOADING';
export const SET_ANIME_LOADING = 'SET_ANIME_LOADING';
export const CLEAR_ANIME_LOADING = 'CLEAR_ANIME_LOADING';

export const LOAD_STORAGE = 'LOAD_STORAGE';
export const SET_STORAGE = 'SET_STORAGE';
export const CLEAR_STORAGE = 'CLEAR_STORAGE';

// Action Creators
export const setDetails = (detailsType, data, dispatch) => {
	dispatch({ type: SET_DETAILS, payload: { detailsType, data } });
};
