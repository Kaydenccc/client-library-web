import { configureStore } from '@reduxjs/toolkit';
import loginSlice from '../features/loginSlice';
import routeSlice from '../features/routeSlice';
import totalSlice from '../features/totalSlice';

export const store = configureStore({
  reducer: {
    login: loginSlice,
    route: routeSlice,
    total: totalSlice,
  },
});
