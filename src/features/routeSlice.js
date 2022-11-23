import { createSlice } from '@reduxjs/toolkit';

const routeSlice = createSlice({
  name: 'route',
  initialState: {
    route: 'Dashboard',
    closeSide: false,
  },
  reducers: {
    getRoute(state, action) {
      state.route = action.payload;
    },
    setCloseSide(state, action) {
      state.closeSide = !state.closeSide;
    },
  },
});

export const { getRoute, setCloseSide } = routeSlice.actions;
export default routeSlice.reducer;
