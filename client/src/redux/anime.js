import { fetchAnimeData, fetchAnimeStreamUrl } from '../api/animeRequest';

import { getAnimeMatches } from '../utils/helpers';

// action types
const SET_ANIME_DATA = 'SET_ANIME_DATA';
const CLEAR_ANIME_DATA = 'CLEAR_ANIME_DATA';

const SET_STREAM_URLS = 'SET_STREAM_URLS';
const CLEAR_STREAM_URL_DATA = 'CLEAR_STREAM_URL_DATA';

const SET_ANIME_LOADING = 'SET_ANIME_LOADING';

// action creators
export const getAnimeData = title => async dispatch => {
  try {
    dispatch({ type: SET_ANIME_LOADING, payload: true });

    const {
      data: { data: animeData },
      status,
    } = await fetchAnimeData(title);

    if (status !== 200) {
      throw Error(`There was a ${status} error`);
    }

    const matchedAnime = getAnimeMatches(animeData, title);
    dispatch({ type: SET_ANIME_DATA, payload: matchedAnime });
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ type: SET_ANIME_LOADING, payload: false });
  }
};

export const clearStreamData = () => dispatch => {
  dispatch({ type: CLEAR_STREAM_URL_DATA });
};

// initial state
const INITIAL_STATE = {
  animeTitles: [],
  streamUrls: [],
  loading: false,
};

// reducer
const animeReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_ANIME_DATA:
      return {
        ...state,
        animeTitles: payload,
      };
    case SET_ANIME_LOADING:
      return {
        ...state,
        loading: payload,
      };
    case SET_STREAM_URLS:
      return {
        ...state,
        streamUrls: payload,
      };
    case CLEAR_ANIME_DATA:
      return INITIAL_STATE;
    case CLEAR_STREAM_URL_DATA:
      return {
        ...state,
        streamUrls: [],
      };
    default:
      return state;
  }
};

export default animeReducer;
