import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    accessToken: '',
    isLoggedin: null,
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
  },
});

export const { getToken, isLogin, getUserData, getUserId } = loginSlice.actions;
export default loginSlice.reducer;
