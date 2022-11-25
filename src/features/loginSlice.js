import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLoggedin: false,
    user: '',
    userIdUpdate: '',
  },
  reducers: {
    isLogin(state, action) {
      state.isLoggedin = action.payload;
    },

    getUserData(state, action) {
      state.user = action.payload;
    },
    getUserId(state, action) {
      state.userIdUpdate = action.payload;
    },
  },
});

export const { getToken, isLogin, getUserData, getUserId, logOut } = loginSlice.actions;
export default loginSlice.reducer;
