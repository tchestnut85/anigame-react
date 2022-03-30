import { configureStore } from '@reduxjs/toolkit';

import queryReducer from './query';

const store = configureStore({
  reducer: {
    query: queryReducer,
  },
  preloadedState: {},
  devTools: true, // true will leave redux devtools on in production (this is intentional)
});

export default store;
