import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    accessToken: '',
    isLoggedin: false,
    user: '',
    userIdUpdate: '',
  },
  reducers: {
    getToken(state, action) {
      state.accessToken = action.payload;
    },
    isLogin(state, action) {
      state.isLoggedin = action.payload;
    },

    getUserData(state, action) {
      state.user = action.payload;
    },
    getUserId(state, action) {
      state.userIdUpdate = action.payload;
    },
    logOut(state, action) {
      state.accessToken = '';
      state.isLoggedin = false;
      state.user = '';
    },
  },
});

export const { getToken, isLogin, getUserData, getUserId, logOut } = loginSlice.actions;
export default loginSlice.reducer;
