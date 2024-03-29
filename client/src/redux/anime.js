import { fetchAnimeData, fetchAnimeStreamUrls } from '../api/animeRequest';
import { getAnimeMatches } from '../utils/helpers';
import { ERRORS, STATUSES } from '../constants';

// action types
const SET_ANIME_DATA = 'SET_ANIME_DATA';
const CLEAR_ANIME_DATA = 'CLEAR_ANIME_DATA';

const SET_STREAM_URLS = 'SET_STREAM_URLS';
const CLEAR_STREAM_URL_DATA = 'CLEAR_STREAM_URL_DATA';

const SET_ANIME_DETAIL_ID = 'SET_ANIME_DETAIL_ID';
const CLEAR_ANIME_DETAILS = 'CLEAR_ANIME_DETAILS';

const SET_ANIME_LOADING = 'SET_ANIME_LOADING';

const SET_ANIME_ERROR = 'SET_ANIME_ERROR';

// action creators
export const getAnimeData = title => async dispatch => {
  dispatch({ type: CLEAR_STREAM_URL_DATA });

  try {
    dispatch({ type: SET_ANIME_LOADING, payload: true });

    const {
      data: { data: animeData },
      status,
    } = await fetchAnimeData(title);

    if (status !== STATUSES.OK_CODE) {
      throw Error(`There was a ${status} error`);
    }

    const matchedAnime = getAnimeMatches(animeData, title);

    if (!matchedAnime.length) dispatch(setAnimeError());

    dispatch({ type: SET_ANIME_DATA, payload: matchedAnime });
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ type: SET_ANIME_LOADING, payload: false });
  }
};

export const getAnimeStreamUrls = ids => async dispatch => {
  try {
    const data = await Promise.all(ids.map(id => fetchAnimeStreamUrls(id)));
    const urls = await data.map((item, i) => {
      const url = item.data?.data[0]?.attributes?.url || null;
      return { id: ids[i], url };
    });

    dispatch({ type: SET_STREAM_URLS, payload: urls });
  } catch (err) {
    console.error(err);
  }
};

export const setAnimeDetails = id => dispatch => {
  dispatch({ type: SET_ANIME_DETAIL_ID, payload: id });
};

export const clearAnimeDetails = () => dispatch => {
  dispatch({ type: CLEAR_ANIME_DETAILS });
};

export const clearAnimeError = () => dispatch => {
  dispatch({ type: SET_ANIME_ERROR, payload: null });
};

export const setAnimeError = () => dispatch => {
  dispatch({ type: SET_ANIME_ERROR, payload: ERRORS.anime });
  setTimeout(() => dispatch(clearAnimeError()), 3000);
};

// initial state
const INITIAL_STATE = {
  animeTitles: [],
  streamUrls: [],
  detailId: null,
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
    case SET_ANIME_DETAIL_ID:
      return {
        ...state,
        detailId: payload,
      };
    case CLEAR_ANIME_DETAILS:
      return {
        ...state,
        detailId: null,
      };
    case SET_ANIME_ERROR:
      return {
        ...state,
        error: payload,
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
