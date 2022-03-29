import { configureStore } from '@reduxjs/toolkit';

// TODO - create and import reducer

const store = configureStore({
  reducer: () => ({
    games: [{ name: 'test1', description: 'test1' }],
  }),
  preloadedState: {},
  devTools: true, // true will leave redux devtools on in production (this is intentional)
});

export default store;
