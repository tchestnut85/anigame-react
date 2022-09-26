import { fetchGameData, fetchGameScore } from '../api/gameRequests';

import { STATUSES } from '../constants';

// action types
const SET_GAME_DATA = 'SET_GAME_DATA';
const CLEAR_GAME_DATA = 'CLEAR_GAME_DATA';

const SET_GAME_SCORE = 'SET_GAME_SCORE';

const SET_GAME_DETAIL_ID = 'SET_GAME_DETAIL_ID';
const CLEAR_GAME_DETAILS = 'CLEAR_GAME_DETAILS';

const SET_GAME_LOADING = 'SET_GAME_LOADING';

// action creators
export const getGameData = title => async dispatch => {
  try {
    dispatch({ type: SET_GAME_LOADING, payload: true });
    const {
      data: { results },
      status,
      statusText,
    } = await fetchGameData(title);

    if (statusText !== STATUSES.OK) {
      throw Error(`There was an error: ${statusText} (${status})`);
    }

    dispatch({ type: SET_GAME_DATA, payload: results });
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ type: SET_GAME_LOADING, payload: false });
  }
};

export const getGameScore = title => async dispatch => {
  try {
    const {
      data: { results },
      status,
      statusText,
    } = await fetchGameScore(title);

    if (statusText !== STATUSES.OK) {
      throw Error(`There was an error: ${statusText} (${status})`);
    }

    dispatch({
      type: SET_GAME_SCORE,
      payload: parseInt(results[0]?.score),
    });
  } catch (err) {
    console.error(err);
  }
};

export const setGameDetails = id => dispatch => {
  dispatch({ type: SET_GAME_DETAIL_ID, payload: id });
};

export const clearGameData = () => dispatch => {
  dispatch({ type: CLEAR_GAME_DATA });
};

export const clearGameDetailId = () => dispatch => {
  dispatch({ type: CLEAR_GAME_DETAILS });
};

// initial state
const INITIAL_STATE = {
  games: [],
  score: null,
  isLoading: false,
  detailId: null,
  error: null,
};

// reducer
const gameReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_GAME_DATA:
      return {
        ...state,
        games: payload,
      };
    case SET_GAME_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case SET_GAME_SCORE:
      return {
        ...state,
        score: payload,
      };
    case SET_GAME_DETAIL_ID:
      return {
        ...state,
        detailId: payload,
      };
    case CLEAR_GAME_DETAILS:
      return {
        ...state,
        detailId: null,
      };
    case CLEAR_GAME_DATA:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default gameReducer;
