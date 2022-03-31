import { fetchGameData } from '../api/gameRequests';

// action types
export const SET_GAME_DATA = 'SET_GAME_DATA';
export const SET_GAME_SCORE = 'SET_GAME_SCORE';
export const SET_GAME_DETAILS = 'SET_GAME_DETAILS';
export const CLEAR_GAME_DETAILS = 'CLEAR_GAME_DETAILS';

export const SET_GAME_LOADING = 'SET_GAME_LOADING';
export const CLEAR_GAME_LOADING = 'CLEAR_GAME_LOADING';

// action creators
export const getGameData = title => async dispatch => {
  try {
    dispatch({ type: SET_GAME_LOADING, payload: true });
    const {
      data: { results },
    } = await fetchGameData(title);

    dispatch({ type: SET_GAME_DATA, payload: results });
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ type: SET_GAME_LOADING, payload: false });
  }
};

// initial state
const INITIAL_STATE = {
  games: [],
  gameScore: null,
  gameLoading: false,
  gameDetails: null,
};

// reducer
const gameReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_GAME_DATA:
      return {
        // ...state,
        games: payload,
      };
    case SET_GAME_LOADING:
      return {
        ...state,
        gameLoading: payload,
      };
    default:
      return state;
  }
};

export default gameReducer;
