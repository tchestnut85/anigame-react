// action types
const SET_QUERY = 'SET_QUERY';

// actions creators
export const setQuery = query => dispatch => {
  try {
    dispatch({ type: SET_QUERY, payload: query });
  } catch (err) {
    console.error(err);
  }
};

// initial state
const INITIAL_STATE = '';

// reducer
const queryReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_QUERY:
      return payload;
    default:
      return state;
  }
};

export default queryReducer;
