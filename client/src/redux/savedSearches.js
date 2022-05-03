import {
  getSavedSearches as getSavedSearchesUtil,
  saveSearch as saveSearchUtil,
  clearSearches as clearSearchesUtil,
} from '../utils/localStorage';

// Action Types
export const LOAD_STORAGE = 'LOAD_STORAGE';
export const SET_STORAGE = 'SET_STORAGE';
export const CLEAR_STORAGE = 'CLEAR_STORAGE';

// action creators
export const getSavedSearches = () => dispatch => {
  try {
    const searches = getSavedSearchesUtil();
    dispatch({ type: LOAD_STORAGE, payload: searches });
  } catch (err) {
    console.error(err);
  }
};

export const saveSearch = title => (dispatch, getState) => {
  try {
    const { savedSearches } = getState();
    saveSearchUtil(savedSearches, title);
    dispatch({ type: SET_STORAGE, payload: title });
  } catch (err) {
    console.error(err);
  }
};

export const clearSearches = () => dispatch => {
  try {
    clearSearchesUtil();
    dispatch({ type: CLEAR_STORAGE });
  } catch (err) {
    console.error(err);
  }
};

export const INITIAL_STATE = [];

//reducer
const storageReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_STORAGE:
      return state.includes(payload) ? [...state] : [payload, ...state];
    case LOAD_STORAGE:
      return payload;
    case CLEAR_STORAGE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default storageReducer;
