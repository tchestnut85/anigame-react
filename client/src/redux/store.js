import { configureStore } from '@reduxjs/toolkit';

import queryReducer from './query';
import gameReducer from './game';
import animeReducer from './anime';

const store = configureStore({
  reducer: {
    query: queryReducer,
    game: gameReducer,
    anime: animeReducer,
  },
  preloadedState: {},
  devTools: true, // true will leave redux devtools on in production (this is intentional)
});

export default store;
