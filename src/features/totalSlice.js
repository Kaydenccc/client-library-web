import { createSlice } from '@reduxjs/toolkit';

const totalSlice = createSlice({
  name: 'total',
  initialState: {
    totalUsers: 0,
    totalBooks: 0,
    totalTransaksi: 0,
  },
  reducers: {
    getTotalUser(state, action) {
      state.totalUsers = action.payload;
    },
    getTotalBooks(state, action) {
      state.totalBooks = action.payload;
    },
    getTotalTransaksi(state, action) {
      state.totalTransaksi = action.payload;
    },
  },
});

export const { getTotalUser, getTotalBooks, getTotalTransaksi } = totalSlice.actions;
export default totalSlice.reducer;
