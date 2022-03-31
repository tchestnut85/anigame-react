import { configureStore } from '@reduxjs/toolkit';

import queryReducer from './query';
import gameReducer from './game';

const store = configureStore({
  reducer: {
    query: queryReducer,
    game: gameReducer,
  },
  preloadedState: {},
  devTools: true, // true will leave redux devtools on in production (this is intentional)
});

export default store;
